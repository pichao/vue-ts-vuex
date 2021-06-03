<template>
  <div>
    <Button type="primary">sss</Button>
    <div v-for="o in list" :key="o" class="aaa">这里是首页</div>
    <transition name="fade">
      <img src="~assets/a.jpg" alt="" v-show="showImg" />
    </transition>
    <button @click="handleShowImg">dianji</button>
    <DatePicker
      placeholder="选择日期"
      v-model="value2"
      type="date"
      align="right"
      :picker-options="pickerOptions"
    />
    <Input v-model="va" @change="change" />
    <div ref="num">{{ num }}</div>
    <div>{{ num1 }}</div>
    <div>{{ fullpath }}</div>
    <div>{{ $store.getters.add1 }}</div>
    <button @click="countAdd">count++</button>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import { Button, DatePicker, Input } from "element-ui";
import { mutationTypes } from "constant/mutation_type";

const mixins = {
  computed: {
    num1: function() {
      return (this as any).value2;
    },
  },
};
export default {
  name: "home",
  components: {
    Button,
    DatePicker,
    Input,
  },
  data() {
    return {
      list: [1, 2, 3],
      msg: "Hello world!",
      showImg: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value2: "",
      va: "",
    };
  },

  methods: {
    countAdd: function() {
      console.log(this.$store, "xxxxxxxxx");
      this.$store.dispatch("b_module/actionsB", {
        s: 1,
      });
    },
    handleShowImg: function() {
      console.log(this.$refs.num, "ooooooooooo");
      this.$data.showImg = !this.$data.showImg;
      this.$nextTick(() => {
        // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        console.log("dom更新之后");
      });
    },
    onchange: function(mValue, sValue) {
      console.log((this as any).va);
      console.log(mValue, sValue, "hhhhhhhhh");
    },
    change: function(value) {
      console.log(this, "xxxxxxxxxxxx");
      console.log((this as any).va, "yyyyyyyyyy");
    },
  },
  computed: {
    // 计算属性，依赖于响应式依赖进行缓存，响应式依赖不变，则函数不执行
    num: function() {
      console.log(this.$route);
      return (this as any).va + "ddd";
    },
    fullpath: function() {
      return this.$route.fullPath;
    },
  },
  mixins: [mixins],
  created: function() {
    // 组件被创建完之后,也即是，实例化完成，但是还没开始挂载
    console.log("组件创建完成");
    console.log(this.$store, "store分片");
  },
  mounted: function() {
    this.$nextTick(() => {
      console.log("nextTick");
    });
    console.log(this.$store.state, "mmmmmmmmmmm");
  },

  watch: {
    // 侦听属性，也是监控响应式依赖而执行的函数，当且仅当监听的属性变化，
    // 且需要执行异步操作时，用侦听属性比较合适
    va: function() {
      // 当响应式属性va发生变化时，执行该函数
      console.log("va发生变化了");
    },
    $route: function() {
      // 组件复用更新组件使用
      console.log("路由改变呜呜呜呜");
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log("复用");
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
