<template>
  <div>
    <el-table :data="product_cart" style="width: 100%">
      <el-table-column label="Image" width="70px">
        <div class="thumbnail-image"></div>
      </el-table-column>
      <el-table-column label="Cart">
        <template v-slot:default="props">
          <b>{{ props.row.product_name }}</b><br />
          <div class="input-number-updown">
            <ul>
              <li
                class="numberdown"
                @click.prevent="
                  handleUpdateQtyCartProduct(
                    'down',
                    props.$index,
                    props.row.qty
                  )
                "
              >
                -
              </li>
              <li>{{ props.row.qty }}</li>
              <li
                class="numberup"
                @click.prevent="
                  handleUpdateQtyCartProduct('up', props.$index, props.row.qty)
                "
              >
                +
              </li>
            </ul>
          </div>
          {{ props.row.unit }}
          <br />
          Subtotal: <b>{{ props.row.display_subtotal }}</b>
        </template>
      </el-table-column>
    </el-table>
    <br /><br />
    <div class="align-center">
      <div v-if="showAlert">
        <el-alert :title="errorMessage" type="error" />
        <br />
      </div>
      <h4>TOTAL: {{ display_total }}</h4>
      <br />
      <el-button
        type="primary"
        size="large"
        @click.prevent="handleCheckout"
        :loading="isLoading"
        round
        >Confirm</el-button
      >
    </div>
  </div>
</template>
<script>
import { ElTable, ElTableColumn, ElAlert } from "element-plus";
import axios from "axios";
export default {
  name: "ConfirmCheckout",
  components: {
    ElTable,
    ElTableColumn,
    ElAlert,
  },
  props: {
    product_cart: { required: true, type: Object },
  },
  data() {
    return {
      urlCheckout: "/api/v1/transaction/checkout",
      checkout: true,
      total: 0,
      display_total: "",
      isLoading: false,
      showAlert: false,
      errorMessage: "",
    };
  },
  mounted() {
    this.updateTotal();
  },
  methods: {
    updateTotal() {
      let new_total = 0;
      for (let x in this.product_cart) {
        new_total =
          new_total +
          this.product_cart[x].qty * this.product_cart[x].sales_price;
      }
      this.total = new_total;
      this.display_total = this.formatCurrency(new_total);
    },
    handleUpdateQtyCartProduct(type, index, qty) {
      if (type == "up") {
        let new_qty = qty + 1;
        let new_subtotal = this.product_cart[index].sales_price * new_qty;
        this.product_cart[index].qty = new_qty;
        this.product_cart[index].subtotal = new_subtotal;
        this.product_cart[index].display_subtotal =
          this.formatCurrency(new_subtotal);
      } else {
        if (qty > 1) {
          let new_qty = qty - 1;
          let new_subtotal = this.product_cart[index].sales_price * new_qty;
          this.product_cart[index].qty = new_qty;
          this.product_cart[index].subtotal = new_subtotal;
          this.product_cart[index].display_subtotal =
            this.formatCurrency(new_subtotal);
        }
      }
      this.updateTotal();
    },
    formatCurrency(value) {
      let result = "";
      let intPart = Math.floor(value);

      // Format bagian integer
      result = intPart.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });

      return result;
    },
    async handleCheckout() {
      try {
        this.showAlert = false;
        this.isLoading = true;
        const response = await axios({
          method: "post",
          url: this.urlCheckout,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            product_cart: this.product_cart,
          },
        });
        if(response.data.status == 'error') {
            this.showAlert = true;
            this.errorMessage = response.data.message
        }else
        if(response.data.status == 'success') {
            this.$emit("confirmcheckoutcallback", true);
        }
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
  },
};
</script>
