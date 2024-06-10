<template>
  <div class="flex justify-center w-full">
    <div
      class="absolute top-0 h-[700px] flex justify-center items-center"
      v-if="!loaded"
    >
      <IconTick class="animate-ping" style="color: #8fc15a" />
    </div>
    <div class="w-[90%] h-[600px] z-10">
      <iframe
        class="w-full"
        scrolling="no"
        style="border: 0px; overflow: hidden; height: 600px !important"
        src="https://booking.autoeurope.com/?pucode=za&pucity=johannesburg&outform=y&action=2&aff=lindsayquail"
        loading="lazy"
        @load="hideTick"
      >
      </iframe>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Car Bookings - Computravel",
  meta: [
    { name: "description", content: "Your portal to the leisure travel experts. Browse our website for an awesome showcase of holidays & car hire to worldwide destinations, and then submit your enquiry to one of our travel experts and they will source the perfect car just for you."},
    { name: "og:description", content: "Your portal to the leisure travel experts. Browse our website for an awesome showcase of holidays & car hire to worldwide destinations, and then submit your enquiry to one of our travel experts and they will source the perfect car just for you." },
    { name: "og:title", content: "Car Bookings - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Your portal to the leisure travel experts. Browse our website for an awesome showcase of holidays & car hire to worldwide destinations, and then submit your enquiry to one of our travel experts and they will source the perfect car just for you." },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Car Bookings - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
const loaded = ref(false);
const hideTick = () => {
  loaded.value = true;
};
</script>
