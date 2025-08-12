import React, { useState, type ReactNode } from 'react';
import BlogSidebar from '@theme/BlogSidebar';
import TOC from '@theme/TOC';
import type { BlogSidebar as BlogSidebarType } from '@docusaurus/plugin-content-blog';
import type { TOCItem } from '@docusaurus/mdx-loader';
import styles from './styles.module.css';

interface TabbedSidebarProps {
  sidebar: BlogSidebarType;
  toc: readonly TOCItem[];
  tocMinHeadingLevel?: number;
  tocMaxHeadingLevel?: number;
}

export default function TabbedSidebar({
  sidebar,
  toc,
  tocMinHeadingLevel,
  tocMaxHeadingLevel,
}: TabbedSidebarProps): ReactNode {
  const [activeTab, setActiveTab] = useState<'toc' | 'recent'>('toc');
  const hasToc = toc && toc.length > 0;

  return (
    <div className={styles.tabbedSidebar}>
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${activeTab === 'toc' ? styles.active : ''}`}
          onClick={() => setActiveTab('toc')}
          disabled={!hasToc}
        >
          On this page
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'recent' ? styles.active : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent posts
        </button>
      </div>
      {activeTab === 'toc' && hasToc && (
        <div className={styles.tocWrapper}>
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        </div>
      )}
      {activeTab === 'recent' && (
        <div className={styles.sidebarWrapper}>
          <div className={styles.noTitle}>
            <BlogSidebar sidebar={sidebar} />
          </div>
        </div>
      )}
    </div>
  );
}
