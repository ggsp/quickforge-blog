import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';

import styles from './styles.module.css';

export default function NavbarMobileSidebarLayout(): JSX.Element {
  const { shown } = useNavbarMobileSidebar();

  return (
    <div className="navbar-sidebar">
      <div className="navbar-sidebar__backdrop" role="presentation" />
      <div className={`navbar-sidebar__brand ${styles.mobileSidebar}`}>
        <NavbarMobileSidebarHeader />
        <div className={styles.mobileSidebarContent}>
          <NavbarMobileSidebarPrimaryMenu />
          <div className={styles.talkToUsContainer}>
            <a
              href="https://www.quickforge.ai/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileTalkToUs}
              aria-label={translate({
                id: 'theme.navbar.mobileMenu.talkToUs',
                message: 'Talk to us',
                description: 'The ARIA label for the mobile menu talk to us button',
              })}
            >
              Talk to us
            </a>
          </div>
          <NavbarMobileSidebarSecondaryMenu />
        </div>
      </div>
    </div>
  );
}
