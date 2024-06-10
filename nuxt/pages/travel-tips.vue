<template>
  <div class="md:px-20 bg-slate-50 pb-20">
    <SectionHeading
      heading="travel tips"
      subheading="current"
      :inverted="true"
    />

    <div class="grid lg:grid-cols-2 gap-5">
      <div class="" v-for="(tip, index) of tips" :key="index">
        <div
          class="bg-white rounded-lala p-10 shadow-lg flex justify-between items-center cursor-pointer text-xl"
          key="index"
          @click="showMap[tip.title] ? hide(tip.title) : show(tip.title)"
        >
          <div>
            {{ tip.title }}
          </div>
          <div class="flex items-center justify-center">
            <IconPlus
              v-if="!showMap[tip.title]"
              class="w-14 text-gray-500 cursor-pointer hover:text-green-brand"
            />
            <IconMinus
              v-if="showMap[tip.title]"
              class="w-14 text-gray-500 w-6 cursor-pointer hover:text-green-brand"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="showMap[tip.title]"
            class="col-span-full bg-white rounded-lala p-10 shadow-lg mt-5"
          >
            <div v-html="tip.body" class="list-circle" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Travel Tips - Computravel",
  meta: [
    { name: "description", content: "Travel tips" },
    { name: "og:description", content: "Travel tips" },
    { name: "og:title", content: "Travel Tips - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Travel tips" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Travel Tips - Computravel" },
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
const showingState = ref(false);
const showMap = ref({});
const show = (title) => {
  showingState.value = true;
  showMap.value[title] = true;
  console.log(showMap.value);
};
const hide = (title) => {
  showingState.value = false;
  showMap.value[title] = false;
};
const { getItems } = useDirectusItems();
let tips = await getItems({
  collection: "travel_tips",
  params: {
    fields: "*",
    sort: "sort",
  },
});
</script>
