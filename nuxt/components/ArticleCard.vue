<template>
  <NuxtLink :to="`/article/${article.slug}`">
    <div
      class="w-[320px] h-[400px] grid grid-rows-2 overflow-hidden shadow hover:shadow-none rounded-lala bg-white md:mr-10 mb-10"
    >
      <NuxtImg
        class="opacity-0 w-full h-full object-cover transition duration-300 w-[300px] max-h-[400px]"
        width="300"
        :src="image?.url"
        :alt="image?.alt"
        :aria-label="image?.alt"
        provider="directus"
        fit="cover"
        loading="lazy"
        :class="{ '!opacity-100': imgLoaded }"
        @load="imgLoaded = true"
        quality="100"
      >
      </NuxtImg>

      <div class="grid grid-rows-[40px,80px,80px] px-5" role="article" :aria-label="article.title">
        <div class="flex items-end">
          <div class="w-full text-center text-base text-gray-800">
            {{
              new Date(article.date).toLocaleDateString(
                "eng-GB",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )
            }}
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <h3
            class="w-full font-titillium font-semibold text-xl text-center leading-6"
            role="heading"
          >
            {{ article.title }}
          </h3>
        </div>
        <div class="flex flex-col justify-evenly">
          <div class="w-full text-sm">
            <div class="text-center px-3" v-html="bodyEllipsis" role="article" aria-role="Article content"></div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
  },

  moreLikeThis: {
    type: Boolean,
  },
});
import helpers from "@/helpers/packages";
let image = helpers.mapImage(props.article.featured_image);
import text from "@/helpers/text";

const bodyEllipsis = computed(() => {
  return text.ellipsis(props.article.body, 120);
});
const imgLoaded = ref(false);
</script>
