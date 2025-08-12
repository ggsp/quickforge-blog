import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Logo(): JSX.Element {
  const logoLink = useBaseUrl('/');

  return (
    <Link to={logoLink} className="navbar__brand" style={{ textDecoration: 'none' }}>
      <div className="quickforge-logo">
        <span className="quickforge-logo__q">Q</span>
        <span className="quickforge-logo__text">uickforge</span>
        <span className="quickforge-logo__separator" aria-hidden="true">
          /
        </span>
        <span className="quickforge-logo__blog">Blog</span>
      </div>
    </Link>
  );
}
