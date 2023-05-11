<template>
  <div class="login">
    <div class="login-form">
      <el-alert v-if="showAlert" :title="errorMessage" type="error" />
      <div class="login-title">#Login</div>
      <form>
        <el-form label-position="top" label-width="120px">
          <el-form-item label="Username">
            <el-input
              v-model="form.user"
              size="large"
              placeholder="place your email"
            />
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              type="password"
              v-model="form.password"
              size="large"
              placeholder="place your password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              @click.pevent="onSubmit"
              :loading="isLoading"
              >{{ labelSubmit }}</el-button
            >
          </el-form-item>
        </el-form>
      </form>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElAlert } from "element-plus";
import axios from "axios";
export default {
  name: "Login",
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElAlert,
  },
  data() {
    return {
      urllogin: "/api/v1/login",
      labelSubmit: "Sign in",
      isLoading: false,
      form: {
        user: "",
        password: "",
      },
      baseurl: axios.defaults.baseURL,
      frontURL: axios.defaults.baseFrontURL,
      errorMessage: "",
      showAlert: false,
    };
  },
  created() {
    console.log("created");
  },
  methods: {
    async onSubmit() {
      try {
        this.showAlert = false;
        this.isLoading = true;
        const response = await axios({
          method: "post",
          url: this.urllogin,
          data: this.form,
        });
        if (response.data.status == "error") {
          this.showAlertMessage(response.data.message);
        } else if (response.data.status == "success") {
          let dataAuth = JSON.stringify(response.data.auth);
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("auth", dataAuth);

          window.location.href = this.frontURL + "/dashboard";
        }
      } catch (error) {
        console.log(error);
        this.showAlertMessage("Unauthorized");
        this.labelSubmit = "Sign in";
        this.isLoading = false;
      }
    },
    showAlertMessage(error_msg) {
      this.showAlert = true;
      this.errorMessage = error_msg;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped></style>
