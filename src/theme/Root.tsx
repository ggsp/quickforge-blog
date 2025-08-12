import React, { useEffect } from 'react';
import posthog from 'posthog-js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({ children }: { children: React.ReactNode }) {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // Initialize PostHog only in browser environment and if key is provided
    if (ExecutionEnvironment.canUseDOM && siteConfig.customFields?.posthogKey) {
      const posthogKey = siteConfig.customFields.posthogKey as string;
      const posthogHost =
        (siteConfig.customFields.posthogHost as string) || 'https://app.posthog.com';

      posthog.init(posthogKey, {
        api_host: posthogHost,
        capture_pageview: true,
        capture_pageleave: true,
        loaded: (posthog) => {
          // Disable in development
          if (window.location.hostname === 'localhost') {
            posthog.opt_out_capturing();
          }
        },
      });
    }
  }, [siteConfig]);

  return <>{children}</>;
}
