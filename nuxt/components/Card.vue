<template>
  <NuxtLink :to="`/packages/${props.package.ct_ref}/${props.package.slug}`">
    <!-- <pre>

    {{ props.package }}
    </pre> -->
    <div class="font-open-sans w-[305px] h-[400px] grid grid-rows-2" role="contentinfo" :aria-role="props.package.category?.name">
      <div>
        <div
          class="relative h-full flex items-end   rounded-lala-t overflow-hidden shadow"
          :class="{ 'opacity-50 animate-gradient-x bg-gradient-to-r  from-gray-100 to-gray-300': !imgLoaded }"
        >
          <div
            v-if="props.package.category?.name"
            class="bg-black text-white p-4 leading-4 text-center mb-10 py-3 font-titillium shadow-light-300 shadow-xl rounded-r-xl z-10 text-sm"
            role="heading" aria-label="props.package.category?.name"
          >
            {{ props.package.category?.name }}
          </div>
          <NuxtImg
            v-if="!dataLoadingState"
            class="absolute inset-0 opacity-0 w-full h-full object-cover transition duration-300"
            width="305px"
            height="200px"
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
      <div
        class="px-7 py-3 bg-white flex flex-col justify-evenly rounded-lala-b shadow"
      >
        <div class="w-full font-titillium font-semibold text-xl">
          <div
            class="h-[50px] flex items-center"
          >
            <h3 class="w-full text-center mb-3 leading-[20px]" role="heading" :aria-label="text">
              {{ text }}
            </h3>
          </div>
          <div
            class="flex items-center justify-center mb-3"
          >
            <div v-for="(star, index) in stars" :key="index" class="px-2">
              <IconStar />
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          {{ destination }}
        </div>
        <div
          class="hidden text-sm pb-1"
        >
          loading
        </div>
        <div class="flex justify-between items-center pb-1" role="contentinfo">
          <div
            class="font-titillium text-center text-3xl"
            aria-label="Package price"
          >
            R{{ props.package.price }}
          </div>
          <div class="">
            <div
              class="font-open-sans text-sm flex justify-start"
            >
              <div class="w-[100px] font-regular text-right pr-2 text-sm">
                departs
              </div>
              <div>{{ props.package.from.slice(2) }}</div>
            </div>
            <div
              class="font-open-sans text-sm flex justify-start"
            >
              <div class="w-[100px] text-right pr-2 text-sm">book before</div>
              <div>{{ props.package.valid_to.slice(2) }}</div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="text-md  text-lime-700 decoration-gray-300 hover:text-lime-500 cursor-pointer"
            role="navigation" aria-label="Read more"
          >
            read more
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
const props = defineProps({
  package: {
    type: Object,
  },
});
let loadingStateClass = "!bg-green-100 !border-4 !border-green-600 !opacity-50 !animate-pulse";

import { useStore } from "@/stores/search";

import helpers from "@/helpers/packages";

// console.log(props.package.image)
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const searchStore = useStore();
const route = useRoute();

const cutTitle = (text) => {
  let titleFirstBit = text.split(" - ")[0];

  let cutTextTitle = titleFirstBit.substring(0, 150);
  // cutTextTitle = cutTextTitle.split(" ").pop(-1);

  if (cutTextTitle.charAt(1) == "*") {
    cutTextTitle = cutTextTitle.substring(2);
  }
  cutTextTitle = cutTextTitle.replace(/[()0-9]/g, "");
  if (cutTextTitle.length > 50) {
    cutTextTitle = cutTextTitle.slice(0, 50);
    cutTextTitle = cutTextTitle.split(" ");
    cutTextTitle.splice(-3, 1);
    cutTextTitle = cutTextTitle.join(" ");
  }
  return cutTextTitle;
};
let text = props.package?.title.includes("-")
  ? cutTitle(props.package?.title)
  : props.package?.title ?? "";

let stars = [];
for (let i = 0; i < props.package?.star_rating; i++) {
  stars.push(1);
}
let image = ref(null);
const imgLoaded = ref(false);
const dataLoadingState = ref(true);
const destination = ref('');
 let destinationObj = await helpers.calculateDestination(props.package);
 destination.value = helpers.generateString(destinationObj,props.package);

onMounted(async () => {
  if (
    props.package.images.length &&
    props.package.images[0].directus_files_id
  ) {
    image.value = helpers.mapImage(props.package?.images[0].directus_files_id);
    dataLoadingState.value = false;
  } else {
    console.log("no images found");
    const { getItems } = useDirectusItems();
    const fallbackImageResponse = await getItems({
      collection: destinationObj.type,
      params: {
        filter: {
          name: {
            _eq: destinationObj?.name,
          },
        },
        fields: helpers.allFieldsPlusImagesArray,
      },
    });
    if (fallbackImageResponse[0].images.length) {
      image.value = pickOne(helpers.mapImages(fallbackImageResponse[0].images));
      dataLoadingState.value = false;
    } else {
      console.log("no images");
      image.value = {
        url: "7440982e-8e7d-49b0-b41b-ac022373a35a.png",
        alt: "rio",
      };
      dataLoadingState.value = false;
    }
  }
  function pickOne(array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  }
});
const img = ref(null);
</script>
