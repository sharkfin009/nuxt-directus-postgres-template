<template>
  <div
    class="text-black flex flex-col justify-around text-black px-8 pt-5 md:pb-0 md:px-14 md:px-14 w-full"
  >
    <div>
      <SectionHeading
        heading="latest flight specials"
        subheading="fly somewhere new"
        :inverted="true"
      />
      <div class="w-full flex justify-center pt-5">
        <div
          class="lg:min-w-[800px] overflow-auto text-sm lg:text-base shadow-xl rounded-3xl overflow-hidden"
        >
          <FlightsTable />
        </div>
      </div>
    </div>
  </div>
  <NuxtLink to="/flight-bookings">
    <div class="flex justify-center  my-20">
      <CompuButton class="bg-black"> view all flights </CompuButton>
    </div>
  </NuxtLink>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Flight Specials - Computravel",
  meta: [
    { name: "description", content: "Latest flight specials from Computravel" },
    { name: "og:description", content: "Latest flight specials from Computravel" },
    { name: "og:title", content: "Latest flight specials from Computravel - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Latest flight specials from Computravel" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Latest flight specials from Computravel - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
</script>
