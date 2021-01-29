<template>
  <div>
    <div class="top-nav">
      <div class="center-frame">
        <div>
          <nuxt-link class="btn no-decoration" to="/"
            ><div class="logo">QUIZ !</div></nuxt-link
          >
        </div>
        <div>
          <div v-if="user != null" class="btn">
            <div class="el-icon-user-solid"></div>
            {{ user.email }}
            <div class="btn" @click="logout">
              Me déconnecter
            </div>
          </div>
          <nuxt-link v-else to="/login" class="btn no-decoration">
            Me connecter
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("setUser", null);
      this.$store.commit("setToken", null);
      this.$cookies.remove("quiz_auth");
      this.$router.replace("/login");
    }
  },
  computed: {
    ...mapGetters({ user: "getUser" })
  }
};
</script>

<style>
.top-nav {
  color: white;
  background-color: #43056d;
}
.top-nav .center-frame {
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.top-nav .btn {
  height: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
}
.top-nav .btn:hover {
  transition: all 0.15s ease-out;
  -moz-transition: all 0.15s ease-out;
  -webkit-transition: all 0.15s ease-out;
  background-color: #6300d4;
}
</style>
