<template>
  <div
    class="fixed select-none inset-0 flex justify-end z-40 pointer-events-none"
  >
    <div class="backdrop-blur h-full list-none fixed" ref = "menu" >
      <div
        class="h-full w-[100vw] md:w-[50vw] lg:w-[30vw] pl-10 md:pl-10 md:pt-16 font-titillium bg-white opacity-100 md:opacity-80 relative pointer-events-auto text-lg md:text-lg backdrop-blur-lg"
        role="menu" aria-label="Hamburger menu for searching destinations and packages"
      >
        <div class="overflow-auto w-full h-screen">
          <div class="h-[800px] pt-10">
            <div v-if="global.destinations.length">
              <div class="sm:text-lg text-lg mb-3 pb-30">Search Packages by:</div>

              <ul
                class="pl-3 grid grid-cols-[100px,200px] list-none"
                role="list"
                aria-label="List of regions, countries, provinces, cities and categories"
                @mouseleave="clear"
              >
                <li
                  class="mb-3 hover:text-lime-500 hover:contrast-65 active:contrast-65 contrast-100"
                  @click="thisListOnly('regions')"
                  @mouseover="thisListOnly('regions')"
                  tabindex="0"
                  role="listitem"
                  aria-label="List of regions"
                >
                  Region
                </li>

                <MenuList
                  :list="
                    global.destinations.filter((item) => item.type == 'region')
                  "
                  :state="listState.regions"
                  type="region"
                />

                <li
                  class="mb-3 hover:text-lime-500 hover:contrast-65 active:contrast-65 contrast-100"
                  @click="thisListOnly('countries')"
                  @mouseover="thisListOnly('countries')"
                  tabindex="0"
                  role="listitem"
                  aria-label="List of countries"
                >
                  Country
                </li>
                <MenuList
                  :list="
                    global.destinations.filter((item) => item.type == 'country')
                  "
                  :state="listState.countries"
                  type="country"
                  tabindex="0"
                />

                <li
                  class="mb-3 hover:text-lime-500 hover:contrast-65 active:contrast-65 contrast-100"
                  @mouseover="thisListOnly('provinces')"
                  tabindex="0"
                  role="listitem"
                  aria-label="List of South African provinces"
                >
                  SA Province
                </li>
                <MenuList
                  :list="
                    global.destinations.filter(
                      (item) => item.type == 'province'
                    )
                  "
                  :state="listState.provinces"
                  type="province"
                />

                <li
                  class="mb-3 hover:text-lime-500 hover:contrast-65 active:contrast-65 contrast-100"
                  @mouseover="thisListOnly('cities')"
                  tabindex="0"
                  role="listitem"
                  aria-label="List of cities"
                >
                  City
                </li>
                <MenuList
                  :list="
                    global.destinations.filter((item) => item.type == 'city')
                  "
                  :state="listState.cities"
                  type="city"
                />

                <li
                  class="mb-3 hover:text-lime-500 hover:contrast-65 active:contrast-65 contrast-100"
                  @mouseover="thisListOnly('categories')"
                  tabindex="0"
                  role="listitem"
                  aria-label="List of categories"
                >
                  Category
                </li>

                <MenuList
                  :list="global.categories"
                  :state="listState.categories"
                  type="category"
                />
              </ul>
            </div>
            <ul class="list-none" role="list">
              <li
                v-for="(item, index) of items"
                :key="index"
                class="mb-3 hover:text-lime-500 hover:contrast-65 active:contrast-65 contrast-100"
                role="listitem"
              >
                <NuxtLink
                  @click="global.showMenu = false"
                  class="w-full"
                  :to="item.url"
                  :target="item.targetBlank ? '_blank' : '_self'"
                  tabindex="0"
                  role="navigation"
                  :aria-label="item.name"
                >
                  <div class="w-full">
                    {{ item.name }}
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="absolute inset-0 flex justify-end items-start pt-3 px-5 md:pt-8 md:pr-16 pointer-events-none"
        >
          <div
            @click="global.showMenu = false"
            class="flex justify-center items-center bg-green-avo rounded-full bg-opacity-80 shadow flex w-[45px] h-[45px] md:w-[69px] md:h-[69px] cursor-pointer pointer-events-auto hover:bg-lime-100 transition duration-300 z-50"
            tabindex="0"
          >
            <IconClose class="w-8 text-stone-500" alt="Close" role="button" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let items = [
  {
    name: "Groups and Incentives",
    url: "/groups-and-incentives",
    targetBlank: false,
  },

  {
    name: "Book a Flight",
    url: "/flight-bookings",
    targetBlank: false,
  },
  {
    name: "Flight Specials",
    url: "/flight-specials",
    targetBlank: false,
  },
  {
    name: "Book a Car",
    url: "/car-bookings",
    targetBlank: false,
  },

  {
    name: "Travel Insurance",
    url: "https://www.tic.co.za/systematic/travelinsuranceshop.html?ref=89",
    targetBlank: true,
  },
  {
    name: "Blog",
    url: "/blog-archive",
    targetBlank: false,
  },
  {
    name: "Travel Tips",
    url: "/travel-tips",
    targetBlank: false,
  },
  {
    name: "Frequently Asked Questions (FAQs)",
    url: "/FAQs",
    targetBlank: false,
  },
  {
    name: "COVID-19",
    url: "/covid-19",
    targetBlank: false,
  },

  {
    name: "Contact",
    url: "/contact",
    targetBlank: false,
  },
];

import { useGlobal } from "@/stores/global";
let global = useGlobal();
const listState = reactive({
  regions: false,
  countries: false,
  provinces: false,
  cities: false,
  categories: false,
});
const thisListOnly = (item) => {
  listState.regions = false;
  listState.countries = false;
  listState.provinces = false;
  listState.cities = false;
  listState.categories = false;
  listState[item] = true;
};
const clear = () => {
  listState.regions = false;
  listState.countries = false;
  listState.provinces = false;
  listState.cities = false;
  listState.categories = false;
};
const menu = ref(null);
import useDetectOutsideClick from "@/composables/useDetectOutsideClick";

useDetectOutsideClick(menu, () => {
 global.showMenu = false;
});
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>
