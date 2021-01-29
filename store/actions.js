export async function nuxtServerInit({ commit }, { req, res }) {
  if (req.headers.cookie) {
    const cookie = this.$cookies.get("quiz_auth");
    if (cookie) {
      try {
        this.$db.auth.session = () => ({
          access_token: cookie.access_token
        });
        const { access_token } = this.$db.auth.session();

        const user = await this.$db.auth.api.getUser(access_token).then(res => {
          commit("setUser", res.data);
          commit("setToken", access_token);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
  // If we have token within cookies we get user data from api and we pass Autorization headers with token
  //   if (token !== null && token !== false) {
  //     await axios
  //       .get("/api/auth/me", {
  //         headers: {
  //           Authorization: token
  //         }
  //       })
  //       .then(response => {
  //         // If  we get user data we set it to store

  //       })
  //       .catch(error => {
  //         // If we get error, we should logout user by removing data within cookies and store
  //         // Additionally you can create specific code error on backend to check if token is expired or invalid
  //         // and then check for status code and then remove data
  //         commit("setUser", null);
  //         commit("setToken", null);
  //         res.setHeader("Set-Cookie", [
  //           `authToken=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  //         ]);
  //         // This is only way I found useful for removing cookies from node server
  //         console.warn(error);
  //       });
  //   }
}
