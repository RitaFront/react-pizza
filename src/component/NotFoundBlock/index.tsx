import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.content}>
      <h1>
        <span>🥲</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.descr}>
        К сожалению, данная страница отсутствует в нашем
        интрнет-магазине
      </p>
    </div>
  );
};
