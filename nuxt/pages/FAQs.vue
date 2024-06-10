<template>
  <div class="px-5 md:px-20 bg-slate-50 pb-20">
    <SectionHeading heading="frequently asked questions" :inverted="true" />

    <div class="grid lg:grid-cols-2 gap-5">
      <div class="" v-for="(faq, index) of faqs" :key="index">
        <div
          class="bg-white rounded-lala p-10 shadow-lg grid grid-cols-[auto,50px] cursor-pointer text-xl"
          key="index"
          @click="showMap[faq.title] ? hide(faq.title) : show(faq.title)"
        >
          <div>
            {{ faq.title }}
          </div>
          <div class="flex items-center justify-center">
            <IconPlus
              v-if="!showMap[faq.title]"
              class="w-14 text-gray-500 cursor-pointer hover:text-green-brand"
            />
            <IconMinus
              v-if="showMap[faq.title]"
              class="w-14 text-gray-500 w-6 cursor-pointer hover:text-green-brand"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="showMap[faq.title]"
            class="col-span-full bg-white rounded-lala p-10 shadow-lg mt-5"
          >
            <div v-html="faq.body" class="list-circle text-base" />
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
  title: "Frequently Asked Questions (FAQs) - Computravel",
  meta: [
    { name: "description", content: "Frequently Asked Questions (FAQs)"},
    { name: "og:description", content: "Frequently Asked Questions (FAQs) from Computravel" },
    { name: "og:title", content: "Frequently Asked Questions (FAQs) - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Frequently Asked Questions (FAQs) from Computravel" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Frequently Asked Questions (FAQs) - Computravel" }
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
};
const hide = (title) => {
  showingState.value = false;
  showMap.value[title] = false;
};
const { getItems } = useDirectusItems();
let faqs = await getItems({
  collection: "faqs",
  params: {
    fields: "*",
    sort: "sort",
  },
});
</script>
