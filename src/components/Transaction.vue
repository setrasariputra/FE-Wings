<template>
  <div>
    <div class="transaction">
      <div class="transaction-step">
        <el-steps :active="active">
          <el-step title="Add To Cart" />
          <el-step title="Checkout" />
          <el-step title="Success" />
        </el-steps>
      </div>
      <div v-if="addToCartStep">
        <AddToCart @productcartcallback="handleProductCartCallback" />
      </div>
      <div v-if="confirmCheckoutStep">
        <el-button size="small" @click.prevent="previousStep"
          >Previous Step</el-button
        >
        <br /><br />
        <ConfirmCheckout
          :product_cart="productCart"
          @confirmcheckoutcallback="handleConfirmCheckoutCallback"
        />
      </div>
      <div v-if="successCheckoutStep">
        <SuccessCheckout />
      </div>
    </div>
  </div>
</template>

<script>
import { ElStep } from "element-plus";
import AddToCart from "./AddToCart.vue";
import ConfirmCheckout from "./ConfirmCheckout.vue";
import SuccessCheckout from "./SuccessCheckout.vue";

export default {
  name: "Transaction",
  components: {
    ElStep,
    AddToCart,
    ConfirmCheckout,
    SuccessCheckout,
  },
  data() {
    return {
      addToCartStep: true,
      confirmCheckoutStep: false,
      successCheckoutStep: false,
      active: 1,
      productCart: [],
    };
  },
  created() {
    console.log("created");
  },
  methods: {
    handleProductCartCallback(values) {
      console.log(values);
      this.productCart = values;

      // step
      this.active = 2;
      this.addToCartStep = false;
      this.confirmCheckoutStep = true;
      this.successCheckoutStep = false;
    },
    previousStep() {
      // previous step
      this.active = 1;
      this.addToCartStep = true;
      this.confirmCheckoutStep = false;
      this.successCheckoutStep = false;
    },
    handleConfirmCheckoutCallback(values) {
      if (values == true) {
        // step
        this.active = 3;
        this.addToCartStep = false;
        this.confirmCheckoutStep = false;
        this.successCheckoutStep = true;
      }
    },
  },
};
</script>
