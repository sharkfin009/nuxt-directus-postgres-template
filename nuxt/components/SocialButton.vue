<template>
  <div
    class="
      px-1
      py-2
      my-2
      md:px-2 md:py-3
      rounded-l-xl
      hover:-translate-x-[0%]
      translate-x-[66%]
      md:translate-x-[58%]
      transition
      flex
      items-center
      cursor-pointer
    "
  >
    <slot />
    <div class="ml-1 md:ml-5 text-xs md-text-lg">share</div>
  </div>
</template>