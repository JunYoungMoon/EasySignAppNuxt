import {GetterTree, MutationTree} from 'vuex';

// RootState 인터페이스 정의
export interface RootState {
  accessToken: string | null;
  refreshToken: string | null;
}

// State 초기값 정의
export const state: RootState = {
  accessToken: null,
  refreshToken: null
};

// Getter 정의
export const getters: GetterTree<RootState, RootState> = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken
};

// Mutation 정의
export const mutations: MutationTree<RootState> = {
  setAccessToken(state, token: string) {
    state.accessToken = token;
  },
  setRefreshToken(state, token: string) {
    state.refreshToken = token;
  }
};
