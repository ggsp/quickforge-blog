import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import TOC from '@theme/TOC';
import type { BlogSidebar as BlogSidebarType } from '@docusaurus/plugin-content-blog';
import type { TOCItem } from '@docusaurus/mdx-loader';
import clsx from 'clsx';
import styles from './styles.module.css';

interface UnifiedSidebarProps {
  sidebar: BlogSidebarType;
  toc?: readonly TOCItem[];
  tocMinHeadingLevel?: number;
  tocMaxHeadingLevel?: number;
}

export default function UnifiedSidebar({
  sidebar,
  toc,
  tocMinHeadingLevel,
  tocMaxHeadingLevel,
}: UnifiedSidebarProps): ReactNode {
  const hasToc = toc && toc.length > 0;
  const [activeTab, setActiveTab] = useState<'toc' | 'recent'>(hasToc ? 'toc' : 'recent');
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);
  const [recentAtBottom, setRecentAtBottom] = useState(false);
  const [recentScrolledFromTop, setRecentScrolledFromTop] = useState(false);
  const tocWrapperRef = useRef<HTMLDivElement>(null);
  const recentWrapperRef = useRef<HTMLDivElement>(null);
  const sidebarItems = useVisibleBlogSidebarItems(sidebar.items);

  // Check if TOC is scrolled to bottom
  useEffect(() => {
    const tocWrapper = tocWrapperRef.current;
    if (!tocWrapper || activeTab !== 'toc') return;

    const checkScrollPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = tocWrapper;
      const threshold = 5; // Small threshold to account for rounding errors
      
      // Check if at bottom
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - threshold);
      
      // Check if scrolled from top (show top fade after scrolling down a bit)
      setIsScrolledFromTop(scrollTop > 10); // Show fade after scrolling 10px from top
    };

    // Initial check
    checkScrollPosition();

    // Listen for scroll events
    tocWrapper.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // Also check on resize in case content changes
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(tocWrapper);

    return () => {
      tocWrapper.removeEventListener('scroll', checkScrollPosition);
      resizeObserver.disconnect();
    };
  }, [activeTab]);

  // Check if Recent posts is scrolled to bottom
  useEffect(() => {
    const recentWrapper = recentWrapperRef.current;
    if (!recentWrapper || activeTab !== 'recent') return;

    const checkRecentScrollPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = recentWrapper;
      const threshold = 5; // Small threshold to account for rounding errors
      
      // Check if at bottom
      setRecentAtBottom(scrollTop + clientHeight >= scrollHeight - threshold);
      
      // Check if scrolled from top (show top fade after scrolling down a bit)
      setRecentScrolledFromTop(scrollTop > 10); // Show fade after scrolling 10px from top
    };

    // Initial check
    checkRecentScrollPosition();

    // Listen for scroll events
    recentWrapper.addEventListener('scroll', checkRecentScrollPosition, { passive: true });
    
    // Also check on resize in case content changes
    const resizeObserver = new ResizeObserver(checkRecentScrollPosition);
    resizeObserver.observe(recentWrapper);

    return () => {
      recentWrapper.removeEventListener('scroll', checkRecentScrollPosition);
      resizeObserver.disconnect();
    };
  }, [activeTab]);

  const ListComponent = ({ items }: { items: any[] }) => {
    return (
      <BlogSidebarItemList
        items={items}
        ulClassName={clsx(styles.sidebarItemList, 'clean-list')}
        liClassName={styles.sidebarItem}
        linkClassName={styles.sidebarItemLink}
        linkActiveClassName={styles.sidebarItemLinkActive}
      />
    );
  };

  return (
    <div className={clsx(styles.unifiedSidebar, {
      [styles.atBottom]: activeTab === 'toc' && isAtBottom,
      [styles.scrolledFromTop]: activeTab === 'toc' && isScrolledFromTop,
      [styles.recentAtBottom]: activeTab === 'recent' && recentAtBottom,
      [styles.recentScrolledFromTop]: activeTab === 'recent' && recentScrolledFromTop
    })}>
      <div className={styles.tabButtons}>
        {hasToc && (
          <button
            className={`${styles.tabButton} ${activeTab === 'toc' ? styles.active : ''}`}
            onClick={() => setActiveTab('toc')}
          >
            On this page
          </button>
        )}
        <button
          className={`${styles.tabButton} ${activeTab === 'recent' ? styles.active : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          All posts
        </button>
      </div>

      {activeTab === 'toc' && hasToc && (
        <div
          ref={tocWrapperRef}
          className={styles.tocWrapper}
          onWheel={(e) => {
            // Prevent wheel events from bubbling to parent elements
            e.stopPropagation();
          }}
        >
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        </div>
      )}

      {activeTab === 'recent' && (
        <div ref={recentWrapperRef} className={styles.recentWrapper}>
          <nav
            className={styles.recentNav}
            aria-label={translate({
              id: 'theme.blog.sidebar.navAriaLabel',
              message: 'Blog recent posts navigation',
              description: 'The ARIA label for recent posts in the blog sidebar',
            })}
          >
            <BlogSidebarContent
              items={sidebarItems}
              ListComponent={ListComponent}
              yearGroupHeadingClassName={styles.yearGroupHeading}
            />
          </nav>
        </div>
      )}
    </div>
  );
}
