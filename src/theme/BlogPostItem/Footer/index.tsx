/**
 * Swizzled BlogPostItemFooter - Removes tags from blog index
 */

import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';

export default function BlogPostItemFooter(): ReactNode {
  const { metadata, isBlogPostPage } = useBlogPost();
  const {
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;

  // For list view, don't render any footer content
  if (!isBlogPostPage) {
    return null;
  }

  // BlogPost footer - details view (full post page - keep tags here)
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const { tags } = metadata;
  const tagsExists = tags.length > 0;

  // Import TagsListInline only for the blog post page
  const TagsListInline = require('@theme/TagsListInline').default;

  return (
    <footer className="docusaurus-mt-lg">
      {tagsExists && (
        <div
          className={clsx(
            'row',
            'margin-top--sm',
            ThemeClassNames.blog.blogFooterEditMetaRow,
          )}
        >
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx(
            'margin-top--sm',
            ThemeClassNames.blog.blogFooterEditMetaRow,
          )}
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
    </footer>
  );
}