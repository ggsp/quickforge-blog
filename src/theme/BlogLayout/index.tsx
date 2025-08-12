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
            style={{ 
              paddingRight: hasSidebar ? '3rem' : undefined,
              marginLeft: 0
            }}
          >
            {children}
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
              <UnifiedSidebar sidebar={sidebar} />
            </aside>
          )}
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
