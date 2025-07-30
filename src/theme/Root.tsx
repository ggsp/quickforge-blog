import React, { useEffect } from 'react';
import posthog from 'posthog-js';

// Initialize PostHog
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  posthog.init(process.env.REACT_APP_POSTHOG_KEY || 'phc_YOUR_PROJECT_API_KEY', {
    api_host: process.env.REACT_APP_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
  });
}

export default function Root({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      posthog.capture('$pageview');
    }
  }, []);

  return <>{children}</>;
}