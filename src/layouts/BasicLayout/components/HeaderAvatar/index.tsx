import React from 'react';
import { Avatar, Overlay, Menu, Icon } from '@alifd/next';
import { injectIntl } from 'react-intl';
import styles from './index.module.scss';

const { Item } = Menu;
const { Popup } = Overlay;

const HeaderAvatar = injectIntl(({ user, intl }) => {
  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <Avatar size="small" src={user.avatar} alt={intl.formatMessage({ id: 'fb4.header.userAvatar' })} />
          <span style={{ marginLeft: 10 }}>{user.fullName}</span>
        </div>
      }
      triggerType="click"
    >
      <div className={styles.avatarPopup}>
        <div className={styles.panel}>
          <div>
            <h4>{intl.formatMessage({ id: 'fb4.header.personalInfo' })}</h4>
            <ul>
              <li>{intl.formatMessage({ id: 'fb4.header.name' })}：{user.name}</li>
              <li>{intl.formatMessage({ id: 'fb4.header.phone' })}：{user.phone}</li>
              <li>{intl.formatMessage({ id: 'fb4.header.email' })}：{user.email}</li>
              <li>{intl.formatMessage({ id: 'fb4.header.region' })}：{user.address}</li>
            </ul>
          </div>
          <div>
            <h4>{intl.formatMessage({ id: 'fb4.header.remark' })}</h4>
            <div>{user.remark}</div>
          </div>
        </div>
        <Menu className={styles.menu}>
          <Item><Icon size="small" type="set" />{intl.formatMessage({ id: 'fb4.header.editPwd' })}</Item>
          <Item><Icon size="small" type="exit" />{intl.formatMessage({ id: 'fb4.header.quit' })}</Item>
        </Menu>
      </div>
    </Popup>
  );
});

export default HeaderAvatar;
