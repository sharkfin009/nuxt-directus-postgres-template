<template>
  <div class="">
    <div
      class="grid md:grid-cols-[auto,120px] gap-4 bg-green-avo rounded-3xl md:p-5 shadow p-5"
    >
      <div
        class="flex flex-col items-center md:grid md:grid-cols-[2fr,1fr] gap-2"
      >
        <div
          class="col-span-full md:col-span-1 w-full font-titillium font-regular text-2xl md:text-4xl flex items-center justify-center md:justify-start md:p-2"
        >
          <h3 class="md:hidden text-center md:text-start md:text-2xl">
            {{ pckage.title }}
          </h3>
          <h2
            class="hidden md:block text-center md:text-start text-base md:text-2xl"
          >
            {{ pckage.title }}
          </h2>
        </div>
        <div
          class="order-3 md:order-none flex items-baseline justify-end font-titillium font-semibold text-5xl"
        >
          <div
            class="flex md:p-2 items-center justify-end w-full text-lg md:text-3xl"
          >
            R{{ pckage.price }}
            <div
              class=" text-lg md:text-3xl flex items-end ml-2 order-1"
            >
              pps
            </div>
          </div>
        </div>
        <div class="order-2 md:order-none p-0 md:p-2 w-full  text-center sm:text-start">
          {{ destination }} 
          <br>
        </div>
        <div
          class="col-span-full md:col-span-1 flex justify-center md:justify-end md:p-2"
        >
          <div>
            <span class="text-xs">Book before: </span>
            <span class="">
              {{ pckage.valid_to }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="relative h-full hover:text-lime-500 cursor-pointer select-none flex justify-center"
      >
        <NuxtLink :to="`/package-enquiry-form/${pckage.ct_ref}`">
          <button
            class="text-white md:h-[110px] font-titillium font-semibold rounded-3xl cursor-pointer bg-lime-500 hover:bg-lime-200 hover:text-black transform transition duration-500 text-center flex items-center justify-center px-4 text-base md:text-2xl shadow select-none pb-[3px]"
          >
            send booking request
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pckage: Object,
  destination: String,
});
const windowScroll = ref(null);
onMounted(() => {
  addEventListener("scroll", (event) => {
    windowScroll.value = window.scrollY;
  });
});

</script>
