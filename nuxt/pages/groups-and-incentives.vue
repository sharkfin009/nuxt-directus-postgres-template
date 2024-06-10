<template>
  <div v-if="data" class="bg-slate-50 pb-20">
    <SectionHeading
      :heading="data.title"
      :subheading="data.subtitle"
      :inverted="false"
    />
    <!-- {{ data }} -->

    <div class=" md:pb-20 md:px-20 bg-green-avo rounded-xl flex flex-col items-center ">
      <div class="grid xl:grid-cols-2 gap-5 xl:gap-40 xl:px-40 py-5 md:py-10">
        <nuxt-img
          :src="images[0].url"
          :alt="images[0].alt"
          class="object-cover rounded-xl"
          sizes="sm:50vw md:50vw
              lg:50vw"
          width="500"
          provider="directus"
          fit="cover"
        />

        <nuxt-img
          :src="images[1].url"
          :alt="images[1].alt"
          class="object-cover rounded-xl"
          sizes="sm:50vw md:50vw
              lg:50vw"
          width="500"
          provider="directus"
          fit="cover"
        />
      </div>
      <div class="groups px-3 list-disc" v-html="data.body"></div>
    </div>

    <div class="w-full flex justify-center">
      <div class="w-full md:max-w-[800px]">
        <SectionHeading
          class="!py-16"
          heading="Send us your group enquiry"
          :inverted="false"
        />

        <GroupsForm />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
definePageMeta({
  layout: "general",
});
const config = useRuntimeConfig();
import helpers from "@/helpers/packages";
const { getItems } = useDirectusItems();
const data = await getItems({
  collection: "groups_and_incentives",
  params: {
    fields: helpers.allFieldsPlusImagesArray,
  },
});
useHead({
  title: "Groups and Incentives - Computravel",
  meta: [
    { name: "description", content: "Groups and Incentives"},
    { name: "og:description", content: "Groups and Incentives" },
    { name: "og:title", content: "Groups and Incentives - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Groups and Incentives" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Groups and Incentives - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
// console.log("->",data)
let images = helpers.mapImages(data.images);
</script>
<style scoped>
li {
  padding-left: 10px !important;
}
</style>
