import { NuxtModule } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["nuxt-jsonld"]?: typeof import("nuxt-jsonld").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["image"]?: typeof import("@nuxt/image").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["directus"]?: typeof import("nuxt-directus").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["robots"]?: typeof import("nuxt-simple-robots").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["nuxt-config-schema"]?: typeof import("nuxt-config-schema").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["nuxt-jsonld", NuxtConfig["nuxt-jsonld"]] | ["@pinia/nuxt", NuxtConfig["pinia"]] | ["@nuxtjs/tailwindcss", NuxtConfig["tailwindcss"]] | ["@nuxt/image", NuxtConfig["image"]] | ["nuxt-directus", NuxtConfig["directus"]] | ["nuxt-simple-robots", NuxtConfig["robots"]] | ["nuxt-config-schema", NuxtConfig["nuxt-config-schema"]] | ["@nuxt/telemetry", NuxtConfig["telemetry"]])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },
  }
  interface PublicRuntimeConfig {
   imageUrl: string,

   directusUrl: string,

   directusToken: string,

   directus: {
      url: string,

      autoFetch: boolean,

      autoRefresh: boolean,

      onAutoRefreshFailure: any,

      fetchUserParams: any,

      token: string,

      devtools: boolean,

      cookieNameToken: string,

      cookieNameRefreshToken: string,

      cookieMaxAge: number,

      cookieSameSite: string,

      cookieSecure: boolean,
   },
  }
}