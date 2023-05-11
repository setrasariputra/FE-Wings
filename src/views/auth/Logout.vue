<template>
  <div class="logout">
    <div class="logout-content">
      <h2>Logout from all session!</h2>
      <br /><br />
      <h5>processing...</h5>
      <p>please wait for remove auth and redirection...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Logout",
  data() {
    return {
      frontURL: axios.defaults.baseFrontURL,
    };
  },
  created() {
    this.clearSession();
  },
  methods: {
    async clearSession() {
      try {
        const response = await axios.get("/api/v1/logout", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response.data.message);
        this.clearValueSession();
        setTimeout(() => {
          //this.$router.push("/login");
          window.location.href = this.frontURL + "/login";
        }, 2000);
      } catch (error) {
        console.log(error);
        // redirect to login
        setTimeout(() => {
          this.clearValueSession();
          //this.$router.push("/login");
          window.location.href = this.frontURL + "/login";
        }, 1000);
      }
    },
    clearValueSession() {
      localStorage.setItem("token", "");
      localStorage.setItem("refresh_token", "");
      localStorage.setItem("google_token", "");
      localStorage.setItem("auth", "");
    },
  },
};
</script>
