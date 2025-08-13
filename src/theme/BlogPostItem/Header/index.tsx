/**
 * Enhanced BlogPostItemHeader - Includes author badges and tags in header
 */

import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogAuthor from '@theme/Blog/Components/Author';
import TagsListInline from '@theme/TagsListInline';
import styles from './styles.module.css';

export default function BlogPostItemHeader(): ReactNode {
  const { metadata, assets, isBlogPostPage } = useBlogPost();
  const { authors, tags } = metadata;
  
  // Only show authors and tags on individual blog post pages, not on the list
  const showAuthorsAndTags = isBlogPostPage;
  const authorsCount = authors.length;
  const tagsExist = tags.length > 0;

  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      
      {showAuthorsAndTags && (
        <div className={styles.headerMeta}>
          {/* Author badges */}
          {authorsCount > 0 && (
            <div className={styles.authorsSection}>
              <div className={styles.authorsList}>
                {authors.map((author, idx) => (
                  <div key={idx} className={styles.authorBadge}>
                    <BlogAuthor
                      author={{
                        ...author,
                        imageURL: assets.authorsImageUrls[idx] ?? author.imageURL,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tags */}
          {tagsExist && (
            <div className={styles.tagsSection}>
              <TagsListInline tags={tags} />
            </div>
          )}
        </div>
      )}
    </header>
  );
}