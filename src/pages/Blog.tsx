import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { seoConfig } from '../seo/seoConfig';
import { blogPosts } from './blogData';
import FaIcon from '../components/FaIcon';

const Blog: React.FC = () => {
  return (
    <div className="scroll-container">
      <SEO {...seoConfig.blog} />

      <div className="main-content">
        <section className="section-standard pt-32 pb-16" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <span className="text-[#2FA0B5] uppercase tracking-[0.18em] text-xs font-semibold">Brandgoto Journal</span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 leading-tight">
                Startup GTM Infrastructure Insights
              </h1>
              <p className="text-gray-300 mt-5 text-base md:text-lg leading-relaxed">
                Tactical breakdowns on fast MVP development, AI-Ops systems, and fractional CTO strategy for
                venture-scale founders.
              </p>
            </div>
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
                    Read Full Post <FaIcon name="arrow-right" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
};

export default Blog;
