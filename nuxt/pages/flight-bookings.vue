<template>
  <div class="flex justify-center pt-10 h-[90vh]">
    <div class="absolute inset-0 h-[600px] flex justify-center items-center">
      <IconTick class="animate-ping" style="color: #8fc15a" />
    </div>
    <div class="md:w-[50%] z-10">
      <iframe
        id="travelstartIframe-39daee2d-b6c4-4404-bbbc-efabeb5045db"
        frameborder="0"
        scroll="off"
        style="margin: 0px; padding: 0px; border: 0px; height: 100%!important; overflow:hidden !important background-color: rgb(250, 250, 250); width: 100%;"
        src="https://www.travelstart.co.za//?search=false&amp;show_banners=false&amp;log=false&amp;affId=1217489&amp;language=&amp;affCampaign=&amp;utm_source=affiliate&amp;utm_medium=1217489&amp;isiframe=true&amp;landing_page=false&amp;iframeVersion=11&amp;host=https://computravel.co.za/find-a-flight"
        loading="lazy"
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
  title: "Flight Bookings - Computravel",
  meta: [
    { name: "description", content: "Flight Bookings"},
    { name: "og:description", content: "Flight Bookings from Computravel" },
    { name: "og:title", content: "Flight Bookings - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Flight Bookings from Computravel" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Flight Bookings - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
</script>

<style scoped>
/* @keyframes spinner {
        0% {
            transform: translate3d(-50%, -50%, 0) rotate(0deg);
        }

        100% {
            transform: translate3d(-50%, -50%, 0) rotate(360deg);
        }
    } */

.spin::before {
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px #cfd0d1;
  border-bottom-color: #1c87c9;
  border-radius: 50%;
  content: "";
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* transform: translate3d(-50%, -50%, 0); */
  will-change: transform;
}

iframe {
  height: 60vh !important;
  width: 100%;
}
</style>
