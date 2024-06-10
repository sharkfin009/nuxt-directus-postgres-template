<template>
  <div
    class="font-open-sans relative overflow-none  w-full bg-slate-600 select-none"
  >
    <Overlay />
    <Header
      @scrollButton="scrollTo"
      class="fixed inset-0 pointer-events-none h-[100px] opacity-0 transition-opacity duration-300 "
      :class="{ 'opacity-100':global.welcomeCarouselLoaded}"
    >
      <div class="hidden lg:flex" v-if="route.path == '/'">
        <CompuButton
          class="!text-center inset-0 bg-green-avo !h-full !text-gray-600 mr-5"
          @fire="scrollTo('faves')"
          >packages</CompuButton
        >
        <CompuButton
          class="!text-center inset-0 bg-green-avo !h-full !text-gray-600 mr-5"
          @fire="showDropdown = true"
          >flights
          <div
            v-if="showDropdown"
            class="absolute top-[110%] left-0 bg-green-avo py-4 w-full rounded-xl text-base"
            @mouseleave="showDropdown = false"
          >
            <NuxtLink class="hover:text-lime-500 text-lg" to="/flight-bookings"
              >book a flight</NuxtLink
            >
            <div class="border border-bottom border-white my-3 mx-3"></div>
            <NuxtLink class="hover:text-lime-500 text-lg" to="/flight-specials"
              >flight specials</NuxtLink
            >
          </div>
        </CompuButton>
        <CompuButton
          class="!text-center inset-0 bg-green-avo !h-full !text-gray-600 mr-5"
          @fire="scrollTo('dests')"
          >destinations</CompuButton
        >
      </div>
    </Header>

    <div class="relative w-full h-[98vh] flex flex-col items-center justify-center overflow-none ">
      <HomeWelcome class="absolute h-full w-full" id="top" />

      <div class="absolute inset-0 w-full h-full flex flex-col items-center justify-center ">
        
        <SearchBar class="absolute top-[55vh] sm:w-[400px] " />
        <div class="absolute top-[65vh] w-[80vw]   z-15 ">
        <SearchAutoSuggestOverlay class="absolute h-full w-full" parent="welcome" />
        </div>
      </div>
    </div>
    <div>
      <div>
        <div ref="faves">
          <LazyHomeOurFavourites />
        </div>
        <div ref="dests">
          <LazyHomeDestinations />
        </div>
        <LazyHomeFlSpecials />
        <LazyHomeTestimonials />
        <LazyHomeFiveReasons />
        <LazyHomeSubscription />
      </div>
      <Footer />
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
import { useGlobal } from "@/stores/global";
const global = useGlobal();
onMounted(() => {
  // window.scrollTo(0, 0);
});

const showDropdown = ref(false);

const faves = ref();
const dests = ref();

const scrollTo = (target) => {
  let obj = {
    faves: faves.value,
    dests: dests.value,
  };
  let el = obj[target];
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
};

const config = useRuntimeConfig();
useJsonld({
  "@context": "https://schema.org",
  "@type": "Organization",
  url: config.siteUrl,
  logo: "https://res.cloudinary.com/sharkfin/image/upload/v1669024295/computravel/computravel-main-logo_b3kl0j.png",
});
useHead({
  title: "Welcome to Computravel, the travel experts who care. - Computravel",
  meta: [
    {
      name: "description",
      content:
        "Your portal to the travel experts. Let us help you book your perfect holiday!",
    },
    {
      name: "og:description",
      content:
        "Your portal to the travel experts. Let us help you book your perfect holiday!",
    },
    {
      name: "og:title",
      content:
        "Welcome to Computravel, the travel experts who care. - Computravel",
    },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:description",
      content:
        "our portal to the travel experts. Let us help you book your perfect holiday!",
    },
    { name: "twitter:site", content: "https://computravel.co.za" },
    {
      name: "twitter:title",
      content:
        "Welcome to Computravel, the travel experts who care. - Computravel",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
import { useAutoSuggestStore } from "@/stores/autoSuggest";
const suggestStore = useAutoSuggestStore();
import useDetectOutsideClick from "@/composables/useDetectOutsideClick";


</script>
