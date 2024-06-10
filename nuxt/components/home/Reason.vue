<template>
  <div class="lg:grid lg:grid-cols-2 gap-x-10">
    <div class="flex justify-end items-center">
      <nuxt-img
        class="
          hidden
          lg:block
          rounded-lala
          h-[400px]
          w-[400px]
          overflow-hidden
          bg-blue-100
          object-cover
        "
        :src="reason.imageUrl"
        :alt="reason.altText"
        :aria-label="reason.altText"
        provider="directus"
        width="400px"
        height="400px"
      />
    </div>
    <!-- content pane: -->
    <div class="flex items-center justify-center h-full">
      <div class="max-w-[500px]">
        <div class="pt-4 md:pt-4">
          <div class="text-2xl md:text-4xl font-titillium font-semibold mb-10" role="heading" :aria-label="reason.subtitle">
            {{ reason.subtitle }}
          </div>

          <div class="" role="separator" />
          <div class="text-base md:text-xl pr-10" role="contentinfo" :aria-label="'Information about ' + reason.subtitle">
            {{ reason.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reason: Object,
});
</script>