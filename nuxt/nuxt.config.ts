// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: "https://www.googletagmanager.com/gtag/js?id=G-EZW74K289H" },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Crimson+Text&family=Open+Sans:wght@300&family=Rubik+Vinyl&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Titillium+Web:wght@300",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
    meta: [
      {
        name: "google-site-verification",
        content: "cGo6-n_9V3Ok6mwREXnwksX4RTqtdEEWBz5h41wUqQc",
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0",
      },
      {
        name: "language",
        content: "EN-ZA",
      },
      {
        name: "author",
        content: "Computravel",
      },
      {
        name: "distribution",
        content: "web",
      },
      {
        name: "pinterest-rich-pin",
        content: "false",
      },
      {
        property: "og:type",
        content: "Holiday Package",
      },
      {
        property: "og:title",
        content: "Computravel Travel Experts",
      },
      {
        property: "og:description",
        content:
          "Computravel serves as an online South African travel agent, boasting highly professional experts with years in the tourism and hospitality industries.",
      },
      {
        property: "description",
        content:
          "Computravel serves as an online South African travel agent, boasting highly professional experts with years in the tourism and hospitality industries.",
      },
      {
        name: "og:image",
        content:
          "https://res.cloudinary.com/sharkfin/image/upload/v1662040372/Screen_Shot_2022_09_01_at_12_47_02_60dcc9e618.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "https://computravel.co.za",
      },
      {
        name: "twitter:image",
        content:
          "https://res.cloudinary.com/sharkfin/image/upload/v1662040372/Screen_Shot_2022_09_01_at_12_47_02_60dcc9e618.png",
      },
    ],
  },
  modules: [
    "nuxt-jsonld",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-directus",
    "nuxt-simple-robots",
    "@vueuse/nuxt",
  ],
  buildModules: ["@nuxtjs/google-fonts"],
  build: {
    transpile: ["primevue"],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  routeRules: {
    "/": { index: true },
  },
  robots: {
    sitemap: process.env.SITE_URL + "/sitemap.xml",
  },
  css: [
    "@/styles/general.css",
    "@/styles/tailwind.css",
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
  ],

  runtimeConfig: {
    public: {
      imageUrl: process.env.IMAGE_URL,
      directusUrl: process.env.DIRECTUS_URL,
      directusToken: process.env.DIRECTUS_TOKEN,
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
      "Titillium+Web": true,
      "Open+Sans": {
        wght: [300, 400, 500],
      },
    },
  },

  directus: {
    token: process.env.DIRECTUS_TOKEN,
    url: process.env.DIRECTUS_URL,
  },
  image: {
    directus: {
      // This URL needs to include the final `assets/` directory
      baseURL: process.env.DIRECTUS_URL + "/assets",
      modifiers: {
        quality: 70,
        format: "webp",
        fit: "inside",
      },
    },
  },
});
