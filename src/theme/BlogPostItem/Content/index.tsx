/**
 * Custom BlogPostItemContent - Shows description in blog list, full content in post page
 */

import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { blogPostContainerID } from '@docusaurus/utils-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/BlogPostItem/Content';

export default function BlogPostItemContent({
  children,
  className,
}: Props): ReactNode {
  const { isBlogPostPage, metadata } = useBlogPost();
  
  // In list view, show description instead of full content
  if (!isBlogPostPage) {
    return (
      <div className={clsx('markdown', className)}>
        <MDXContent>
          <p className="blog-list-description">{metadata.description}</p>
        </MDXContent>
      </div>
    );
  }
  
  // In post page, show full content
  return (
    <div
      id={blogPostContainerID}
      className={clsx('markdown', className)}>
      <MDXContent>{children}</MDXContent>
    </div>
  );
}