import React, { useState, type ReactNode } from 'react';
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
  const sidebarItems = useVisibleBlogSidebarItems(sidebar.items);

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
    <div className={styles.unifiedSidebar}>
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
        <div className={styles.recentWrapper}>
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