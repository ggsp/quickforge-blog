import React, { type ReactNode } from 'react';
import BlogSidebar from '@theme/BlogSidebar';
import type { BlogSidebar as BlogSidebarType } from '@docusaurus/plugin-content-blog';
import styles from './styles.module.css';

interface SingleTabSidebarProps {
  sidebar: BlogSidebarType;
}

export default function SingleTabSidebar({ sidebar }: SingleTabSidebarProps): ReactNode {
  return (
    <div className={styles.singleTabSidebar}>
      <div className={styles.tabButtons}>
        <div className={`${styles.tabButton} ${styles.active}`}>Recent posts</div>
      </div>
      <div className={styles.sidebarWrapper}>
        <BlogSidebar sidebar={sidebar} />
      </div>
    </div>
  );
}
