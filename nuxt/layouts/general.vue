<template>
  <div class="bg-slate-50 font-open-sans w-screen select-none min-h-[200vh]">
    <div class="sticky top-0 z-50  bg-slate-50   bg-opacity-90">
      <Header />
    </div>
    <div class="relative bg-none">
      <SearchAutoSuggestOverlay parent="homelayout" />
    </div>
    <div
      class="px-8 md:px-16 bg-slate-50  "
      v-show="suggestStore.showSuggestions == false"
      >
      <slot />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { useAutoSuggestStore } from "@/stores/autoSuggest";
const suggestStore = useAutoSuggestStore();
</script>
