<template>
  <div class="md:px-10 md:px-20 bg-slate-50 pb-10 flex flex-col gap-5">
    <SectionHeading
      heading="covid-19"
      subheading="statement and global procedure"
      :inverted="false"
    />

    <div
      class="p-5 bg-green-avo rounded-xl flex flex-col md:flex-row items-cente gap-5"
    >
      <div class="flex items-center">
        <div v-html="data.body" class=""></div>
      </div>
      <!-- pics -->
      <div class="flex flex-col min-w-[300px] justify-evenly h-full">
        <NuxtImg
          class="opacity-0 w-full h-full object-cover transition duration-300 rounded-xl mb-5"
          width="300"
          height="200"
          :src="data.images[0]?.url"
          :alt="data.images[0]?.alt"
          :aria-label="data.images[0]?.alt"
          provider="directus"
          fit="cover"
          loading="lazy"
          :class="{ '!opacity-100': imgLoaded }"
          @load="imgLoaded = true"
        >
        </NuxtImg>
        <NuxtImg
          class="opacity-0 w-full h-full object-cover transition duration-300 rounded-xl"
          width="300"
          height="200"
          :src="data.images[1]?.url"
          :alt="data.images[1]?.alt"
          :aria-label="data.images[1]?.alt"
          provider="directus"
          fit="cover"
          loading="lazy"
          :class="{ '!opacity-100': imgLoaded }"
          @load="imgLoaded = true"
        >
        </NuxtImg>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "COVID-19 statement and global procedure - Computravel",
  meta: [
    { name: "description", content: "COVID-19 statement and global procedure"},
    { name: "og:description", content: "DiscCOVID-19 statement and global procedure" },
    { name: "og:title", content: "COVID-19 statement and global procedure - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "DiscCOVID-19 statement and global procedure" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "COVID-19 statement and global procedure - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});

import helpers from "@/helpers/packages";
const { getItems } = useDirectusItems();
let data = await getItems({
  collection: "covid_19",
  params: {
    fields: helpers.allFieldsPlusImagesArray,
  },
});
const imgLoaded = ref(false);
data.images = helpers.mapImages(data.images);
console.log(data);
</script>
