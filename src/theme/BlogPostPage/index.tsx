import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import { BlogPostProvider, useBlogPost } from '@docusaurus/plugin-content-blog/client';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import UnifiedSidebar from '@theme/UnifiedSidebar';
import ContentVisibility from '@theme/ContentVisibility';
import type { Props } from '@theme/BlogPostPage';
import type { BlogSidebar } from '@docusaurus/plugin-content-blog';

function BlogPostPageContent({
  sidebar,
  children,
}: {
  sidebar: BlogSidebar;
  children: ReactNode;
}): ReactNode {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;

  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout>
      <div className="container margin-vert--lg">
        <div className="row">
          <main 
            className={clsx('col', {
              'col--9': hasSidebar,
              'col--12': !hasSidebar,
            })} 
            style={{ 
              paddingRight: hasSidebar ? '3rem' : undefined, 
              marginLeft: 0 
            }}
          >
            <ContentVisibility metadata={metadata} />
            <BlogPostItem>{children}</BlogPostItem>
            {(nextItem || prevItem) && (
              <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
            )}
          </main>
          {hasSidebar && (
            <aside
              style={{
                position: 'fixed',
                top: 'calc(var(--ifm-navbar-height) + 2rem)',
                right: 'max(0px, calc((100vw - 80rem) / 2))',
                width: 'calc((80rem * 0.25) - 1rem)',
                height: 'calc(100vh - var(--ifm-navbar-height) - 4rem)',
                zIndex: 10
              }}
            >
              {!hideTableOfContents && (
                <UnifiedSidebar
                  sidebar={sidebar}
                  toc={toc}
                  tocMinHeadingLevel={tocMinHeadingLevel}
                  tocMaxHeadingLevel={tocMaxHeadingLevel}
                />
              )}
            </aside>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default function BlogPostPage(props: Props): ReactNode {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogPostPage)}
      >
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
