<template>
  <HomeSectionLayout bgColor="bg-stone-50 ">
    <div class="">
      <SectionHeading
        heading="explore these destinations"
        subheading="looking for inspiration"
        :inverted="true"
      />
      <!-- XL header: -->
      <div class="xl:block">
        <div />
        <div />
        <!-- mobile -->
        <TabMenu
          class="flex md:hidden"
          @selectTab="setActiveTab"
          :titles="mobileRegionTitles"
        >
        </TabMenu>
        <!-- md -->
        <TabMenu
          class="hidden md:flex"
          @selectTab="setActiveTab"
          :titles="desktopRegionTitles"
        ></TabMenu>
      </div>

      <div class="relative h-[470px] w-full">
        <div v-for="(region, index) in regionObjects" :key="index">
          <!-- {{ region }} -->
          <HomeDestination
            :regionObject="region"
            class="absolute inset-0 w-full flex flex-col transition duration-1000"
            :class="{ '!opacity-0 !pointer-events-none': index !== activeTab }"
          >
          </HomeDestination>
        </div>
      </div>
    </div>
  </HomeSectionLayout>
</template>

<style>
.line-top {
  border-top: solid black 2px;
}
</style>

<script setup>
const activeTab = ref(0);
const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
import { useGlobal } from "@/stores/global";
const global = useGlobal();
import helpers from "@/helpers/packages.js";

let regionObjects = await getItems({
  collection: "regions",
  params: {
    fields: helpers.allFieldsPlusImagesArray,
    filter: {
      featured: {
        _eq: true,
      },
    },
  },
});

const addPackages = async (data, fields) => {
  for (let region of data) {
    region.threePackages = await getThree(region.name, fields);
    region.image = region.images.length
      ? helpers.mapImage(region.images[0].directus_files_id)
      : null;
    // console.log("region",region)
  }
  return data;
};

const getThree = async (region) => {
  const res = await getItems({
    collection: "packages",
    params: {
      limit: 3,
      filter: {
        region: {
          name: {
            _eq: region,
          },
        },
        status: {
          _eq: "published",
        },
      },
      fields: helpers.packageFields,
      // sort: "-date_created"
    },
  }).catch((e) => {
    console.log(e);
  });

  return res;
};

regionObjects = await addPackages(regionObjects);

// PACKAGES:

let mobileRegionTitles = computed(() =>
  regionObjects
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.name)
    .slice(0, 3)
);
let desktopRegionTitles = computed(() =>
  regionObjects.sort((a, b) => a.sort - b.sort).map((item) => item.name)
);

const setActiveTab = (index) => {
  activeTab.value = index;
};
onMounted(() => {});
</script>
