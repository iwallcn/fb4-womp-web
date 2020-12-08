import React, {useState, useEffect} from 'react';
import { injectIntl } from 'react-intl';
import {Radio} from '@alifd/next';
import { getLocale, setLocale } from '@/utils/locale';
import styles from './index.module.scss';
import api from '@/utils/api';
import { set_LANG_PACK, set_WH_ALL, set_DICT } from '@/utils/index';

export default injectIntl(({intl}) => {
  const [lang, setLang] = useState(getLocale());
  const selectLang = (value) => {
    setLang(value);
    setLocale(value);
  };

  /**
   * 监听：如果页面lang发生改变，则重新请求数据
   * 缓存语言包
   * 缓存所有仓库
   * 缓存所有字典
   */
  useEffect(() => {
    if(!lang) {
      return;
    }
    // 获取语言包
    window.lang = set_LANG_PACK();
    // 加载所有仓库地址
    set_WH_ALL();
    set_DICT();
  }, [lang]);

  return (
    <Radio.Group
      className={styles.lang}
      shape="button"
      value={lang}
      onChange={selectLang}
    >
      <Radio value="zh-CN">{intl.formatMessage({id: 'Lang.zhCN'})}</Radio>
      <Radio value="en-US">{intl.formatMessage({id: 'Lang.enUS'})}</Radio>
    </Radio.Group>
  );
});
