// import React, { useState, useEffect } from 'react';
// import { Bot, Zap, Target, BarChart3, Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';

// const SmartLaunchDemo = () => {
//   const [activeDemo, setActiveDemo] = useState('chatbot');
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [leadScore, setLeadScore] = useState(0);
//   const [emailsSent, setEmailsSent] = useState(0);
//   const [conversions, setConversions] = useState(0);

//   // Simulated AI responses based on user input
//   const aiResponses = {
//     website: "I can help you create a stunning website! Based on your needs, I recommend our Smart Launch™ package which includes AI-powered design optimization, conversion tracking, and automated lead generation. Would you like to see pricing options?",
//     marketing: "Perfect! Our AI marketing automation can increase your leads by 300%. We'll set up intelligent email sequences, social media automation, and lead scoring. What's your current biggest marketing challenge?",
//     branding: "Great choice! Our AI-powered branding process analyzes your market, competitors, and target audience to create a brand that truly resonates. We can have your complete brand identity ready in 5 days. What industry are you in?",
//     general: "Hello! I'm your AI assistant for BrandGoto Smart Launch™. I can help you with website design, digital marketing, branding, and more. What brings you here today?"
//   };

//   // Auto-demo progression
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setLeadScore(prev => Math.min(prev + Math.random() * 15, 95));
//       setEmailsSent(prev => prev + Math.floor(Math.random() * 3));
//       setConversions(prev => prev + Math.floor(Math.random() * 2));
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleDemoMessage = (type) => {
//     const userMessage = {
//       text: type === 'website' ? "I need a new website for my business" :
//             type === 'marketing' ? "I want to improve my digital marketing" :
//             type === 'branding' ? "I need help with my brand identity" :
//             "Hello, can you help me?",
//       sender: 'user',
//       timestamp: Date.now()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setIsTyping(true);

//     setTimeout(() => {
//       const aiMessage = {
//         text: aiResponses[type],
//         sender: 'ai',
//         timestamp: Date.now()
//       };
//       setMessages(prev => [...prev, aiMessage]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const features = [
//     {
//       id: 'chatbot',
//       icon: <MessageSquare className="w-6 h-6" />,
//       title: 'AI Chat Assistant',
//       description: 'Intelligent customer support that qualifies leads 24/7'
//     },
//     {
//       id: 'scoring',
//       icon: <Target className="w-6 h-6" />,
//       title: 'Lead Scoring',
//       description: 'AI automatically scores and prioritizes your best prospects'
//     },
//     {
//       id: 'emails',
//       icon: <Mail className="w-6 h-6" />,
//       title: 'Smart Email Sequences',
//       description: 'Personalized email campaigns based on user behavior'
//     },
//     {
//       id: 'analytics',
//       icon: <BarChart3 className="w-6 h-6" />,
//       title: 'Performance Analytics',
//       description: 'Real-time insights on what's working and what's not'
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm mb-6">
//             <Zap className="w-4 h-4" />
//             Live Demo - See Smart Launch™ in Action
//           </div>
//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
//             <span className="text-orange-400">Smart Launch™</span> AI Demo
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             This is the exact AI automation system we build for our clients. 
//             Watch it work in real-time on our own website.
//           </p>
//         </div>

//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {features.map((feature) => (
//             <button
//               key={feature.id}
//               onClick={() => setActiveDemo(feature.id)}
//               className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all ${
//                 activeDemo === feature.id
//                   ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
//                   : 'bg-white/10 text-gray-300 hover:bg-white/20'
//               }`}
//             >
//               {feature.icon}
//               <span className="font-medium">{feature.title}</span>
//             </button>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            
//             {activeDemo === 'chatbot' && (
//               <div>
//                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                   <Bot className="w-8 h-8 text-purple-400" />
//                   AI Chat Assistant Demo
//                 </h3>
                
//                 <div className="bg-white rounded-xl p-6 h-96 flex flex-col">
//                   <div className="flex-1 overflow-y-auto space-y-4 mb-4">
//                     {messages.length === 0 && (
//                       <div className="text-gray-500 text-center py-8">
//                         <Bot className="w-12 h-12 mx-auto mb-4 text-purple-400" />
//                         <p>Start a conversation to see AI in action!</p>
//                       </div>
//                     )}
                    
//                     {messages.map((message, idx) => (
//                       <div key={idx} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                         <div className={`max-w-xs px-4 py-2 rounded-lg ${
//                           message.sender === 'user' 
//                             ? 'bg-purple-600 text-white' 
//                             : 'bg-gray-100 text-gray-800'
//                         }`}>
//                           {message.text}
//                         </div>
//                       </div>
//                     ))}
                    
//                     {isTyping && (
//                       <div className="flex justify-start">
//                         <div className="bg-gray-100 px-4 py-2 rounded-lg">
//                           <div className="flex space-x-1">
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex flex-wrap gap-2">
//                     <button 
//                       onClick={() => handleDemoMessage('website')}
//                       className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors"
//                     >
//                       Ask about websites
//                     </button>
//                     <button 
//                       onClick={() => handleDemoMessage('marketing')}
//                       className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors"
//                     >
//                       Ask about marketing
//                     </button>
//                     <button 
//                       onClick={() => handleDemoMessage('branding')}
//                       className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm hover:bg-purple-200 transition-colors"
//                     >
//                       Ask about branding
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeDemo === 'scoring' && (
//               <div>
//                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                   <Target className="w-8 h-8 text-orange-400" />
//                   AI Lead Scoring Demo
//                 </h3>
                
//                 <div className="bg-white rounded-xl p-6">
//                   <div className="space-y-6">
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="font-medium">Lead Quality Score</span>
//                         <span className="text-2xl font-bold text-purple-600">{Math.round(leadScore)}/100</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-3">
//                         <div 
//                           className="bg-gradient-to-r from-orange-400 to-purple-600 h-3 rounded-full transition-all duration-1000"
//                           style={{width: `${leadScore}%`}}
//                         ></div>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="text-center p-4 bg-green-50 rounded-lg">
//                         <div className="text-2xl font-bold text-green-600">{Math.round(leadScore/10)}</div>
//                         <div className="text-sm text-green-800">High-Quality Leads</div>
//                       </div>
//                       <div className="text-center p-4 bg-blue-50 rounded-lg">
//                         <div className="text-2xl font-bold text-blue-600">{Math.round(leadScore/5)}</div>
//                         <div className="text-sm text-blue-800">Leads This Week</div>
//                       </div>
//                     </div>
                    
//                     <div className="text-sm text-gray-600">
//                       <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
//                       AI automatically analyzes: page views, time on site, services viewed, form interactions
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeDemo === 'emails' && (
//               <div>
//                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                   <Mail className="w-8 h-8 text-blue-400" />
//                   Smart Email Automation
//                 </h3>
                
//                 <div className="bg-white rounded-xl p-6 space-y-4">
//                   <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//                     <div>
//                       <div className="font-medium">Personalized Emails Sent</div>
//                       <div className="text-sm text-gray-600">This month</div>
//                     </div>
//                     <div className="text-3xl font-bold text-blue-600">{emailsSent}</div>
//                   </div>
                  
//                   <div className="p-4 border-l-4 border-purple-400 bg-purple-50">
//                     <div className="font-medium text-purple-800 mb-2">Latest Email Preview:</div>
//                     <div className="text-sm text-gray-700">
//                       "Hi [Name], I noticed you're interested in website design. Here's how our Smart Launch™ process can help you..."
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Clock className="w-4 h-4 mr-2" />
//                     Next email sends in 2 days (based on optimal engagement time)
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeDemo === 'analytics' && (
//               <div>
//                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                   <BarChart3 className="w-8 h-8 text-green-400" />
//                   Real-Time Analytics
//                 </h3>
                
//                 <div className="bg-white rounded-xl p-6">
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-green-600">{conversions}</div>
//                       <div className="text-xs text-gray-600">Conversions Today</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-blue-600">23%</div>
//                       <div className="text-xs text-gray-600">Open Rate</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-purple-600">8.5%</div>
//                       <div className="text-xs text-gray-600">Click Rate</div>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
//                     <div className="text-sm font-medium text-gray-800 mb-2">AI Insights:</div>
//                     <div className="text-sm text-gray-600">
//                       • Best performing emails mention "website optimization"<br/>
//                       • Tuesday 2PM has highest engagement<br/>
//                       • 67% of leads prefer phone calls over emails
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="space-y-8">
//             <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
//               <h3 className="text-2xl font-bold text-white mb-6">What You're Seeing:</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <CheckCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-white">Live AI Automation</div>
//                     <div className="text-gray-300 text-sm">This exact system is running on our website right now</div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <CheckCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-white">Real Results</div>
//                     <div className="text-gray-300 text-sm">300% increase in qualified leads, 24/7 operation</div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <CheckCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-white">Your Custom System</div>
//                     <div className="text-gray-300 text-sm">We build this exact setup for your business</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl p-8 text-white">
//               <h3 className="text-2xl font-bold mb-4">Ready for Your Smart Launch™?</h3>
//               <p className="mb-6 opacity-90">
//                 Get the complete package: Brand + Website + AI Automation that works 24/7 to grow your business.
//               </p>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center gap-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Complete branding & website</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span>AI automation setup</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <CheckCircle className="w-5 h-5" />
//                   <span>30-day optimization period</span>
//                 </div>
//               </div>
              
//               <button className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-colors">
//                 Get Your Smart Launch™ Demo Call
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmartLaunchDemo;