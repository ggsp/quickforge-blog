import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function AnimatedLogo(): JSX.Element {
  const logoLink = useBaseUrl('/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Mark as loaded after initial animation completes
    const timer = setTimeout(() => setHasLoaded(true), 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Link to={logoLink} className="navbar__brand" style={{ textDecoration: 'none' }}>
      <motion.div 
        className="quickforge-logo"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Q - Aeonik */}
        <motion.span
          className="quickforge-logo__q"
          initial={{ opacity: 1, x: 0 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0,
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          Q
        </motion.span>

        {/* uickforge - Aeonik Fono */}
        {'uickforge'.split('').map((letter, index) => {
          // Only show 'f' when scrolled (index 4 is 'f')
          const isF = index === 4;
          const shouldShow = !isScrolled || isF;

          return (
            <motion.span
              key={index}
              className="quickforge-logo__text-letter"
              initial={{
                opacity: isF ? 1 : 0, // 'f' starts visible, others hidden
                x: isF ? -62 : 0, // 'f' starts in condensed position (restore original)
              }}
              animate={{
                opacity: shouldShow ? 1 : 0,
                x: isScrolled && isF ? -62 : 0, // Move 'f' to condensed position when scrolled, back to normal when not
                scale: shouldShow ? 1 : 0.8,
              }}
              transition={{
                delay: isScrolled
                  ? 0
                  : hasLoaded
                    ? isF
                      ? 0
                      : (index + 1) * 0.04
                    : isF
                      ? 0.7
                      : 0.7 + (index + 1) * 0.04, // Delay only on initial load
                duration: isScrolled ? 0.2 : 0.25,
                ease: [0.6, 0.0, 0.4, 1], // Snappier easing
              }}
            >
              {letter}
            </motion.span>
          );
        })}

        {/* Separator - Aeonik */}
        <motion.span
          className="quickforge-logo__separator"
          aria-hidden="true"
          initial={{ opacity: 0, x: 10 }}
          animate={{
            opacity: isScrolled ? 0.4 : 0.4, // Keep visible when scrolled
            x: isScrolled ? -130 : 0, // Move closer to Qf when scrolled
            scale: 1,
          }}
          transition={{
            // Position changes (x) should be immediate when scrolling
            x: {
              delay: 0,
              duration: isScrolled ? 0.15 : 0.2,
              ease: [0.6, 0.0, 0.4, 1]
            },
            // Opacity changes have proper entrance delay
            opacity: {
              delay: hasLoaded ? 0 : 1.1, // Appear after "Quickforge" completes
              duration: 0.3,
              ease: [0.6, 0.0, 0.4, 1]
            }
          }}
        >
          /
        </motion.span>

        {/* Blog sub-wordmark - Aeonik */}
        {'Blog'.split('').map((letter, index) => {
          // Only show 'B' when scrolled (index 0 is 'B')
          const isB = index === 0;
          const shouldShow = !isScrolled || isB;

          return (
            <motion.span
              key={`blog-${index}`}
              className="quickforge-logo__blog-letter"
              initial={{
                opacity: 0, // All letters start hidden (including B)
                x: isB ? -127 : 0, // B positioned closer to separator
              }}
              animate={{
                opacity: shouldShow ? 1 : 0,
                x: isScrolled && isB ? -127 : 0, // Move 'B' closer to separator when scrolled
                scale: shouldShow ? 1 : 0.8,
              }}
              transition={{
                // Position changes (x) should be immediate when scrolling
                x: { 
                  delay: 0, 
                  duration: isScrolled ? 0.15 : 0.2,
                  ease: [0.6, 0.0, 0.4, 1]
                },
                // Opacity changes should have proper delays
                opacity: {
                  delay: isScrolled
                    ? 0
                    : hasLoaded
                      ? isB
                        ? 1.3 // B appears after separator
                        : 0.5 + (index * 0.05) // "log" letters appear with same stagger as first load
                      : isB
                        ? 1.3
                        : 1.35 + (index * 0.03),
                  duration: 0.2,
                  ease: [0.6, 0.0, 0.4, 1]
                },
                // Scale follows opacity timing
                scale: {
                  delay: isScrolled
                    ? 0
                    : hasLoaded
                      ? isB
                        ? 1.3
                        : 0.5 + (index * 0.05) // "log" letters appear with same stagger as first load
                      : isB
                        ? 1.3
                        : 1.35 + (index * 0.05),
                  duration: 0.2,
                  ease: [0.6, 0.0, 0.4, 1]
                }
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </motion.div>
    </Link>
  );
}