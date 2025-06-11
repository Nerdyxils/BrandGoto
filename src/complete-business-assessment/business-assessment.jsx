import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Users, Target, Zap, Star, Calendar } from 'lucide-react';
import {Navbar} from '../components/navbar';

const BusinessAssessmentLanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    stage: '',
    priority: '',
    timeline: '',
    budget: '',
    phone: '',
    challenges: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData.business.trim()) newErrors.business = 'Business name is required';
        break;
      case 2:
        if (!formData.stage) newErrors.stage = 'Please select your business stage';
        if (!formData.priority) newErrors.priority = 'Please select your priority';
        break;
      case 3:
        if (!formData.timeline) newErrors.timeline = 'Please select your timeline';
        if (!formData.budget) newErrors.budget = 'Please select your budget range';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      console.log('Assessment submitted:', formData);
      setIsSubmitted(true);
      
      // Replace with your actual Calendly link
      setTimeout(() => {
        window.open('YOUR_CALENDLY_LINK_HERE', '_blank');
      }, 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <Navbar />
        <motion.div 
          className="text-center max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Assessment Submitted!</h2>
          <p className="text-gray-300 mb-6">
            We're redirecting you to book your free strategy session. Get ready to transform your business!
          </p>
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              FREE $1,000 VALUE
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Complete Business
            <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Assessment
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Get your personalized roadmap to scale from idea to $1M+. We'll analyze your complete business and create a custom growth strategy.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
          >
            {[
              { icon: Target, title: "Brand & Market Analysis", value: "$500" },
              { icon: Zap, title: "Tech Stack Optimization", value: "$300" },
              { icon: Users, title: "Growth Strategy Plan", value: "$200" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
                <item.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <span className="text-orange-500 font-bold">{item.value} Value</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">Step {currentStep} of 3</span>
              <span className="text-gray-400 text-sm">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <motion.div 
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currentStep === 1 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Let's Get Started</h2>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Business/Project Name *</label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border ${errors.business ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors`}
                    placeholder="Your business name or project"
                  />
                  {errors.business && <p className="text-red-500 text-sm mt-1">{errors.business}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Your phone number"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">About Your Business</h2>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-3">What stage is your business? *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: 'idea', label: 'Just an Idea', desc: 'Concept stage, need everything' },
                      { value: 'early', label: 'Early Stage', desc: 'Basic setup, need growth' },
                      { value: 'growing', label: 'Growing Business', desc: 'Some traction, scaling up' },
                      { value: 'established', label: 'Established', desc: 'Profitable, optimizing' }
                    ].map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="stage"
                          value={option.value}
                          checked={formData.stage === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border rounded-lg transition-all ${
                          formData.stage === option.value 
                            ? 'border-orange-500 bg-orange-500/10' 
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}>
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-gray-400 text-sm">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-3">What do you need most urgently? *</label>
                  <div className="space-y-3">
                    {[
                      { value: 'brand', label: 'Complete Brand Identity', desc: 'Logo, colors, brand guidelines' },
                      { value: 'website', label: 'Professional Website', desc: 'Modern, converting website' },
                      { value: 'marketing', label: 'Marketing & Growth', desc: 'Digital marketing strategy' },
                      { value: 'everything', label: 'Complete Business Package', desc: 'Brand + Website + Marketing + Tech' }
                    ].map((option) => (
                      <label key={option.value} className="cursor-pointer block">
                        <input
                          type="radio"
                          name="priority"
                          value={option.value}
                          checked={formData.priority === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border rounded-lg transition-all ${
                          formData.priority === option.value 
                            ? 'border-orange-500 bg-orange-500/10' 
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}>
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-gray-400 text-sm">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-3">What's your timeline? *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: 'asap', label: 'ASAP', desc: 'Need to launch quickly' },
                      { value: '1-3months', label: '1-3 Months', desc: 'Ready to start soon' },
                      { value: '3-6months', label: '3-6 Months', desc: 'Planning ahead' },
                      { value: 'exploring', label: 'Just Exploring', desc: 'Gathering information' }
                    ].map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          value={option.value}
                          checked={formData.timeline === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border rounded-lg transition-all ${
                          formData.timeline === option.value 
                            ? 'border-orange-500 bg-orange-500/10' 
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}>
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-gray-400 text-sm">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-3">Investment Range *</label>
                  <div className="space-y-3">
                    {[
                      { value: 'under-5k', label: 'Under $5,000', desc: 'Startup budget' },
                      { value: '5k-15k', label: '$5,000 - $15,000', desc: 'Professional package' },
                      { value: '15k-30k', label: '$15,000 - $30,000', desc: 'Premium solution' },
                      { value: 'over-30k', label: '$30,000+', desc: 'Enterprise level' }
                    ].map((option) => (
                      <label key={option.value} className="cursor-pointer block">
                        <input
                          type="radio"
                          name="budget"
                          value={option.value}
                          checked={formData.budget === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border rounded-lg transition-all ${
                          formData.budget === option.value 
                            ? 'border-orange-500 bg-orange-500/10' 
                            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        }`}>
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-gray-400 text-sm">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Biggest Challenge (Optional)</label>
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="What's your biggest business challenge right now?"
                  />
                </div>
              </motion.div>
            )}

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                >
                  ← Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book My Free Session
                </button>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <p className="text-gray-400 mb-6">
              "The assessment alone was worth $1000+. They identified gaps I didn't even know existed!"
            </p>
            <div className="flex justify-center items-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>45-60 min session</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50+ founders helped</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAssessmentLanding;