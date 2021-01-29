<template>
  <div class="container">
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!-- <div class="box centered"></div> -->
    <el-card class="small-box">
      <el-form label-width="120px" :model="user">
        <el-form-item
          prop="email"
          :rules="[
            {
              type: 'email',
              message: 'Entrez une adresse email valide',
              trigger: ['blur', 'change']
            }
          ]"
          label="Email"
        >
          <el-input v-model="user.email" type="email"
            >martel.b@gmail.com</el-input
          >
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            status-icon="true"
            @click="handleLogin('LOGIN')"
            >Login</el-button
          >
          <el-button type="primary" @click="handleLogin('SIGNUP')"
            >Signup</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: false,
      user: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    async handleLogin(type) {
      try {
        const { error, user } =
          type === "LOGIN"
            ? await this.$db.auth
                .signIn({
                  email: this.user.email,
                  password: this.user.password
                })
                .then(res => {
                  this.$store.commit("setUser", res.data.user);
                  this.$store.commit("setToken", res.data.access_token);
                  this.$cookies.set(
                    "quiz_auth",
                    {
                      path: "/quiz/auth/",
                      access_token: res.data.access_token
                    },
                    {
                      expires: new Date(
                        new Date().getTime() + 60 * 60 * 24 * 1000
                      )
                    }
                  );
                  if (this.$route.query.redirect) {
                    this.$router.push(this.$route.query.redirect);
                  }

                  this.$router.push("/edit/question");
                })
            : await this.$db.auth.signUp({
                email: this.user.email,
                password: this.user.password
              });
        // If the user doesn't exist here and an error hasn't been raised yet,
        // that must mean that a confirmation email has been sent.
        // NOTE: Confirming your email address is required by default.
        if (error) {
          this.$message.error(error.message);
        } else {
          if ((user.aud = "authenticated")) console.log(user);
          console.log(this.$db.auth.session());
          this.$router.push({ path: "/edit/question" });

          if (!user)
            this.$notify({
              title: "Success",
              message:
                "Un message vous a été envoyé à " +
                this.user.email +
                ". Veuillez suivre les instructions.",
              type: "success"
            });
        }
      } catch (error) {
        console.log(error);
        console.log("error", error);
        this.$message.error(error.error_description || error);
      }
    }
  }
};
</script>

<style>
.small-box {
  max-width: 50%;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}
</style>
