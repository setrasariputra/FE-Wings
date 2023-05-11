<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    ellipsis="false"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="0">#PENJUALAN</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="handleRoute('/dashboard')"
      >Dashboard</el-menu-item
    >
    <el-menu-item index="2" @click="handleRoute('/report')"
      >Laporan</el-menu-item
    >
    <el-menu-item index="3" @click="handleRoute('/logout')"
      >Logout</el-menu-item
    >
  </el-menu>
</template>
<script>
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
export default {
  name: "MainMenu",
  components: {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
  },
  created() {
    console.log("created");
  },
  methods: {
    handleRoute(pathRoute, refresh = false) {
      if (refresh == true) {
        window.location.href = this.frontURL + pathRoute;
      } else {
        this.$router.push({ path: pathRoute });
      }
    },
  },
};
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
