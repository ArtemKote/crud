import { Outlet } from 'react-router-dom';
import { Flex, Layout } from 'antd';

import HeaderComponent from '@/components/HeaderComponent';
import FooterComponent from '@/components/FooterComponent';
import * as styles from './appPage.module.scss';

export const AppPage = () => {
  return (
    <Flex className={styles.appPage}>
      <HeaderComponent />
      <Flex className={styles.appPage__container}>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Flex>
      <FooterComponent />
    </Flex>
  );
};
