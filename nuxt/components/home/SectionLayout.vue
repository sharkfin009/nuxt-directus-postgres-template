<template>
  <div
    class="
      text-black
      px-8
      pt-20
      pb-10
      md:pt-32 md:pb-20 md:px-14 md:px-14
      w-full
      flex flex-col
      items-center
    "
    :class="bgColor"
  >
    <div class="max-w-[1400px] w-full">
      <slot />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  bgColor: {
    type: String,
  },
});
</script>