<template>
    <div></div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "Auth",
    props: {
      userAccess: { required: false, type: Array },
    },
    data() {
      return {
        token: "",
        refresh_token: "",
        auth: "",
        payload: "",
        frontURL: axios.defaults.baseFrontURL,
      };
    },
    created() {
      this.checkToken();
    },
    methods: {
      checkToken() {
        const token = localStorage.getItem("token");
        const refresh_token = localStorage.getItem("refresh_token");
        const auth = localStorage.getItem("auth");
  
        this.token = token;
        if (token == "" || refresh_token == "" || auth == "") {
          window.location.href = this.frontURL + "/login";
        }
      },
      
    },
  };
  </script>
  
  <style scoped></style>
  