<template>
  <HomeSectionLayout bgColor="bg-stone-50 ">
    <div class="grid grid-rows-[min-content,auto,min-content] bg-stone-50">
      <!-- header section -->
      <SectionHeading heading="every holiday has a highlight" subheading="what our travellers say" :inverted="false" />
      <!-- body section -->
      <div class="
          relative
          flex
          justify-center
          items-center
          h-[200px]
          sm:h-[400px]
          md:h-[500px]
          lg:h-none
        " >
        <div class="absolute inset-0 flex justify-center items-center lg:px-20">
          <div class="
              w-[180px]
              h-[180px]
              sm:w-[310px] sm:h-[310px]
              bg-lime-300
              opacity-50
              rounded-lala
              pointer-events-none
            "></div>
        </div>
        <div class="
            w-full
            grid grid-cols-[20px,auto,20px]
            md:grid-cols-[50px,auto,50px]
            lg:grid-cols-[300px,auto,300px]
            h-full
          ">
          <div class="
              flex
              items-center
              justify-center
              cursor-pointer
              hover:scale-110
              pointer-events-auto
              z-50
            ">
            <IconChevronLeft class="w-10 z-10" @click="scrollLeft" />
          </div>
          <div class="
              relative
              text-xl
              sm:text-3xl
              italic
              leading-6
              font-light
              text-center
              px-10
            ">
            <div v-for="(item, index) in testimonials" :key="index" class="
                absolute
                inset-0
                opacity-0
                transition
                duration-700
                flex
                items-center
                px-3
              " :class="{ '!opacity-100': index == pointer }">
              <div v-html="item.copy" />
            </div>
          </div>
          <div class="
              flex
              items-center
              justify-center
              cursor-pointer
              hover:scale-110
              pointer-events-auto
              z-50
            ">
            <IconChevronRight class="w-10 z-10" @click="scrollRight" />
          </div>
        </div>
      </div>
      <!-- footer section -->
      <div class="">
        <div class="
            text-xl
            md:text-4xl
            font-titillium font-semibold
            text-center
            my-10
            md:mb-5
          ">
          Join us on social media
        </div>
        <div class="flex justify-center mb-10">
          <div class="flex">
            <a href="https://www.facebook.com/Computravel/" target="blank" class="cursor-pointer mr-10">
              <IconFacebook class="cursor-pointer w-14" alt="Facebook" />
            </a>
            <a href="https://twitter.com/computravel" target="blank" class="cursor-pointer mr-10">
              <IconTwitterBlack class="text-black w-16" alt="Twitter" />
            </a>
            <a href="https://www.instagram.com/computravel/?hl=en" target="blank" class="cursor-pointer">
              <IconInstagram class="cursor-pointer" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </HomeSectionLayout>
</template>
<script setup>

let testimonials = ref([])
onMounted(async () => {
  const { getItems } = useDirectusItems();
  testimonials.value = await getItems({
    collection: "testimonials"
  })
})



let pointer = ref(0);

const scrollLeft = () => {
  if (pointer.value > 0) {
    pointer.value--;
  } else {
    pointer.value = testimonials.value.length - 1;
    
  }
};
const scrollRight = () => {
  if (pointer.value < testimonials.value.length - 1) {
    pointer.value++;
  } else {
    pointer.value = 0;
  }
};
import { useSocialSharing } from "@/composables/socialSharing";

const { share } = useSocialSharing();
// update global when mounted:

import { useGlobal } from "@/stores/global";
const global = useGlobal();
onMounted(() => {
});
</script>
