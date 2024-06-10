<template>
  <div
    class="
      
      cursor-pointer
      px-5
      py-4
      
      bg-green-avo
      shadow
      hover:shadow-none
      rounded-full
      pointer-events-auto
      hover:bg-lime-500
      z-30
      

    "
  >
    <div class="relative">
      <input
        autocomplete="off"
        id="findInput"
        name="search"
        type="text"
        v-model="suggestStore.queryString"
        class="
          h-full
          text-sm
          lg:text-base
          rounded-full
          input-outline
          px-12
          py-2
          md:py-3 md:px-[45px]
          w-full
        "
        :class="{ 'shadow-lg': suggestStore.inputHasFocus }"
        @keyup="suggestStore.manageKeyUp"
        @focus="findInputFocus"
        placeholder="Where to?"
        @blur="
          suggestStore.showFindSuggestions = false;
          suggestStore.inputHasFocus = false;
        "
        ref="findInput"
      />
      <div
        class="
          pr-2
          absolute
          inset-y-0
          right-0
          cursor-pointer
          flex
          justify-center
        "
      >
        <IconClose
          class="w-6 transition hover:rotate-180"
          @mousedown="closeButton"
        />
      </div>
      <div class="absolute inset-0 flex items-center pl-3 pointer-events-none">
        <div
          class="
            pointer-events-auto
            bg-green-avo
            rounded-full
            p-1
            md:p-2
            flex
            justify-center
            item-center
          "
          @click="searchButton"
        >
          <IconSearch class="h-4" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  parent: String,
});

import { useStore } from "@/stores/search";
const searchStore = useStore();
import { useGlobal } from "@/stores/global";
const global = useGlobal();
import { useAutoSuggestStore } from "@/stores/autoSuggest";
const suggestStore = useAutoSuggestStore();
const route = useRoute();

const findInput = ref(null);


const findInputFocus = () => {

  if (suggestStore.packageSuggestions.length > 0) {
    suggestStore.showSuggestions = true;
  }
  suggestStore.inputHasFocus = true;
  // suggestStore.queryString = "";

};
const router = useRouter();
const closeButton = () => {
  suggestStore.clear()
  findInput.value.focus();
  searchStore.$reset();
  searchStore.showSearch = false;
  router.replace({ query: {} });
  searchStore.randomQuery(12)
};

</script>
<style scoped>
</style>