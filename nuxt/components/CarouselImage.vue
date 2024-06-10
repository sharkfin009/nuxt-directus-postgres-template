<template>
  <div 
  class="w-full h-full object-cover rounded-3xl overflow-hidden "
  :class="{ 'opacity-50 animate-gradient-x bg-gradient-to-r  from-gray-100 to-gray-300': !imgLoaded }"
>
    <nuxt-img
        class="w-full h-full "
      :src="src"
      :alt="alt"
      :aria-label="alt"
      provider="directus"
      height="100%"
      format="webp"
      loading="lazy"
      quality ="100"
      preload
      @load="imgLoaded = true"
      />
</div>      
</template>
<script setup>
const props = defineProps({
  src: String,
  alt: String,
});
const imgLoaded = ref(false);
</script> 