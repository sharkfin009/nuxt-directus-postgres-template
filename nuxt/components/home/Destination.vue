<template>
  <div
    class="w-full lg:grid lg:grid-rows-none lg:grid-cols-[auto,320px] pt-5 gap-10"
  >
    <div class="hidden lg:block relative object-cover">
      <div
        class="absolute inset-0 bg-blue-100 overflow-hidden rounded-3xl "
      >
        <nuxt-img
          class="absolute inset-0 w-full h-full object-cover shadow max-w-[1400px]"
          sizes="md:80vw"
          width="1400"
          :src="regionObject.image.url"
          :alt="regionObject.image.alt"
          :aria-label="regionObject.image.alt"
          provider="directus"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex justify-center">
        <div class="relative mb-7 w-[320px] h-[400px]">
          <card
            v-for="(pack, index) in regionObject.threePackages"
            :key="pack"
            :package="pack"
            class="absolute inset-0 transition-opacity duration-1000 opacity-0"
            :class="{
              '!opacity-100': index == selectedCard,
              '!pointer-events-none': index !== selectedCard,
            }"
          >
          </card>
        </div>
      </div>
      <div class="flex justify-center gap-5 w-full z-10">
        <div v-for="(dot, index) in dots" class="cursor-pointer" :key="dot">
          <IconActiveDot
            @click="manageClick(index)"
            v-show="index === selectedCard"
          />
          <IconDotInactive
            @click="manageClick(index)"
            v-show="index !== selectedCard"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script setup>
const props = defineProps({
  regionObject: Object,
});
// console.log(props.regionObject.threePackages[0].images);
const dots = [1, 2, 3];
const selectedCard = ref(0);

const manageClick = (index) => {
  selectedCard.value = index;
};
setInterval(() => {
  if (selectedCard.value < 2) {
    selectedCard.value++;
  } else {
    selectedCard.value = 0;
  }
}, 5000);
</script>
