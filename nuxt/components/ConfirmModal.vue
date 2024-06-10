<template>
  <div
    class="fixed inset-0 h-screen w-screen flex justify-center items-center bg-black z-50 pointer-events-auto"
  >
    <div
      class="p-5 bg-lime-100 max-w-[80vw] h-[70vh] md:max-h-[80vh] flex flex-col items-center justify-evenly rounded-lala text-center font-medium shadow-3xl relative"
    >
      <div
        class="flex flex-col items-center justify-evenly sm:justify-evenly h-full sm:grid sm:grid-cols-[4fr,5fr] font-titillium text-3xl"
      >
        <!-- left pane -->
        <div
          class="flex flex-col justify-between md:justify-around h-[60%] md:h-[60%] px-5 gap-5 md:gap-10"
        >
          <h3 class="pt-20 md:pt-0 text-4xl lg:text-5xl font-bold">
            {{ global.modalState.headerText }}
          </h3>
          <p class="text-2xl">
            {{ global.modalState.bodyText }}
          </p>
          <div class="flex flex-col items-between gap-2">
            <div class="text-base mb-3" v-if="global.modalState.showRef">
              Your enquiry reference is
              <span class="text-lime-500"> {{ global.enquiryRef }} </span>
            </div>
            <NuxtLink @click="hide" to="/search"
              class="mb-2 text-lime-700 text-xl md:text-base underline flex
              items-end justify-center cursor-pointer" > continue browsing our
              packages
            </NuxtLink>
            <!--  logo -->
            <NuxtLink @click="hide" to="/"
              class="text-primary cursor-pointer pb-1 md:pb-2 justify-center
              flex items-center" >
              <IconComputravelLogo class="h-[30px] lg:h-[50px]" alt="Computravel logo" aria-label="Computravel logo" />
            </NuxtLink>
          </div>
        </div>
        <div class="md:pr-10">
          <NuxtImg
            v-if="imageUrlAvailable"
            class="opacity-0 transition duration-300 rounded-lala"
            sizes="md:50vw"
            :src="image.url"
            :alt="image?.alt"
            :aria-label="image?.alt"
            provider="directus"
            :class="{ '!opacity-100': imgLoaded }"
            @load="imgLoaded = true"
          >
          </NuxtImg>
        </div>
      </div>
    </div>
    <NuxtLink @click="hide" to="/">
      <CloseModal />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  showRef: {
    type: Boolean,
  },
  type: {
    type: String,
  },
});
import { useGlobal } from "@/stores/global.js";
const global = useGlobal();

const hide = async (path) => {
  global.modalState.showConfirmation = false;
};
const imageUrlAvailable = ref(false);
const imgLoaded = ref(false);

const { getItems } = useDirectusItems();
let images = await getItems({
  collection: "images",
});
let image = {};
if (images.length) {
  let confImage = images.find(
    (item) => item.name === global.modalState.imageName + "_confirmation"
  );
  image = {
    url: confImage
      ? confImage.image
      : "714360d8-019b-4dcc-a12b-a6edb8002113.jpg",
    ref: "computravel marketing image",
  };
  imageUrlAvailable.value = true;
}
</script>
