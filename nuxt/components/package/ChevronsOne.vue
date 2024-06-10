<template>
  <div
    class="absolute inset-0 h-full w-full grid grid-cols-2 pb-5 px-6 pointer-events-none rounded-3xl z-10"
  >
  <div class="flex justify-start items-end">
    <div
      class="bg-green-avo rounded-full duration-500 opacity-60 transition-all"
      v-show="mobilePicPointer > 0 && pckage.images.length >= 2"
    >
      <IconChevronLeft
        class="text-lime-600 transform scale-50 cursor-pointer pointer-events-auto w-10"
        @click="mobileBrowseLeft"
      />
    </div>
  </div>
  <div class="flex justify-end items-end">
    <div
      class="bg-green-avo rounded-full duration-500 opacity-60 transition-all"
      v-show="mobilePicPointer < pckage.images.length - 1"
    >
      <IconChevronRight
        class="text-lime-600 transform scale-50 cursor-pointer pointer-events-auto w-10"
        @click="mobileBrowseRight"
      />
    </div>
  </div>
  </div>  
</template>

<script setup>
const props = defineProps({
  pckage: Object,
  mobilePicPointer: Number,
  mobileBrowseLeft: Function,
  mobileBrowseRight: Function,
});
</script>
