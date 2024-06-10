<template>
  <div>
    <PolicyView
      title="Fraud Prevention Policy"
      docName="fraud_prevention_policy"
    />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Fraud Prevention Policy - Computravel",
  meta: [
    { name: "description", content: "Fraud Prevention Policy"},
    { name: "og:description", content: "Fraud Prevention Policy" },
    { name: "og:title", content: "Fraud Prevention Policy - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Fraud Prevention Policy" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Fraud Prevention Policy - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
</script>

<style scoped></style>
