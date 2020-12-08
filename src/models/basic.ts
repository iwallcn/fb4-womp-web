import { request } from 'ice';

export default {
  state: {
    logo: 'https://www.4px.com/favicon.ico',
    title: 'FB4运营管理',
    asideMenu: [ // 这里可以自定义一些前端路由
    ],
    ajaxData: {
      user: {},
      menu: [],
      foot: {},
      services: []
    }
  },
  reducers: {
    setAjaxData(prevState, res) {
      const employee = res.headInfo.employee;
      prevState.ajaxData = {
        user: {
          avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
          fullName: res.headInfo.userName,
          name: employee.fullName,
          phone: employee.phone,
          email: employee.email,
          address: `${employee.country} / ${employee.province} / ${employee.city}`,
          remark: employee.remark || '这家伙很赖~'
        },
        menu: res.sideBarInfo.menus,
        foot: {
          copyright: res.footBarInfo.footBar
        },
        services: res.headInfo.dimensionList
      };
    },
  },
  effects: () => ({
    async getAjaxData() {
      const res = await request({
        url: 'http://components.test.i4px.com/uedFrameComponent/innerUedInfo',
        method: 'POST',
        data: {
          clientId: 'EC8xmuKPY6Iy50VR', // 权限系统客户端ID（必传）
          userId: '64c4273c6b63494bbf354ce88ded7f66', // 当前登录用户的ID（必传）
          isInternational: false, // 客户端系统是否需要支持国家化，默认false
          workbenchType: 'WBNM4BE' // 工作台编号（员工工作台：WBNM4BE，IT工作台：WBFYK4U，外部工作台：WBEXTER）
        },
        transformRequest: [function (data) {
          let ret = '';
          for (let it in data) {
            ret += `${it}=${data[it]}&`;
          }
          return ret;
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      this.setAjaxData(res);
    }
  })
};
