import { defineStore } from 'pinia';
import { AppList, UserState } from './type';
import { LoginDto } from '@/api/types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: '',
    avatar: '',
    weChatUuid: '',
    appList: [],
    email: '',
    lastUpdateTime: 0,
    lastBackupTime: 0
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
    apiInfo(state: UserState): Array<AppList> {
      return state.appList || [];
    }
  },
  actions: {
    setUserInfo(payload: UserState) {
      this.$patch(payload);
    },
    setApiInfo(payload: Array<AppList>) {
      this.appList = payload;
    },
    async login(params: LoginDto) {
      try {
        console.log('params： ', params);
      } catch (error) {
        console.log('登录报错', error);
      }
    }
  }
});

export default useUserStore;
