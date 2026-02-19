import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { seoConfig } from '../seo/seoConfig';
import { blogPosts } from './blogData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Blog: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onEsc);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-container">
      <SEO {...seoConfig.blog} />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <ScrollToTop />

      <main className="main-content">
        <section className="section-standard pt-32 pb-16">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
              <span className="text-[#2FA0B5] uppercase tracking-[0.18em] text-xs font-semibold">Brandgoto Journal</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 leading-tight">
                Startup GTM Infrastructure Insights
              </h2>
              <p className="text-gray-300 mt-5 text-base md:text-lg leading-relaxed">
                Tactical breakdowns on fast MVP development, AI-Ops systems, and fractional CTO strategy for
                venture-scale founders.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-black pb-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className={`py-10 ${index !== blogPosts.length - 1 ? 'border-b border-[#1f2f33]' : ''}`}
                >
                  <span className="text-[#F75F0B] text-xs font-semibold uppercase tracking-[0.14em]">
                    {post.targetKeyword}
                  </span>
                  <h3 className="text-white font-bold text-2xl md:text-3xl mt-3 leading-tight">{post.title}</h3>
                  <p className="text-gray-300 mt-4 leading-relaxed text-base md:text-lg">{post.excerpt}</p>
                  <p className="text-gray-400 mt-3 leading-relaxed">
                    {post.intro}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-[#2FA0B5] font-semibold hover:text-[#F75F0B] transition-colors"
                  >
                    Read Full Post <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
