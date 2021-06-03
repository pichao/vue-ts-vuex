import { mutationTypes } from "constant/mutation_type";
export const b_module = {
  namespaced: true,
  state: () => ({
    count_b: 1,
  }),
  mutations: {
    // mutations同步操作
    [mutationTypes.COUNT_ADD](state, action) {
      console.log(action, "action"); // 以对象形式commit时，相当于react里的reducer，commit相当于dispatch
      state.count_b++;
    },
    someMutation(state, action) {
      console.log(action, "action"); // 以对象形式commit时，相当于react里的reducer，commit相当于dispatch
      state.count_b++;
    },
  },
  actions: {
    // 在vue里dispatch走的是actions，commit走的是mutations，其中action和rxjs里的epic原理一致，就是action in，action out。
    actionsB: {
      // action一种是函数，一种是对象形式且必须包含handler函数
      handler: (context, payload) => {
        const { commit, dispatch, getters, state, rootGetters } = context;
        // commit("someMutation", await getData());
        console.log(payload);
        commit(mutationTypes.COUNT_ADD, {
          msg: "命名空间mutation",
        });
        dispatch(
          "actionsA", // actionsA
          {
            actionsA: "局部派发全局action",
          },
          { root: true } // 局部派发全局action时，需要{root:true}为commit或者dispatch的第三个参数
        );
      },
    },
    actionsBB(context) {
      const { commit, dispatch, getters, state, rootGetters } = context;
    },
  },
  getters: {
    // 相当于store的计算属性,add1的值是函数的返回值
    add_b(state, getters, rooteState, rootGetters) {
      console.log(getters, "getters");
      return state.count_b;
    },
  },
};
const getData = () => {
  // 异步操作
};
