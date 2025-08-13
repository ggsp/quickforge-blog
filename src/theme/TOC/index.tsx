import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import type { Props } from '@theme/TOC';

import styles from './styles.module.css';

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({ className, ...props }: Props): ReactNode {
  const tocRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const scrollThrottleRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const programmaticScrollRef = useRef(false);

  useEffect(() => {
    const tocElement = tocRef.current;
    if (!tocElement) return;

    // Find the actual scrollable container (tocWrapper)
    const scrollContainer =
      tocElement.closest('.tocWrapper_src-theme-UnifiedSidebar-styles-module') ||
      tocElement.closest('[class*="tocWrapper"]');

    if (!scrollContainer) return;

    // Detect user scrolling on the scroll container
    const handleTOCScroll = () => {
      setIsUserScrolling(true);

      // Clear existing timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }

      // Reset after user stops scrolling for 500ms for more responsiveness
      userScrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 500);
    };

    // Smooth auto-scroll to keep active item centered in viewport
    const scrollActiveIntoView = () => {
      if (isUserScrolling) return;

      const activeElement = tocElement.querySelector(`.${LINK_ACTIVE_CLASS_NAME}`);

      // If no active element, scroll TOC to top (user is at beginning of post)
      if (!activeElement) {
        if (scrollContainer.scrollTop > 0) {
          programmaticScrollRef.current = true;
          scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          setTimeout(() => {
            programmaticScrollRef.current = false;
          }, 500);
        }
        return;
      }

      const containerHeight = scrollContainer.clientHeight;

      // Check if this is the first TOC item (likely at top of post)
      const firstTocItem = tocElement.querySelector(`.${LINK_CLASS_NAME}`);
      const isFirstItem = activeElement === firstTocItem;

      // If we're on the first item, scroll TOC to top
      if (isFirstItem) {
        if (scrollContainer.scrollTop > 0) {
          scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
        return;
      }

      // Define the "ideal zone" - we want the active element to stay in the top 40% of the container
      const idealZoneTop = containerHeight * 0.2; // 20% from top
      const idealZoneBottom = containerHeight * 0.6; // 60% from top

      const containerRect = scrollContainer.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      // Calculate current position of active element relative to container
      const activeRelativeTop = activeRect.top - containerRect.top;

      // Calculate how much we need to scroll to get the active element into the ideal zone
      let targetScrollAdjustment = 0;

      if (activeRelativeTop < idealZoneTop) {
        // Active element is too high, scroll up to bring it into ideal zone
        targetScrollAdjustment = activeRelativeTop - idealZoneTop;
      } else if (activeRelativeTop > idealZoneBottom) {
        // Active element is too low, scroll down to bring it into ideal zone
        targetScrollAdjustment = activeRelativeTop - idealZoneTop;
      }

      // Only scroll if adjustment is significant enough (prevents tiny micro-scrolls)
      if (Math.abs(targetScrollAdjustment) > 2) {
        const currentScrollTop = scrollContainer.scrollTop;
        const newScrollTop = currentScrollTop + targetScrollAdjustment;

        scrollContainer.scrollTo({
          top: newScrollTop,
          behavior: 'smooth',
        });
      }
    };

    // Throttled scroll function to prevent excessive calls
    const throttledScrollActiveIntoView = () => {
      // Clear any existing throttle
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }

      // Throttle the scroll updates to every 16ms (60fps) for smoother experience
      scrollThrottleRef.current = setTimeout(() => {
        requestAnimationFrame(scrollActiveIntoView);
      }, 16);
    };

    // Observe changes to active link
    const observer = new MutationObserver(() => {
      throttledScrollActiveIntoView();
    });

    observer.observe(tocElement, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true,
      attributeOldValue: true,
    });

    scrollContainer.addEventListener('scroll', handleTOCScroll, { passive: true });
    scrollContainer.addEventListener('wheel', handleTOCScroll, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTOCScroll, { passive: true });

    // Handle touch interactions
    scrollContainer.addEventListener(
      'touchstart',
      () => {
        setIsUserScrolling(true);
      },
      { passive: true }
    );

    scrollContainer.addEventListener(
      'touchend',
      () => {
        setTimeout(() => {
          setIsUserScrolling(false);
        }, 1000);
      },
      { passive: true }
    );

    return () => {
      observer.disconnect();
      scrollContainer.removeEventListener('scroll', handleTOCScroll);
      scrollContainer.removeEventListener('wheel', handleTOCScroll);
      scrollContainer.removeEventListener('touchmove', handleTOCScroll);
      scrollContainer.removeEventListener('touchstart', handleTOCScroll);
      scrollContainer.removeEventListener('touchend', handleTOCScroll);
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, [isUserScrolling]);

  return (
    <div ref={tocRef} className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
