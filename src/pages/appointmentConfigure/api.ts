import { request } from 'ice';

export default {
  // 获取列表
  async getList(warehouseCode, carrierType) {
    return await request(`/appointmentConfigure/selectBy?warehouseCode=${warehouseCode}&carrierType=${carrierType}`);
  }
}
