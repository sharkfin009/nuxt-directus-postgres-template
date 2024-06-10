<template>
  <div>
    <PolicyView title="Cookie Policy" docName="cookie_policy" />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Cookie Policy - Computravel",
  meta: [
    { name: "description", content: "Cookie Policy"},
    { name: "og:description", content: "Cookie Policy" },
    { name: "og:title", content: "Cookie Policy - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Cookie Policy" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Cookie Policy - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
</script>

<style scoped></style>
