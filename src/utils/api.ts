import { request } from 'ice';
// import { getLocale } from './locale';

/***
 * 存放通用接口
 */
export default {
  // 获取字典数据
  async getDictionary() {
    const lang = localStorage.lang.split('-')[0];
    return await request(`/static/dictionary/all?lan=${lang}`);
  },

  // 获取翻译语言包
  async getLang() {
    const lang = localStorage.lang.split('-')[0];
    return await request(`/translation/getAll?language=${lang}`);
  },

  // 获取所有仓库
  async getWHAll() {
    const lang = localStorage.lang.split('-')[0];
    return await request({
      url: '/static/warehouses/all',
      method: 'POST',
      data: { lan: lang },
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) {
          ret += `${it}=${data[it]}&`;
        }
        return ret.substr(0, ret.length - 1);
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  },

}
