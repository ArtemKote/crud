import React, { FC, memo } from 'react';
import { Flex, Typography } from 'antd';
import * as styles from './errorPage.module.scss';

export interface ErrorPageProps {
  errorCode?: number;
  description?: string;
  hint?: string;
}

export const ErrorPage: FC<ErrorPageProps> = memo(
  ({ errorCode, description = 'Произошла ошибка', hint = 'Попробуйте обновить страницу' }) => {
    return (
      <Flex vertical className={styles.errorPage__wrapper}>
        <Flex vertical justify="center" align="center">
          <Flex className={styles.errorPage__textBlock}>
            <Typography.Title level={1}>
              {errorCode}
              {errorCode && ': '}
              {description}
            </Typography.Title>
            <Typography>{hint}</Typography>
          </Flex>
        </Flex>
      </Flex>
    );
  },
);

ErrorPage.displayName = 'ErrorPage';
