<template>
  <div class="text-lg md:lg font-medium tracking-wide">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();

// nuxtApp.hook("page:finish", () => {
//   // window.scrollTo(0, 0);
// });

import { useGlobal } from "@/stores/global";
const global = useGlobal();
const { getItems } = useDirectusItems();
onMounted(() => {
  // gtag script"
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-HVREE4HCJN");
});
let searchOptions = ["region", "country", "province", "city", "category"];
let res = [];
try {
res = await getItems({
  collection: "packages",
  params: {
    fields: `region.name, country.name, province.name, city.name, category.name`,
    limit: 2000,
  },
});
} catch (error) {
  console.log("***",error);
}
let temp = [];
for (let option of searchOptions) {
  let items = [
    ...new Set(res.map((item) => (item[option] ? item[option].name : false))),
  ];
  let array = items
    .filter((item) => item)
    .map((item) => ({
      name: item,
      type: option,
    }));
  temp.push(...array);
}
global.options = temp;

</script>
