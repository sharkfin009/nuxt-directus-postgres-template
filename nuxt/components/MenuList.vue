<template>
  <div class="relative" >
    <div
      v-show="state"
      class="
        absolute
        -top-1
        -left-5
        md:left-5
        cursor-pointer
        z-10
        bg-gray-200
        px-2
        py-2
        rounded-xl
        shadow-xl
        w-[220px]
        md:w-[180px] md:text-sm
        text-base
      "
    >
      <div class="absolute right-2 top-2">
        <IconClose
          class="md:hidden w-4 transition hover:rotate-180"
          @mousedown="state = false"
          tabindex="0"
          role="button"
        />
      </div>
      <div v-for="(item, index) in list" :key="index">
        <button
          @click="fireSearch(item)"
          class="
            hover:bg-lime-500 hover:text-lime-50
            block
            px-2
            rounded-xl
            transition
            bg-gray-200
            lg:my-1
            md:my-1
            my-2
            md:text-base
            text-base
          "
          tabindex="0"
          role="button"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Array,
  },
  state: {
    type: Boolean,
  },
  type: {
    type: String,
  },
});
import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useGlobal } from "@/stores/global";
const global = useGlobal();
const fireSearch = (item) => {
  const router = useRouter();
  searchStore.$reset();

  let url = "";
  if (props.type == "category") {
     url = `/search?category=${item.name}`;
  } else {
     url = `/search?destinationType=${props.type}&destination=${item.name}`;
  }
  
  // check if we are on the search page. If not, navigate to search page
// and push the query params in both cases
  if (router.currentRoute.value.path != "/search") {
    console.log("navigating to search", url);
    router.push(url);

  } else {
    if(props.type == "category") {
      searchStore.category.name = item.name;
      searchStore.category.value = item.value;
    } else {
      searchStore.destination.name = item.name;
      searchStore.destination.type = props.type;
    }
    
    searchStore.fireQuery();
  }
  global.showMenu = false;





};
</script>