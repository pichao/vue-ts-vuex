import Vuex from "vuex";
import Vue from "vue";
import { mutationTypes } from "constant/mutation_type";
import { rootModule } from "./modules/index.module";
console.log(rootModule);
Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: rootModule,
});
