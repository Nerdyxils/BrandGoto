import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'Discovery & Research', desc: 'We dive deep into your business, goals, and audience to understand what success looks like.', features: ['Market Analysis', 'Goal Setting', 'Competitor Audit'] },
  { step: '02', title: 'Strategy & Planning', desc: 'We create a clear roadmap and strategy that aligns with your business objectives.', features: ['Project Scope', 'Timeline Planning', 'Success Metrics'] },
  { step: '03', title: 'Engineering & Build', desc: 'We bring your vision to life with clean design and solid technology.', features: ['UI/UX Design', 'Full-Stack Dev', 'Rapid Iteration'] },
  { step: '04', title: 'Launch & Scaling', desc: 'We launch with confidence and continue optimizing for growth.', features: ['Global Launch', 'Analytics Audit', 'Post-Launch Ops'] },
];

const fadeInUp = {
  hidden: { opacity: 1, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const GrowthProcessSection: React.FC = () => (
  <motion.section
    id="process"
    className="section-standard"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="container mx-auto">
      <motion.div className="section-header" variants={fadeInUp}>
        <span className="section-subtitle">Our Methodology</span>
        <h2 className="herotwo-heading"><span>The</span><span>Path</span><span>to</span><span>Digital</span><span>Excellence</span></h2>
        <p className="section-description">A proven four-stage process that transforms early-stage ideas into investor-ready infrastructure.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {steps.map((item) => (
          <motion.div key={item.step} className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
            <div className="w-12 h-12 bg-[#F75F0B] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-black font-bold text-lg">{item.step}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
            <div className="space-y-2 border-t border-white/5 pt-4">
              {item.features.map((feature) => <div key={feature} className="flex items-center gap-2 text-xs text-gray-300 font-medium uppercase tracking-wider"><span className="w-1 h-1 bg-[#F75F0B] rounded-full" />{feature}</div>)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default GrowthProcessSection;
