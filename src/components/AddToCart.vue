<template>
  <div>
    <div v-if="loadingProduct">
      <el-skeleton :rows="5" />
    </div>
    <div v-else>
      <el-table :data="products" style="width: 100%">
        <el-table-column label="Image" width="70px">
          <div class="thumbnail-image"></div>
        </el-table-column>
        <el-table-column label="Price">
          <template v-slot:default="props">
            <b>
              <el-link
                type="primary"
                @click.prevent="handleProductDetail(props.$index, props.row)"
                >{{ props.row.product_name }}</el-link
              > </b
            ><br />
            <span v-if="props.row.discount != null">
              <small
                ><s>{{ props.row.display_price }}</s></small
              ><br />
            </span>
            {{ props.row.display_sales_price }}
          </template>
        </el-table-column>
        <el-table-column label="Buy" width="100px">
          <template v-slot:default="props">
            <span v-if="props.row.choose == true">
              <el-button
                size="large"
                @click.pevent="handleBuy(props.$index, props.row)"
                ><el-icon size="large" color="#67c23a"> <Check /> </el-icon
              ></el-button>
            </span>
            <span v-else>
              <el-button
                type="primary"
                size="large"
                @click.pevent="handleBuy(props.$index, props.row)"
                >Buy</el-button
              >
            </span>
          </template>
        </el-table-column>
      </el-table>

      <br /><br />
      <div class="align-center">
        <el-button
          type="primary"
          size="large"
          @click.pevent="handleCheckout"
          :disabled="checkoutDisabled"
          round
          >Checkout</el-button
        >
      </div>
    </div>
    <el-dialog
      v-model="dialogProductDetail"
      width="500px"
      title="Product Detail"
    >
      <el-row>
        <el-col :span="12">
          <div class="product-image"></div>
        </el-col>
        <el-col :span="12">
          <div class="dialog-product-detail">
            <h2>{{ productDetail.product_name }}</h2>
            <br />
            <span v-if="productDetail.discount != null">
              <small
                ><s>{{ productDetail.display_price }}</s></small
              ><br />
            </span>
            {{ productDetail.display_sales_price }}<br /><br />
            <p>
              Dimension: {{ productDetail.dimension }}<br />
              Price Unit: {{ productDetail.unit }}<br />
            </p>
            <br /><br />
            <span v-if="productDetail.choose != true">
              <el-button
                type="primary"
                size="large"
                @click.pevent="handleBuy(productDetailIndex, productDetail)"
                >Buy</el-button
              >
            </span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  ElStep,
  ElTable,
  ElTableColumn,
  ElButton,
  ElIcon,
  ElSkeleton,
  ElLink,
  ElDialog,
  ElRow,
  ElCol,
} from "element-plus";
export default {
  name: "AddToCart",
  components: {
    ElStep,
    ElTable,
    ElTableColumn,
    ElButton,
    ElIcon,
    ElSkeleton,
    ElLink,
    ElDialog,
    ElRow,
    ElCol,
  },
  data() {
    return {
      products: [],
      urlProducts: "/api/v1/products",
      baseurl: axios.defaults.baseURL,
      frontURL: axios.defaults.baseFrontURL,
      loadingProduct: false,
      productCart: [],
      checkoutDisabled: true,
      dialogProductDetail: false,
      productDetail: [],
      productDetailIndex: 0,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        this.loadingProduct = true;
        const response = await axios({
          method: "get",
          url: this.urlProducts,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.data.status == "success") {
          this.products = response.data.data;
          this.loadingProduct = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleProductDetail(index, row) {
      this.productDetail = row;
      this.productDetailIndex = index;
      // show dialog
      this.dialogProductDetail = true;
    },
    handleBuy(index, row) {
      let choose = false;
      if (row.choose === undefined || row.choose === false) {
        choose = true;
        this.productCart.push(row);
      }
      if (row.choose === true) {
        choose = false;
        // remove array
        const index = this.productCart.indexOf(row);
        if (index !== -1) {
          this.productCart.splice(index, 1);
        }
      }

      // update productList
      let productList = this.products;
      productList[index].choose = choose;
      productList[index].qty = 1;
      productList[index].subtotal = row.sales_price;
      productList[index].display_subtotal = this.formatCurrency(row.sales_price);
      this.products = productList;

      this.disabledCheckout();

      // close dialog
      if (this.dialogProductDetail === true) {
        this.dialogProductDetail = false;
      }
    },
    disabledCheckout() {
      if (this.productCart.length > 0) {
        this.checkoutDisabled = false;
      } else {
        this.checkoutDisabled = true;
      }
    },
    handleCheckout() {
      this.$emit("productcartcallback", this.productCart);
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
  },
};
</script>
