<template>
  <div>
    <PolicyView title="Terms and Conditions" docName="terms_and_conditions" />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Terms and Conditions - Computravel",
  meta: [
    { name: "description", content: "Terms and Conditions"},
    { name: "og:description", content: "Terms and Conditions" },
    { name: "og:title", content: "Terms and Conditions - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Terms and Conditions" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Terms and Conditions - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
</script>

<style scoped></style>
