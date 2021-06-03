import { mutationTypes } from "constant/mutation_type";
export const a_module = {
  namespaced: true,
  state: () => ({
    count_a: 1,
  }),
  mutations: {
    // mutations同步操作
    [mutationTypes.COUNT_ADD](state, action) {
      console.log(action, "action"); // 以对象形式commit时，相当于react里的reducer，commit相当于dispatch
      state.count_a++;
    },
    someMutation(state, action) {
      console.log(action, "action"); // 以对象形式commit时，相当于react里的reducer，commit相当于dispatch
      state.count_a++;
    },
  },
  actions: {
    // 在vue里dispatch走的是actions，commit走的是mutations，其中action和rxjs里的epic原理一致，就是action in，action out。
    actionsA: {
      root: true, // 在带有命名空间的action里注册全局action,但是没有局部注册全局mutation这个用法，也没必要
      handler: async (namespacedContext, payload) => {
        const {
          commit,
          dispatch,
          getters,
          state,
          rootGetters,
        } = namespacedContext;
        console.log(payload, "namespacedContext");

        commit("someMutation", await getData());
      },
    },
    async actionAA(context) {
      const { commit, dispatch, getters, state, rootGetters } = context;
      commit("someMutation", await getData());
    },
  },
  getters: {
    // 相当于store的计算属性,add1的值是函数的返回值
    add_a: (state, getters, rooteState, rootGetters) => {
      return state.count_a;
    },
  },
};
const getData = () => {
  // 异步操作
};
