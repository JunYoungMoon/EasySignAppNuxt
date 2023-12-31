import colors from 'vuetify/es5/util/colors'

export default {
  // server: {
  //     host: '0.0.0.0', // 모든 IP에서 접근 허용
  //     port: 3000, // 사용할 포트 번호
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head

  //클라이언트나 서버나 어느 곳에서도 사용 가능한 값들을 선언해 두는 곳
  publicRuntimeConfig: {
    apiURL : process.env.API_URL
  },
  //서버에서만 사용 가능한 값들을 선언해 두는 곳
  privateRuntimeConfig: {

  },
  head: {
    titleTemplate: '%s - EasySignAppNuxt',
    title: 'EasySignAppNuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
    ],
    link: [{rel: 'icon', type: 'images/x-icon', href: '/favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://easy-api.sgmchain.net:2128',
    baseURL: process.env.API_URL,
    credentials: true, // withCredentials를 활성화
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       },
  //       light: {
  //         primary: '#1976d2',
  //         secondary: '#424242',
  //         accent: '#82B1FF',
  //         error: '#FF5252',
  //         info: '#2196F3',
  //         success: '#4CAF50',
  //         warning: '#FFC107'
  //       },
  //     },
  //   },
  // },

  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '/',
          component: resolve(__dirname, 'pages/index.vue'),
        },
        {
          path: '/login',
          component: resolve(__dirname, 'layouts/auth.vue'),
          children: [
            {
              path: '',
              component: resolve(__dirname, 'pages/auth/login.vue'),
            },
          ],
        },
        {
          path: '/myinfo',
          component: resolve(__dirname, 'pages/myinfo.vue'),
        });
    },
    middleware: ['auth', 'loginCallback', 'theme'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
