
import { createStore } from 'ice';
import user from './models/user';
import basic from './models/basic';

const store = createStore({ basic, user });
// 状态管理
export default store;
