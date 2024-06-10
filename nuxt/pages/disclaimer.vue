<template>
  <div>
    <PolicyView title="Computravel Website Disclaimer" docName="disclaimer" />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Disclaimer - Computravel",
  meta: [
    { name: "description", content: "Disclaimer"},
    { name: "og:description", content: "Disclaimer" },
    { name: "og:title", content: "Disclaimer - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Disclaimer" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Disclaimer - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
</script>

<style scoped></style>
