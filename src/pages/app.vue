<template>
  <div>
    <Button type="primary">sss</Button>
    <div v-for="o in list" :key="o" class="aaa">啊啊啊啊啊啊啊啊啊</div>
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
    <router-link to="/about/11">/user/11</router-link>
    <router-link to="/home1">home1</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Button, DatePicker, Input } from "element-ui";
const mixins = {
  computed: {
    num1: function() {
      return (this as any).value2;
    },
  },
};
export default {
  name: "app",
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
    handleShowImg: function() {
      console.log(this.$refs.num, "ooooooooooo");
      this.$data.showImg = !this.$data.showImg;
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
      return (this as any).va + "ddd";
    },
  },
  mixins: [mixins],
  created: function() {
    // 组件被创建完之后,也即是，实例化完成，但是还没开始挂载
    console.log("组件创建完成");
    console.log(this);
  },
  mounted: function() {
    console.log("组件挂在完成111111111");
  },
  watch: {
    // 侦听属性，也是监控响应式依赖而执行的函数，当且仅当监听的属性变化，
    // 且需要执行异步操作时，用侦听属性比较合适
    va: function() {
      // 当响应式属性va发生变化时，执行该函数
      console.log("va发生变化了");
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
