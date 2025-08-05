import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Star, Award, MapPin } from 'lucide-react';

export default function ConsultationBooking() {
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    legalMatter: '',
    urgency: 'medium',
    description: '',
  });

  const lawyers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Business & Corporate Law',
      rating: 4.9,
      reviews: 127,
      experience: '15+ years',
      location: 'Los Angeles, CA',
      rate: '$350/hour',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      badges: ['Top Rated', 'Quick Response'],
      bio: 'Specializes in business formation, contract negotiations, and corporate compliance.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Family & Divorce Law',
      rating: 4.8,
      reviews: 94,
      experience: '12+ years',
      location: 'San Francisco, CA',
      rate: '$300/hour',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      badges: ['Compassionate', 'Expert Mediator'],
      bio: 'Experienced in divorce proceedings, child custody, and family mediation.',
    },
    {
      id: 3,
      name: 'Jennifer Martinez',
      specialty: 'Personal Injury Law',
      rating: 4.9,
      reviews: 156,
      experience: '18+ years',
      location: 'Miami, FL',
      rate: '$400/hour',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      badges: ['Trial Expert', 'Million+ Settlements'],
      bio: 'Proven track record in personal injury cases with multiple million-dollar settlements.',
    },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const legalMatters = [
    'Business Formation',
    'Contract Review',
    'Divorce/Separation',
    'Child Custody',
    'Personal Injury',
    'Real Estate',
    'Employment Issues',
    'Criminal Defense',
    'Estate Planning',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Consultation request submitted! We will contact you within 24 hours to confirm your appointment.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Book a Legal Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced attorneys for personalized legal advice. Choose from our network of licensed professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attorney Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Attorney</h2>
            
            <div className="space-y-6">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className={`card p-6 cursor-pointer transition-all duration-300 ${
                    selectedLawyer === lawyer.id 
                      ? 'ring-2 ring-blue-500 shadow-xl' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedLawyer(lawyer.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{lawyer.rate}</div>
                          <div className="text-sm text-gray-500">consultation</div>
                        </div>
                      </div>
                      
                      <p className="text-blue-600 font-medium mb-2">{lawyer.specialty}</p>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{lawyer.rating}</span>
                          <span>({lawyer.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{lawyer.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{lawyer.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{lawyer.bio}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {lawyer.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {selectedLawyer === lawyer.id && (
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Schedule Consultation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Legal Matter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Matter Type
                  </label>
                  <select
                    value={formData.legalMatter}
                    onChange={(e) => setFormData({...formData, legalMatter: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select legal matter</option>
                    {legalMatters.map((matter) => (
                      <option key={matter} value={matter}>{matter}</option>
                    ))}
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="low">Low - Within 2 weeks</option>
                    <option value="medium">Medium - Within 1 week</option>
                    <option value="high">High - Within 2 days</option>
                    <option value="urgent">Urgent - Same day</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    placeholder="Please provide a brief description of your legal matter..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedLawyer}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Consultation
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our Terms of Service and Privacy Policy.
                  You'll receive a confirmation email within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}