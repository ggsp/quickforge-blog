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

  return (
    <Layout>
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col col--9" style={{ paddingRight: '3rem' }}>
            <ContentVisibility metadata={metadata} />
            <BlogPostItem>{children}</BlogPostItem>
            {(nextItem || prevItem) && (
              <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
            )}
          </main>
          <aside
            className="col col--3"
            style={{
              position: 'sticky',
              top: 'calc(var(--ifm-navbar-height) + 2rem)',
              height: 'fit-content',
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
