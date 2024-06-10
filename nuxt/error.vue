<template>
  <div class="fixed inset-0 h-screen w-screen bg-black">
    <!-- bg -->
    <!-- <nuxt-img
      v-if="errorImage"
      class="absolute inset-0 text-center h-full w-full object-cover -z-10"
      :alt="errorImage?.alt"
      :aria-label="errorImage?.alt"
      :src="errorImage?.url"
      fit="cover"
      width="1920"
      provider="directus"
    >
    </nuxt-img> -->

    <div
      v-if="error"
      class="absolute inset-0 grid grid-rows-[min-content,auto]"
    >
      <!-- desktop logo -->
      <div class="flex items-center p-3 md:p-10">
        <NuxtLink class="text-primary pointer-events-auto" to="/">
          <div
            class="bg-opacity-90 bg-green-avo rounded-full shadow w-[150px] md:w-[220px] justify-center flex items-center p-5"
          >
            <IconComputravelLogo class="h-[30px] md:h-[50px] !md:w-[200px]" />
          </div>
        </NuxtLink>
      </div>
      <!-- content -->
      <div
        class="flex flex-col gap-5 justify-center md:justify-end items-center md:pb-[20vh] pt-20"
      >
        <h2 class="text-6xl text-white">{{ error.statusCode }}</h2>
        <h5 class="text-xl text-center text-white">
          {{ error.message }}
        </h5>
        <h5 class="text-xl text-center text-white">
          {{ error.stack }}
        </h5>

        <CompuButton @fire="$router.go(-1)" class="!bg-green-avo !text-black"
          >take me back</CompuButton
        >
        <a class="text-lime-500 underline" href="/">or return to homepage</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});
console.log("ERROR:", props.error);

// const { image: errorImage, error: SpaceImageError } = useGetImage(
//   "404",
//   "test"
// );
</script>
