import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'ice';
import store from '@/store';
import { Nav } from '@alifd/next';

const SubNav = Nav.SubNav;
const NavItem = Nav.Item;

export interface IMenuItem {
  name: string;
  path: string;
  icon?: string;
  children?: IMenuItem[];
}

function getNavMenuItems(menusData: any[]) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => {
      return getSubMenuOrItem(item, index);
    });
}

function getSubMenuOrItem(item: IMenuItem, index: number) {
  if (item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children);
    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav
          key={index}
          icon={item.icon}
          label={item.name}
        >
          {childrenItems}
        </SubNav>
      );

      return subNav;
    }
    return null;
  }
  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      {(/http:|https:/.test(item.path)) &&
        <a href={item.path}>{item.name}</a>
      }
      {!(/http:|https:/.test(item.path)) &&
        <Link to={item.path}>
          {item.name}
        </Link>
      }
    </NavItem>
  );

  return navItem;
}

const Navigation = (props, context) => {

  const createMenu = (items) => {
    let menu = [];
    items.forEach(item => {
      let obj = {
        name: item.name,
        path: `${item.url}`,
        icon: item.style ? item.style : '',
        children: []
      };
      menu.push(obj);
      if (item.children) {
        obj.path = '/';
        item.children.forEach(child => {
          // furl前端控制的路由，其他后端控制
          let furl = ['/forecast/listPage', '/appointment/listPage', '/appointment/planListPage', '/appointment/calendarPage', '/appointmentConfigure/listPage', '/appointment/cancelListPage', '/batchAndExpire/configPage']
          let url = furl.indexOf(child.url) !== -1 ? child.url : `http://omp-fulfillment.test.i4px.com${child.url}`
          obj.children.push({
            name: child.name,
            path: url,
          });
        });
      }
      else {
        delete obj.children;
      }
    });
    return menu;
  };

  const { location, menus } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  const [basic] = store.useModel('basic');

  let menusConfig = createMenu(menus);
  menusConfig = menusConfig.concat(basic.asideMenu);

  return (
    <Nav
      type="normal"
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      embeddable
      activeDirection="right"
      openMode="single"
      iconOnly={isCollapse}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
    >
      {getNavMenuItems(menusConfig)}
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};

const PageNav = withRouter(Navigation);

export default PageNav;
