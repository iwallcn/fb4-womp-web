import React from 'react';
import styles from './index.module.scss';

export default function Footer({foot}) {
  return (
    <p className={styles.footer}>
      <span className={styles.copyright}>{foot.copyright}</span>
      <br />
      <span className={styles.logo}>Alibaba Fusion</span>
    </p>
  );
}
