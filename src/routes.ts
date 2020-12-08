import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import BasicLayout from '@/layouts/BasicLayout';
// import Solution from '@/pages/Solution';
import Analysis from '@/pages/Analysis';
import Services from '@/pages/Services';

import forecast_list from '@/pages/forecast_list/index';
import appointment from '@/pages/appointmentConfigure/appointment'; // 我要预约
import appointmentConfigure from '@/pages/appointmentConfigure/index';
import appointmentConfigureAdd from '@/pages/appointmentConfigure/add';


const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/forecast/listPage', // 预约信息
        component: forecast_list,
      },
      {
        path: '/appointmentConfigure/listPage', // 预约设置管理
        component: appointmentConfigure,
      },
      {
        path: '/appointmentConfigure/addPage', // 预约设置管理-新增
        component: appointmentConfigureAdd,
      },
      {
        path: '/appointment', // 我要预约
        component: appointment,
      },
      {
        path: '/services',
        component: Services,
      },
      {
        path: '/dashboard/analysis',
        component: Analysis,
      },
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
    ],
  },
];
export default routerConfig;
