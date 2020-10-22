import { useMediaQuery } from 'react-responsive';

export const TabletNavigation = ({ children }) => {
  const isTabletMenuWidth = useMediaQuery({ maxWidth: 1119 });
  return isTabletMenuWidth ? children : null;
}

export const NotMobileNavigation = ({ children }) => {
  const isMobileMenuWidth = useMediaQuery({ maxWidth: 520 });
  return isMobileMenuWidth ? null : children;
}

export const MobileNavigation = ({ children }) => {
  const isMobileMenuWidth = useMediaQuery({ maxWidth: 520 });
  return isMobileMenuWidth ? children : null;
}

export const TabletAndMobile = ({ children }) => {
  const isNotDesktop = useMediaQuery({ maxWidth: 768 });
  return isNotDesktop ? children : null;
}

export const OnlyDesktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  return isDesktop ? children : null;
}

export const NotDesktopContactForm = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 841 });
  return isDesktop ? null : children;
}

