<template>
  <div
    class="
      absolute
      bottom-0
      flex
      items-center
      justify-center
      pointer-events-none
      z-50
    "
  >
    <div
      class="
        translate-y-[120%]
        md:translate-y-[100%]
        bg-white
        p-2
        text-xs text-center
        rounded-xl
        shadow-xl
        text-black
        w-[150px]
      "
    >
      <slot />
      <div
        class="absolute w-full flex items-center justify-center"
        :class="`-top-3`"
      >
        <IconArrowRight class="-rotate-90 w-6 mr-4" />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  arrowY: {
    type: String,
  },
});
</script>