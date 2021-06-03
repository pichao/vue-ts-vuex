import { mutationTypes } from "constant/mutation_type";
export const g_module = {
  state: () => ({
    count_g: 1,
  }),
  mutations: {
    // mutations同步操作
    [mutationTypes.COUNT_ADD_g](state, action) {
      console.log(action, "action"); // 以对象形式commit时，相当于react里的reducer，commit相当于dispatch
      state.count_g = 10;
    },
    someMutation(state, action) {
      console.log(action, "action"); // 以对象形式commit时，相当于react里的reducer，commit相当于dispatch
      state.count_g++;
    },
  },
  actions: {
    // 在vue里dispatch走的是actions，commit走的是mutations，其中action和rxjs里的epic原理一致，就是action in，action out。
    async actionsA(context) {
      const { commit, dispatch, getters, state, rootGetters } = context;
      commit("someMutation", await getData());
    },
  },
  getters: {
    // 相当于store的计算属性,add1的值是函数的返回值
    add_g: (state, getters, rooteState, rootGetters) => {
      return state.count_g;
    },
  },
};
const getData = () => {
  // 异步操作
};
