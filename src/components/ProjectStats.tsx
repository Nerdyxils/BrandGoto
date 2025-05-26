import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface Props {
  selectedTab: string;
  setSelectedTab: (val: 'recent' | 'all') => void;
}

const ProjectStats: React.FC<Props> = ({ selectedTab, setSelectedTab }) => {

    const slideUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

  return (
    <aside className="project-stats">
      <motion.div
            className="project-header"
            variants={slideUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            >
            <motion.p className="section-intro text-light-cyan" variants={childFade}>
                Things We’ve Built
            </motion.p>

            <motion.h2 className="section-title" variants={childFade}>
                <span className="orange">Work</span> That <span className="teal">Speaks</span> for <span className="white">Itself</span>
            </motion.h2>

            <motion.p className="section-desc" variants={childFade}>
                Check out some of our favorite builds—from bold brands to sleek websites.
            </motion.p>

            <motion.div className="tabs" variants={childFade}>
                <a className={selectedTab === 'recent' ? 'active' : ''} onClick={() => setSelectedTab('recent')}>
                Recent Project
                </a>
                <a className={selectedTab === 'all' ? 'active' : ''} onClick={() => setSelectedTab('all')}>
                All Project
                </a>
            </motion.div>
        </motion.div>


      <div className="stats">
        <div><CountUp end={4} duration={2} />+<p>Projects Completed</p></div>
        <div><CountUp end={73} duration={2} />%<p>Client Satisfaction Rate</p></div>
        <div><CountUp end={2000000} duration={2} separator="," />+<p>Digital Campaign Reach</p></div>
      </div>
    </aside>
  );
};

export default ProjectStats;
