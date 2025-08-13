import React from 'react';
import type { JSX } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

import styles from './styles.module.css';

function useNavbarItems() {
  // Add our custom Main Site button to the navbar items
  return [
    ...useThemeConfig().navbar.items,
    {
      type: 'custom-main-site-button',
      position: 'right' as const,
    },
  ];
}

function NavbarItems({ items }: { items: any[] }) {
  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'custom-main-site-button') {
          return (
            <a
              key={i}
              href="https://www.quickforge.ai/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mainSiteButton}
            >
              Talk to us
            </a>
          );
        }
        return <NavbarItem {...item} key={i} />;
      })}
    </>
  );
}

function NavbarContentLayout({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className="navbar__item" />
          <NavbarSearch>
            <SearchBar />
          </NavbarSearch>
        </>
      }
    />
  );
}
