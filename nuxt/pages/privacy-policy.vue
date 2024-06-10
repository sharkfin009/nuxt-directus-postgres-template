<template>
  <div>
    <PolicyView title="Privacy Policy" docName="privacy_policy" />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Privacy Policy - Computravel",
  meta: [
    { name: "description", content: "Privacy Policy"},
    { name: "og:description", content: "Privacy Policy" },
    { name: "og:title", content: "Privacy Policy - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Privacy Policy" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Privacy Policy - Computravel" },
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
</script>

<style scoped></style>
