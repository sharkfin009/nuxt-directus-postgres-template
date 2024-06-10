<template>
  <section class="relative">
    <!-- slider -->
    <div class="relative w-full h-full pt-20 px-20 flex flex-col justify-end">
      <div>
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full h-full absolute inset-0 opacity-0 transition duration-300"
          :class="{ 'opacity-100': imgLoaded, }"
        >
          <!-- desktop -->
          <transition name="x-fade">
            <nuxt-img
              class="absolute inset-0 w-full h-full object-cover border "
              sizes="sm:100vw md:100vw lg:90vw"
              width="1920"
              :src="image.url"
              v-show="index == activePic"
              :alt="image.altText"
              provider="directus"
              fit= "cover"
              quality="80"
              loading="lazy"
              @load="imgLoaded = true, global.welcomeCarouselLoaded = true"
            >
            </nuxt-img>
          </transition>
        </div>
      </div>
      <div
        class="w-full h-full absolute inset-0 grid grid-rows-[1fr,1fr] p-10 md:pt-[85px] md:px-20 "
      >
        <div class="flex flex-col justify-end xl:pl-20">
          <div
            id="welcome"
            class="text-white font-semibold font-titillium md:text-4xl text-3xl md:w-[40vw] leading-none mb-5"
          >
            Welcome to Computravel, the travel experts who care.
          </div>
          <h3
            id="subtext"
            class="text-white font-open-sans font-medium text-2xl md:text-3xl"
          >
            Let us help you book <br />your perfect holiday!
          </h3>
        </div>
        <div
          class="left-0 bottom-[40%] w-full pt-20 flex flex-col justify-start items-center"
        >
      
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const { getItems } = useDirectusItems();
const router = useRouter();
const imgLoaded = ref(false);
import { useGlobal } from "@/stores/global";
const global = useGlobal();

let images = await getItems({
  collection: "carousel_images",
  params: {
    fields: "image.id,image.description",
  },
});

images = images.map((item) => ({
  url: item.image.id,
  altText: item.image.description,
}));

let activePic = ref(0);
setInterval(() => {
  if (activePic.value === images.length - 1) {
    activePic.value = 0;
  }
  activePic.value++;
}, 6000);

</script>

<style scoped>
.text-shadow {
  text-shadow: black 1px 0 10px;
}

.fadeIn {
  animation-duration: 2s;
  animation-name: slideout;
  animation-timing-function: ease-in;
}

@keyframes slideout {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}

.duration {
  transition-duration: 2000ms;
}

@media only screen and (max-width: 600px) {
  #welcome {
    text-shadow: 1px 1px 1px rgb(0, 0, 0)
  }

  #subtext {
    text-shadow: 2px 2px 2px rgb(0, 0, 0);
  }
}

@media only screen and (min-width: 600px) {
  #welcome {
    text-shadow: 2px 2px 2px rgb(0, 0, 0);
  }

  #subtext {
    text-shadow: 2px 2px 2px rgb(0, 0, 0);
  }
}
</style>
