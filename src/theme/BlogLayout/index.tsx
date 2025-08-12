import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import UnifiedSidebar from '@theme/UnifiedSidebar';

import type { Props } from '@theme/BlogLayout';

export default function BlogLayout(props: Props): ReactNode {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg">
        <div className="row">
          <main
            className={clsx('col', {
              'col--9': hasSidebar,
              'col--12': !hasSidebar,
            })}
            style={{ paddingRight: hasSidebar ? '3rem' : undefined }}
          >
            {children}
          </main>
          {hasSidebar && (
            <aside
              className="col col--3"
              style={{
                position: 'sticky',
                top: 'calc(var(--ifm-navbar-height) + 2rem)',
                height: 'calc(100vh - var(--ifm-navbar-height) - 4rem)',
                maxHeight: 'calc(100vh - var(--ifm-navbar-height) - 4rem)',
              }}
            >
              <UnifiedSidebar sidebar={sidebar} />
            </aside>
          )}
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
