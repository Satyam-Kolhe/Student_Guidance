import React, { useState } from 'react';
import './MentorRecommendations.css'; // Import your CSS file for styling

const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Senior Software Engineer at Google",
    expertise: ["Software Development", "Machine Learning", "Career Transitions"],
    experience: "15+ years",
    rating: 4.9,
    reviews: 127,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    availability: "Available for 1:1 mentoring",
    hourlyRate: 1500,
    availableSlots: [
      { date: "2024-03-20", time: "10:00", type: "video" },
      { date: "2024-03-20", time: "14:00", type: "call" },
      { date: "2024-03-21", time: "11:00", type: "video" },
      { date: "2024-03-21", time: "15:00", type: "call" }
    ]
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Product Manager at Amazon",
    expertise: ["Product Strategy", "Tech Leadership", "Startup Advisory"],
    experience: "12+ years",
    rating: 4.8,
    reviews: 98,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    availability: "Group sessions available",
    hourlyRate: 1200,
    availableSlots: [
      { date: "2024-03-20", time: "09:00", type: "video" },
      { date: "2024-03-20", time: "13:00", type: "call" },
      { date: "2024-03-21", time: "10:00", type: "video" },
      { date: "2024-03-21", time: "14:00", type: "call" }
    ]
  },
  {
    id: 3,
    name: "Dr. Emily Thompson",
    title: "Data Science Director at Microsoft",
    expertise: ["Data Science", "AI", "Team Leadership"],
    experience: "10+ years",
    rating: 4.9,
    reviews: 156,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    availability: "Available for 1:1 mentoring",
    hourlyRate: 1400,
    availableSlots: [
      { date: "2024-03-20", time: "11:00", type: "video" },
      { date: "2024-03-20", time: "15:00", type: "call" },
      { date: "2024-03-21", time: "09:00", type: "video" },
      { date: "2024-03-21", time: "13:00", type: "call" }
    ]
  },
  {
    id: 4,
    name: "James Wilson",
    title: "UX Design Lead at Apple",
    expertise: ["UX/UI Design", "Product Design", "Design Systems"],
    experience: "8+ years",
    rating: 4.7,
    reviews: 89,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    availability: "Workshop sessions available"
  },
  {
    id: 5,
    name: "Lisa Patel",
    title: "Engineering Manager at Netflix",
    expertise: ["Engineering Management", "Career Development", "Tech Leadership"],
    experience: "13+ years",
    rating: 4.8,
    reviews: 112,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    availability: "Available for 1:1 mentoring"
  }
];

function MentorRecommendations() {
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Get unique expertise options
  const allExpertise = ['All', ...new Set(mentors?.flatMap(mentor => mentor.expertise) || [])];

  // Filter mentors based on selected expertise and search query
  const filteredMentors = mentors?.filter(mentor => {
    if (!mentor) return false;
    
    const matchesExpertise = selectedExpertise === 'All' || 
      (mentor.expertise && mentor.expertise.includes(selectedExpertise));
    
    const matchesSearch = searchQuery === '' || 
      (mentor.name && mentor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mentor.title && mentor.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mentor.expertise && mentor.expertise.some(exp => 
        exp.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    return matchesExpertise && matchesSearch;
  }) || [];

  const handleConnect = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const handleBooking = () => {
    if (selectedSlot && selectedMentor) {
      setShowBookingModal(false);
      setShowPaymentModal(true);
    }
  };

  const handlePayment = () => {
    if (selectedSlot && selectedMentor) {
      // Here you would typically integrate with a payment gateway
      alert(`Payment successful! Booking confirmed with ${selectedMentor.name} for ${selectedSlot.date} at ${selectedSlot.time}`);
      setShowPaymentModal(false);
      setSelectedSlot(null);
      setSelectedMentor(null);
    }
  };

  return (
    <div className="mentors-page">
      <div className="mentors-header">
        <h1>Find Your Perfect Mentor</h1>
        <p>Connect with industry experts who can guide you on your career journey</p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, title, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="expertise-filters">
          {allExpertise.map(expertise => (
            <button
              key={expertise}
              className={`filter-button ${selectedExpertise === expertise ? 'active' : ''}`}
              onClick={() => setSelectedExpertise(expertise)}
            >
              {expertise}
            </button>
          ))}
        </div>
      </div>

      <div className="mentors-grid">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="mentor-card">
            <div className="mentor-image">
              <img src={mentor.image} alt={mentor.name} />
              <div className="mentor-rating">
                ⭐ {mentor.rating} ({mentor.reviews})
              </div>
            </div>
            <div className="mentor-info">
              <h3>{mentor.name}</h3>
              <p className="mentor-title">{mentor.title}</p>
              <div className="mentor-expertise">
                {mentor.expertise?.map(exp => (
                  <span key={exp} className="expertise-tag">{exp}</span>
                ))}
              </div>
              <p className="mentor-experience">Experience: {mentor.experience}</p>
              <p className="mentor-availability">{mentor.availability}</p>
              <p className="mentor-rate">${mentor.hourlyRate}/hour</p>
              <button 
                className="connect-button"
                onClick={() => handleConnect(mentor)}
              >
                Connect with Mentor
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookingModal && selectedMentor && (
        <div className="booking-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Book a Session with {selectedMentor.name}</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedSlot(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="mentor-summary">
                <img src={selectedMentor.image} alt={selectedMentor.name} />
                <div>
                  <h3>{selectedMentor.title}</h3>
                  <p>Rate: ${selectedMentor.hourlyRate}/hour</p>
                </div>
              </div>

              <div className="session-type">
                <h3>Select Session Type</h3>
                <div className="type-options">
                  <button 
                    className={`type-button ${selectedSlot?.type === 'video' ? 'active' : ''}`}
                    onClick={() => setSelectedSlot({...selectedSlot, type: 'video'})}
                  >
                    Video Call
                  </button>
                  <button 
                    className={`type-button ${selectedSlot?.type === 'call' ? 'active' : ''}`}
                    onClick={() => setSelectedSlot({...selectedSlot, type: 'call'})}
                  >
                    Phone Call
                  </button>
                </div>
              </div>

              <div className="available-slots">
                <h3>Available Time Slots</h3>
                <div className="slots-grid">
                  {selectedMentor.availableSlots
                    ?.filter(slot => !selectedSlot?.type || slot.type === selectedSlot.type)
                    .map(slot => (
                      <button
                        key={`${slot.date}-${slot.time}`}
                        className={`slot-button ${selectedSlot?.date === slot.date && selectedSlot?.time === slot.time ? 'selected' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <span className="date">{new Date(slot.date).toLocaleDateString()}</span>
                        <span className="time">{slot.time}</span>
                        <span className="type">{slot.type === 'video' ? '🎥' : '📞'}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="booking-summary">
                {selectedSlot && (
                  <>
                    <p>Selected Session: {selectedSlot.type === 'video' ? 'Video Call' : 'Phone Call'}</p>
                    <p>Date: {new Date(selectedSlot.date).toLocaleDateString()}</p>
                    <p>Time: {selectedSlot.time}</p>
                    <p className="total">Total: ${selectedMentor.hourlyRate}</p>
                  </>
                )}
              </div>
              <button 
                className="book-button"
                onClick={handleBooking}
                disabled={!selectedSlot}
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && selectedMentor && selectedSlot && (
        <div className="payment-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Complete Payment</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedSlot(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="payment-summary">
                <h3>Booking Summary</h3>
                <div className="summary-item">
                  <span>Mentor:</span>
                  <span>{selectedMentor.name}</span>
                </div>
                <div className="summary-item">
                  <span>Session Type:</span>
                  <span>{selectedSlot.type === 'video' ? 'Video Call' : 'Phone Call'}</span>
                </div>
                <div className="summary-item">
                  <span>Date:</span>
                  <span>{new Date(selectedSlot.date).toLocaleDateString()}</span>
                </div>
                <div className="summary-item">
                  <span>Time:</span>
                  <span>{selectedSlot.time}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <span>₹{selectedMentor.hourlyRate}</span>
                </div>
              </div>

              <div className="payment-methods">
                <h3>Select Payment Method</h3>
                <div className="method-options">
                  <button 
                    className={`method-button ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <span className="method-icon">💳</span>
                    UPI Payment
                  </button>
                  <button 
                    className={`method-button ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <span className="method-icon">💳</span>
                    Credit/Debit Card
                  </button>
                  <button 
                    className={`method-button ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <span className="method-icon">🏦</span>
                    Net Banking
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="upi-details">
                    <p>Scan the QR code or use the UPI ID below:</p>
                    <div className="upi-qr">
                      {/* Add your UPI QR code image here */}
                      <img src="path-to-your-qr-code.png" alt="UPI QR Code" />
                    </div>
                    <div className="upi-id">
                      <span>UPI ID:</span>
                      <span>mentor@upi</span>
                      <button className="copy-button">Copy</button>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="card-details">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="bank-options">
                    <select>
                      <option value="">Select Bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="pay-button"
                onClick={handlePayment}
              >
                Pay ₹{selectedMentor.hourlyRate}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MentorRecommendations; 