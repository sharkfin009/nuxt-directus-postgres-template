<template>
  <button
    @click="$emit('fire')"
    @keyup="keyupMethod"
    class="text-white font-titillium font-semibold
     block rounded-lala cursor-pointer hover:bg-lime-200 
     hover:text-black transform transition duration-500 text-center 
     flex items-center justify-center px-4 md:h-[66px] h-[46px] md:px-8 
     text-base md:text-2xl shadow select-none "
  >
    <slot />
  </button>
</template>
<script setup>
const emit = defineEmits(["fire"]);
const keyupMethod = (e) => {
  if (e.code == "Space" || e.code == "Enter") {
    console.log('fire')
    emit("fire");
  } else {
    return 
  }
};
</script>
