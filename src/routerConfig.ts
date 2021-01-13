import AppointmentConfigure from '@/pages/AppointmentConfigure/index';
import AppointmentConfigureAdd from '@/pages/AppointmentConfigure/add';
import AppointmentConfigureDetail from '@/pages/AppointmentConfigure/detail';
import UnitConfigure from '@/pages/UnitConfigure/index';
import UnitConfigureAdd from '@/pages/UnitConfigure/add';
import ShipConfigure from '@/pages/ShipConfigure/index';
import ShipConfigureAdd from '@/pages/ShipConfigure/add';

export const children = [
  {
    path: '/appointmentConfigure/listPage', // 预约设置管理-列表
    component: AppointmentConfigure,
  },
  {
    path: '/appointmentConfigure/addPage', // 预约设置管理-新增
    component: AppointmentConfigureAdd,
  },
  {
    path: '/appointmentConfigure/detailPage', // 预约设置管理-详情
    component: AppointmentConfigureDetail,
  },
  {
    path: '/appointmentConfigure/unitListPage', // unit设置管理-列表
    component: UnitConfigure,
  },
  {
    path: '/appointmentConfigure/addUnitPage', // unit设置管理-新增
    component: UnitConfigureAdd,
  },
  {
    path: '/appointmentConfigure/shipListPage', // 船期设置管理-列表
    component: ShipConfigure,
  },
  {
    path: '/appointmentConfigure/addShipPage', // 船期设置管理-新增
    component: ShipConfigureAdd,
  }
]
