import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { styled } from '@mui/material/styles';

import type { NavColor } from 'src/types/settings';

import type { Section } from '../config';
import { MobileNav } from '../mobile-nav';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { useMobileNav } from './use-mobile-nav';
import { useNotificationMenu } from './use-notification-menu';

const SIDE_NAV_WIDTH = 280;
const NOTIFICATION_MENU_WIDTH = 280;

interface VerticalLayoutRootProps {
  notificationMenuOpen: boolean;
}

const VerticalLayoutRoot = styled('div')<VerticalLayoutRootProps>(
  ({ theme,notificationMenuOpen }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingRight:notificationMenuOpen ? NOTIFICATION_MENU_WIDTH : '0',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: SIDE_NAV_WIDTH
    }
  })
);

const VerticalLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mobileNav = useMobileNav();
  const notificationMenu = useNotificationMenu();

  return (
    <>
      <TopNav 
      onMobileNavOpen={mobileNav.handleOpen} 
      onNotificationMenuOpen = {notificationMenu.handleToggle}
      />
      {lgUp && (
        <SideNav
          color={navColor}
          sections={sections}
        />
      )}
      {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          sections={sections}
        />
      )}
      <VerticalLayoutRoot notificationMenuOpen = {notificationMenu.open}>
        <VerticalLayoutContainer>
          {children}
        </VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.node,
  navColor: PropTypes.oneOf<NavColor>(['blend-in', 'discrete', 'evident']),
  sections: PropTypes.array
};
