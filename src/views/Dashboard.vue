<template>
  <div class="common-layout">
    <Auth />
    <el-container>
      <el-header>
        <MainMenu />
      </el-header>
      <el-main>
        <Transaction />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {
  ElContainer,
  ElHeader,
  ElMain,
} from "element-plus";
import MainMenu from "../components/MainMenu.vue";
import Auth from "../components/Auth.vue";
import Transaction from "../components/Transaction.vue";
export default {
  name: "Dashboard",
  components: {
    ElContainer,
    ElHeader,
    ElMain,
    MainMenu,
    Auth,
    Transaction,
  },
  data() {
    return {
        transaction: true,
    };
  },
};
</script>