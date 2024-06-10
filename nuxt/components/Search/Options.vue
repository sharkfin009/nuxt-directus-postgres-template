<template>
  <div
    class="select-none rounded-3xl user-select-none bg-green-avo shadow-xl hover:shadow-none border px-5 py-5 md:py-10 md:px-10 opacity-100 font-medium z-10"
  >
    <div class="grid grid-cols-2">
      <div class="w-full">
        <div >
          <span class=" !text-xl">
          <!-- {{ searchStore.results.length?"Showing results for: ":"Showing sampled results " }} -->
            
            Destination:
            <span class="text-lime-500"> {{
              searchStore.destination.name??"All"
            }}
            </span>
            &nbsp
            &nbsp
            Category:
          <span class="text-lime-500">
            {{ searchStore.category.name??"All" }}
            </span> 
            </span
          >
        </div>
      </div>
      <!--  toggle -->
      <div class="cursor-pointer w-full">
        <div
          @click="searchStore.showFilters = true"
          v-if="!searchStore.showFilters"
          class="text-lime-600 hover:text-lime-500 grid grid-cols-[auto,30px,100px] w-full"
        >
          <div></div>
          <div class="flex items-center">
            <IconChevronLeft class="w-6" />
          </div>
          <div>show filters</div>
        </div>
        <div
          @click="searchStore.showFilters = false"
          v-if="searchStore.showFilters"
          class="w-full text-lime-600 hover:text-lime-500 grid grid-cols-[auto,30px,100px] w-full"
        >
          <div></div>
          <div class="flex items-center">
            <IconChevronDown class="w-6" />
          </div>
          hide filters
        </div>
      </div>
    </div>
    <!-- grid -->
    <div
      class="w-full mt-5 flex flex-col justify-evenly items-evenly md:grid md:grid-cols-3 md:grid-rows-2 xl:grid-cols-3 xl:grid-rows-2 h-none gap-10 md-gap-1 w-full"
      v-if="searchStore.showFilters"
    >
      <SearchSelect
        label="Destination"
        inputName="destination"
        :options="global.destinations"
        placeholder="Any"
        key = "searchstore.rnd"
      />
      <SearchSelect
        label="Categories"
        inputName="category"
        :options="global.categories"
        placeholder="All"
        key = "searchstore.rnd"
      />

      <!-- dates -->

      <SearchInput
        class=""
        inputName="from_date" 
        label="Show Packages From"
        type="date"
        :validationObject="{}"
        errorMessage=""
        placeholder="Anytime"
        @setValue="setValue"
        key = "searchstore.rnd"
      />
      <SearchInput
        class=""
        inputName="to_date"
        label="To"
        type="date"
        :validationObject="{}"
        errorMessage=""
        placeholder="Anytime"
        @setValue="setValue"
        key = "searchstore.rnd"
      />
      <!-- sort by dropdown -->

      <SearchSelect
        label="Sort by"
        inputName="sortBy"
        :options="sort_options"
        placeholder="price low to high"
      />
      <div class="h-full flex flex-col justify-between">
        <div class="mb-5">Price Range</div>
        <div
          class="grid md:grid-cols-[100px,auto,100px] grid-cols-[50px,auto,90px] bg-white md:py-[15px] md:px-5 h-[55px] rounded-xl text-sm input-outline"
        >
          <div class="text-center flex items-center justify-center">
            R{{ numberWithCommas(searchStore.price_min) }}
          </div>
          <div class="relative">
            <div
              class="absolute inset-0 gap-4 cursor-pointer flex flex-col justify-center"
              id="min"
            >
              <input
                autocomplete="off"
                class=""
                v-model.number="searchStore.price_min"
                type="range"
                min="0"
                max="100000"
                @change="searchStore.fireQuery()"
        key = "searchstore.rnd"
              />
            </div>

            <div class="h-full flex items-center gap-4 cursor-pointer" id="max">
              <input
                autocomplete="off"
                v-model.number="searchStore.price_max"
                type="range"
                min="0"
                max="100000"
                @change="searchStore.fireQuery()"
        key = "searchstore.rnd"
              />
            </div>
          </div>
          <div class="flex justify-center items-center">
            R{{ numberWithCommas(searchStore.price_max) }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="searchStore.showFilters"
      @click="clearFilters"
      class="
        cursor-pointer
        w-full
        mt-10
        text-center text-lime-600
        hover:text-lime-500
      "
    >
      clear filters
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/stores/search";
const searchStore = useStore();
import { useGlobal } from "@/stores/global";
const global = useGlobal();

const getTitle = (searchStore) => {
  const name = searchStore.destination.name ? searchStore.destination.name : searchStore.category.name;
  if (name == null || typeof name !== 'string') {
    return '';
  }
  return ' for ' + name;
};

// Set page title
const pageTitle = ref('Search results ' + getTitle(searchStore) + ' - Computravel');

searchStore.$subscribe((mutation, state) => {
  if (state.price_min > state.price_max) {
    state.price_max = state.price_min;
  }
  if (state.price_max < state.price_min) {
    state.price_min = state.price_max;
  }

  // Set the page title
  const title = searchStore.destination.name ? searchStore.destination.name : searchStore.category.name;
  pageTitle.value = 'Search results - Computravel';
  if (typeof title == 'string' && title != null) {
    if (title.length > 0) {
      pageTitle.value = 'Search results for ' + title + ' - Computravel';
    }
  }
});

useHead({
  title: pageTitle.value,
  meta: [
    { name: "description", content: "" },
    { name: "og:description", content: pageTitle.value },
    { name: "og:title", content: pageTitle.value + " - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: pageTitle.value },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: pageTitle.value + " - Computravel" },
  ],
  htmlAttrs: {
    lang: 'en'
  },
});

const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const sort_options = [
  { name: "Price low to high", type: null, value: "priceInc" },
  { name: "Price high to low", type: null, value: "priceDescππ" },
];

const clearFilters = () => {

  searchStore.$reset();
  navigateTo({
    path: "/search",
  });
  searchStore.randomQuery(12, true);
  searchStore.showFilters = false;
  setTimeout(() => {
    searchStore.showFilters = true;
  }, 100);
};

const setValue = (inputName, value) => {
  state[inputName] = value;
};

</script>

<style scoped>
/* style for range slider */
#min input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 23px;
  width: 19px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  background-color: #d9e8c9;
  margin-top: -2px;
  transform: translateX(-50%);
  pointer-events: all;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(190, 190, 190, 0.801);
}

#max input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 23px;
  width: 19px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  background-color: #d9e8c9;
  margin-top: -2px;
  transform: translateX(50%);
  pointer-events: all;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(190, 190, 190, 0.801);
}

input[type="range"]::-webkit-slider-thumb:hover {
  background-color: #ecfccb !important;
  box-shadow: 2px 2px 5px grey;
  transition: all;
  transition-duration: 1000;
}

input[type="range"] {
  appearance: none;
  width: 100%;
  background-color: rgb(255, 255, 255);
  background: linear-gradient(#bbbbbb, #c3c3c3) no-repeat center;
  /* Use a linear gradient to generate only the 2px height background */
  background-size: 100% 4px;
  pointer-events: none;
  border-radius: 50%;
}
</style>
