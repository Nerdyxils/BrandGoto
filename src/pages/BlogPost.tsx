import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { blogPosts } from './blogData';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const post = useMemo(() => blogPosts.find((item) => item.slug === slug), [slug]);

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

  if (!post) {
    return (
      <div className="scroll-container">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
        <ScrollToTop />
        <main className="main-content pt-32 pb-20">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-white text-4xl font-bold">Post not found</h2>
            <p className="text-gray-300 mt-4">The blog post you requested is not available.</p>
            <Link to="/blog" className="inline-block mt-6 text-[#2FA0B5] font-semibold hover:text-[#F75F0B]">
              Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="scroll-container">
      <SEO
        title={`${post.title} | Brandgoto Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={`${post.targetKeyword}, startup GTM infrastructure, Brandgoto blog`}
        ogType="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          mainEntityOfPage: `https://www.brandgoto.com/blog/${post.slug}`,
          url: `https://www.brandgoto.com/blog/${post.slug}`,
          author: {
            '@type': 'Organization',
            name: 'Brandgoto',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Brandgoto',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.brandgoto.com/images/logo.png',
            },
          },
          keywords: post.targetKeyword,
        }}
      />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <ScrollToTop />

      <main className="main-content">
        <article className="section-standard pt-32 pb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.header
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="pb-8 border-b border-[#1f2f33]"
            >
              <Link to="/blog" className="inline-flex items-center text-[#2FA0B5] hover:text-[#F75F0B] text-sm font-semibold">
                <i className="fa-solid fa-arrow-left mr-2" aria-hidden="true" />
                Back to Blog
              </Link>
              <p className="mt-5 text-[#F75F0B] uppercase tracking-[0.14em] text-xs font-semibold">{post.targetKeyword}</p>
              <h2 className="text-white text-3xl md:text-5xl font-extrabold mt-3 leading-tight">{post.title}</h2>
              <p className="text-gray-300 mt-5 text-base md:text-lg leading-relaxed">{post.intro}</p>
            </motion.header>

            <div className="mt-10 max-w-3xl">
              {post.sections.map((section, index) => (
                <motion.section
                  key={`${section.h2}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className="mb-12"
                >
                  <h2 className="text-[#2FA0B5] font-bold text-2xl leading-snug">{section.h2}</h2>
                  <h3 className="text-white font-semibold text-xl mt-3">{section.h3}</h3>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${section.h3}-${paragraphIndex}`} className="text-gray-300 leading-relaxed text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="mt-6 py-8 border-t border-b border-[#2F4A50]"
            >
              <h3 className="text-white text-2xl font-bold">Live Demo of These Principles in Action</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                See how these startup infrastructure principles translate into a real, production-grade product in the
                OddLogic platform.
              </p>
              <a
                href="https://www.getoddlogic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-5 text-[#2FA0B5] font-semibold hover:text-[#F75F0B]"
              >
                View OddLogic Live Demo
                <i className="fa-solid fa-up-right-from-square ml-2" aria-hidden="true" />
              </a>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="mt-8 py-2"
            >
              <h3 className="text-white text-2xl font-bold">Ready to Build Your Growth Engine?</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                If you want a technical growth partner to architect and deploy your GTM infrastructure, we should talk.
              </p>
              <a
                href="https://brandgoto.com/book-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-5 px-5 py-3 rounded-lg bg-[#F75F0B] text-white font-semibold hover:bg-[#e45708] transition-colors"
              >
                Request GTM Audit
              </a>
            </motion.section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
