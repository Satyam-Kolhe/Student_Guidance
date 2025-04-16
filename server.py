from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import joblib
import numpy as np
import os
from datetime import datetime, timedelta

app = Flask(__name__, static_folder='../client/build')
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///career_mentor.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Load the trained model
model = joblib.load('career_recommender_model.pkl')

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    career_results = db.relationship('CareerResult', backref='user', lazy=True)
    mentor = db.relationship('MentorAssignment', backref='user', lazy=True)

class Mentor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    expertise = db.Column(db.String(200), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.Text, nullable=False)
    availability = db.Column(db.String(200), nullable=False)
    assigned_users = db.relationship('MentorAssignment', backref='mentor', lazy=True)

class CareerResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    career = db.Column(db.String(100), nullable=False)
    percentage = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class MentorAssignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentor.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# Create database tables
with app.app_context():
    db.create_all()

# Authentication Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Hash password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    # Create new user
    user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user_id': user.id,
            'username': user.username
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

# Career Prediction Route
@app.route('/api/predict', methods=['POST'])
@jwt_required()
def predict():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        responses = data['responses']
        
        # Convert to numpy array and reshape for prediction
        input_data = np.array(responses).reshape(1, -1)
        
        # Get predictions
        probabilities = model.predict_proba(input_data)[0]
        
        # Save results to database
        for career, percentage in zip(model.classes_, probabilities):
            result = CareerResult(
                user_id=user_id,
                career=career,
                percentage=percentage * 100
            )
            db.session.add(result)
        
        db.session.commit()
        
        # Prepare response
        results = {
            'careers': model.classes_.tolist(),
            'percentages': (probabilities * 100).round(1).tolist()
        }
        
        return jsonify(results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Mentor Recommendation Route
@app.route('/api/mentors', methods=['GET'])
@jwt_required()
def get_mentors():
    try:
        user_id = get_jwt_identity()
        
        # Get user's top career result
        top_career = CareerResult.query.filter_by(user_id=user_id)\
            .order_by(CareerResult.percentage.desc())\
            .first()
        
        if not top_career:
            return jsonify({'error': 'No career results found'}), 404
        
        # Get mentors matching the career
        mentors = Mentor.query.filter(Mentor.expertise.like(f'%{top_career.career}%'))\
            .order_by(Mentor.experience.desc())\
            .limit(9)\
            .all()
        
        # Format mentor data
        mentor_data = [{
            'id': mentor.id,
            'name': mentor.name,
            'expertise': mentor.expertise,
            'experience': mentor.experience,
            'bio': mentor.bio,
            'availability': mentor.availability
        } for mentor in mentors]
        
        return jsonify(mentor_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Mentor Assignment Route
@app.route('/api/assign-mentor', methods=['POST'])
@jwt_required()
def assign_mentor():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        mentor_id = data['mentor_id']
        
        # Check if mentor is already assigned
        existing_assignment = MentorAssignment.query.filter_by(
            user_id=user_id,
            mentor_id=mentor_id
        ).first()
        
        if existing_assignment:
            return jsonify({'error': 'Mentor already assigned'}), 400
        
        # Create new assignment
        assignment = MentorAssignment(
            user_id=user_id,
            mentor_id=mentor_id,
            status='assigned'
        )
        
        db.session.add(assignment)
        db.session.commit()
        
        return jsonify({'message': 'Mentor assigned successfully'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Serve React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)