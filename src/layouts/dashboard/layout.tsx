import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { useSettings } from 'src/hooks/use-settings';

import { useSections } from './config';

import { VerticalLayout } from './vertical-layout';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = withAuthGuard((props) => {
  const settings = useSettings();
  const sections = useSections();



  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...props}
    />
  );
});

Layout.propTypes = {
  children: PropTypes.node
};
