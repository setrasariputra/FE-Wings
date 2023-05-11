<template>
  <div class="success-checkout align-center">
    <div class="success-icon">
      <el-icon color="#67c23a"> <CircleCheck /> </el-icon>
    </div>
    <h3>Success Checkout</h3>
    <br /><br />
    <el-button @click.prevent="handleCreateNew"
      >Create New Transaction</el-button
    >
  </div>
</template>

<script>
import { ElIcon, ElButton } from "element-plus";
import axios from "axios";
export default {
  name: "SuccessCheckout",
  components: {
    ElIcon,
  },
  data() {
    return {
      frontURL: axios.defaults.baseFrontURL,
    };
  },
  created() {
    console.log("created");
  },
  methods: {
    handleCreateNew() {
      window.location.href = this.frontURL + "/dashboard";
    },
  },
};
</script>
