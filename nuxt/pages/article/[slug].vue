<template>
  <div class="flex justify-center leading-6">
    <Script :children="jsonLD" />
    <div
      v-if="true"
      class="lg:grid lg:grid-cols-[auto,320px] gap-20 pt-10 max-w-[1300px]"
    >
      <div class="flex justify-center">
        <div
          v-if="article"
          class="w-[320px] md:w-full bg-green-avo overflow-hidden rounded-lala"
        >
          <Head>
            <Meta name="tags" :content="article.tags" />
            <Title> {{ article.title }}</Title>
          </Head>

          <div class="max-h-[500px] mb-8">
            <NuxtImg
              class="opacity-0 w-full h-full object-cover transition duration-300 max-h-[500px]"
              :src="article.image?.url"
              :alt="article.image?.alt"
              :aria-label="article.image?.alt"
              provider="directus"
              fit="cover"
              loading="lazy"
              :class="{ '!opacity-100': imgLoaded }"
              @load="imgLoaded = true"
              quality="100"
              placeholder
            >
            </NuxtImg>
          </div>
          <div class="px-5 pb-5 md:px-10 md:pb-10">
            <h3
              class="text-2xl font-open-sans md:text-xl font-extralight md:font-light mb-5"
            >
              {{ article.date }}
            </h3>
            <h2
              class="text-3xl md:text-5xl font-titillium font-medium md:font-semibold leading-10 mb-8"
            >
              {{ article.title }}
            </h2>

            <div class="text-[16px] font-semibold" v-html="article.body" />
          </div>
          <!-- images -->
          <div class="grid lg:grid-cols-2 gap-5" v-if="article.images.length">
            <div
              v-for="(image, index) of article.images"
              :key="index"
              class="max-h-[500px] rounded-3xl overflow-hidden"
            >
              <NuxtImg
                class="opacity-0 w-full h-full object-cover transition duration-300 max-h-[500px]"
                width="300"
                :src="image?.url"
                :alt="image?.alt"
                :aria-label="image?.alt"
                provider="directus"
                fit="cover"
                loading="lazy"
                :class="{ '!opacity-100': imgLoaded }"
                @load="imgLoaded = true"
              >
              </NuxtImg>
            </div>
          </div>
        </div>
      </div>
      <div v-if="randomPackagesReady" class="">
        <Heading class="my-10 pl-5">Suggested Packages</Heading>
        <div
          class="flex flex-wrap w-full justify-center items-center gap-10 pb-10"
        >
          <div
            v-for="(item, index) of search.pickedRandomResults[0]"
            :key="index"
          >
            <card :package="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
const imgLoaded = ref(false);
import { useStore } from "@/stores/search";
let search = useStore();
const route = useRoute();
let slug = route.params.slug;
const { getItems } = useDirectusItems();
let articles = await getItems({
  collection: "Blog_Articles",
  params: {
    fields: [
      "title",
      "body",
      "date",
      "featured_image.description",
      "featured_image.filename_download",
      "featured_image.filename_disk",
      "images.directus_files_id",
      "images.directus_files_id.filename_download",
      "images.directus_files_id.filename_disk",
      "images.directus_files_id.description",
      "slug",
      "tags.article_tags_id.name",
    ].join(),
    filter: {
      slug: {
        _eq: slug,
      },
    },
  },
});
let article = articles[0];
import helpers from "@/helpers/packages";
article.image = helpers.mapImage(article.featured_image);
article.tags = article.tags.map((item) => item.article_tags_id.name).join("");
article.date = new Date(article.date).toLocaleDateString("eng-GB", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

useHead({
  title: article.title + " - Computravel",
  meta: [
    { name: "description", content: "" },
    { name: "keywords", content: article.tags },
    { name: "og:description", content: "Travel tips" },
    { name: "og:title", content: article.title + " - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Travel tips" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: article.title + " - Computravel" },
  ],
  htmlAttrs: {
    lang: 'en'
  },
});

let randomPackagesReady = ref(false);
onMounted(async () => {
  search.customReset();
  console.log(window.innerHeight);
  await search.randomQuery((window.innerHeight - 400) / 200, false);
  randomPackagesReady.value = true;
});
</script>
