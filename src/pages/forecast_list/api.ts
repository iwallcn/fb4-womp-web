import { request } from 'ice';

export default {
  // 获取列表
  async getList(data) {
    let d = await request.post('/forecast/list', data);
    console.log(d);
    return d;
  }
}
