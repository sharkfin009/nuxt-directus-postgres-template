import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "error" | "general"
declare module "/Users/reamato/Documents/ct/computravel/nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}