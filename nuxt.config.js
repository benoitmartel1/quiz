export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        href:
          "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap",
        rel: "stylesheet"
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Varela+Round&display=swap",
        rel: "stylesheet"
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],
    script: [{ src: "/js/routines.js" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/styles/main.css"],

  axios: {
    baseURL: "http://localhost:3000/api"
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/element-ui", "@/plugins/supabase"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/vuetify"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "cookie-universal-nuxt"],
  router: {
    middleware: ["auth"]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
