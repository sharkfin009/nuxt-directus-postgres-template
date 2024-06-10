<template>
  <div>
    <div class="min-h-[50vh] flex flex-col items-center">
      <div class="flex flex-col">
        <SectionHeading
          heading="computravel blog"
          subheading="feel inspired"
          :inverted="true"
        />
        <div class="grid lg:grid-cols-3">
          <div v-for="(item, index) of data" :key="index">
            <ArticleCard :article="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Blog Archive - Computravel",
  meta: [
    { name: "description", content: "Your portal to the leisure travel experts. Browse our website for an awesome showcase of holidays & car hire to worldwide destinations, and then submit your enquiry to one of our travel experts and they will source the perfect car just for you."},
    { name: "og:description", content: "Your portal to the leisure travel experts. Browse our website for an awesome showcase of holidays & car hire to worldwide destinations, and then submit your enquiry to one of our travel experts and they will source the perfect car just for you." },
    { name: "og:title", content: "Blog Archive - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Your portal to the leisure travel experts. Browse our website for an awesome showcase of holidays & car hire to worldwide destinations, and then submit your enquiry to one of our travel experts and they will source the perfect car just for you." },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Blog Archive - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
import { useStore } from "@/stores/search";
const searchStore = useStore();
import helpers from "@/helpers/packages";
const { getItems } = useDirectusItems();
let data = await getItems({
  collection: "Blog_Articles",
  filters: {
    published: true,
  },
  params: {
    fields: [
      "*",
      "featured_image.description",
      "featured_image.filename_disk",
      "featured_image.filename_download",
    ].join(),
    sort: "-date",
  },
});
</script>
