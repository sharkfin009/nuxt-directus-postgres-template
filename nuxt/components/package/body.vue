<template>
  <div class="relative">
    <div class="fixed top-[0px] left-0 z-20 bg-stone-50 h-[160px] w-full" />
    <div class="sticky top-[160px] md:top-[125px] mb-5 z-20">
      <div class="absolute inset-0 -z-10 bg-slate-50 w-full h-[50px]" />
      <PackageHeader class="" :pckage="pckage" :destination="destination" />
    </div>

    <div class="relative my-5 h-[35vh] md:h-[65vh] xl:h-[60vh]">
      <!-- pics layout -->
      <div class="h-full w-full pointer-events-none">
      

        <!-- ordinary carousel -->
        <div
          v-if="
            (!dataLoadingState && !checkXl()) ||
            (!dataLoadingState && pckage.images.length < 3 && checkXl())
          "
          class="relative w-full h-full inset-0 rounded-3xl overflow-hidden"
        >
          <div
            v-for="(image, index) in pckage.images"
            :key="index"
            class="absolute inset-0 flex justify-center duration-300"
          >
            <div
              v-show="pckage.video_url && mobilePicPointer == 0"
              class="overflow-hidden rounded-3xl flex flex-col h-full z-50 pointer-events-auto cursor-pointer"
            >
              <iframe
                class="grow"
                :src="pckage.video_url"
                title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
                role="document"
              ></iframe>
            </div>

            <div
              v-show="index == mobilePicPointer"
              class="w-full flex justify-center rounded-3xl overflow-hidden pointer-events-auto cursor-pointer"
            >
              <div class="relative h-full">
                <CarouselImage
                  :src="pckage.images[index]?.url"
                  :alt="pckage.images[index]?.alt"
                  class="h-full"
                />
                <PackageChevronsOne
                  v-if="pckage.images.length > 1"
                  :pckage="pckage"
                  :mobilePicPointer="mobilePicPointer"
                  :mobileBrowseLeft="mobileBrowseLeft"
                  :mobileBrowseRight="mobileBrowseRight"
                  class=""
                />
              </div>
            </div>
          </div>
        </div>

        <!-- chevrons magazine layout : -->

        <!--   more than 3 pix && xl up : magazine layout-->
        <div
          v-if="!dataLoadingState && pckage.images.length >= 3 && checkXl()"
          class="relative mb-10 h-full"
        >
          <div
            class="w-full"
            v-for="(pics, index) in threeImagesArray"
            :key="index"
          >
            <transition name="x-fade-fast">
              <!-- odd 3s -->
              <div
                v-show="index == scrollPointer && index % 2 == 0"
                class="absolute inset-0 h-full w-full grid grid-cols-[2fr,1fr] gap-x-5"
              >
                <div class="h-full overflow-hidden rounded-3xl">
                  <CarouselImage
                    :src="pics[0]?.url"
                    :alt="pics[0]?.alt"
                    class="w-full min-h-full"
                  />
                </div>
                <div class="w-full grid grid-rows-2 gap-y-5">
                  <div class="relative overflow-hidden h-full rounded-3xl">
                    <div class="absolute inset-0">
                      <CarouselImage
                        :src="pics[1]?.url"
                        :alt="pics[1]?.alt"
                        class="min-w-full min-h-full"
                      />
                    </div>
                  </div>
                  <div
                    v-if="!pckage.video_url"
                    class="relative overflow-hidden h-full rounded-3xl"
                  >
                    <div class="absolute inset-0">
                      <CarouselImage
                        :src="pics[2]?.url"
                        :alt="pics[2]?.alt"
                        class="w-full min-h-full"
                      />
                    </div>
                  </div>
                  <!-- video -->
                  <div
                    v-if="pckage.video_url !== null"
                    class="overflow-hidden rounded-3xl flex flex-col w-full h-full pointer-events-auto cursor-pointer"
                  >
                    <iframe
                      class="grow"
                      :src="pckage.video_url"
                      title="Sugar Beach Golf & Spa Resort, Mauritius - Overview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      loading="lazy"
                    ref="videoEl"
                    ></iframe>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="x-fade-fast">
              <!-- odd 3s -->
              <div
                v-show="index == scrollPointer && index % 2 != 0"
                class="absolute inset-0 h-full w-full grid grid-cols-[1fr,2fr] gap-x-5"
              >
             
                <div class="w-full grid grid-rows-2 gap-y-5">
                  <div class="relative overflow-hidden h-full rounded-3xl">
                    <div class="absolute inset-0">
                      <CarouselImage
                        :src="pics[1]?.url"
                        :alt="pics[1]?.alt"
                        class="min-w-full min-h-full"
                      />
                    </div>
                  </div>
                  <div
                    v-if="!pckage.video_url"
                    class="relative overflow-hidden h-full rounded-3xl"
                  >
                    <div class="absolute inset-0">
                      <CarouselImage
                        :src="pics[2]?.url"
                        :alt="pics[2]?.alt"
                        class="w-full min-h-full"
                      />
                    </div>
                  </div>
                  <!-- video -->
                  <div
                    v-if="pckage.video_url !== null"
                    class="overflow-hidden rounded-3xl flex flex-col w-full h-full pointer-events-auto cursor-pointer"
                  >
                    <iframe
                      class="grow"
                      :src="pckage.video_url"
                      title="Sugar Beach Golf & Spa Resort, Mauritius - Overview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      loading="lazy"
                      ref="videoEl"

                    ></iframe>
                  </div>
                </div>
                <div class="h-full overflow-hidden rounded-3xl">
                  <CarouselImage
                    :src="pics[0]?.url"
                    :alt="pics[0]?.alt"
                    class="w-full min-h-full"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <!-- magazine chevrons -->
      <div
        class="absolute inset-0 h-full w-full hidden lg:flex justify-between items-end p-10 pointer-events-none z-10 rounded-3xl"
      >
        <div>
          <div
            class="bg-green-avo rounded-full p-4 bg-opacity-80 duration-500 hover:bg-opacity-100 transition-all"
            v-if="scrollPointer > 0"
          >
            <IconChevronLeft
              class="text-lime-600 transform scale-150 cursor-pointer pointer-events-auto w-6"
              @click="browseLeft"
            />
          </div>
        </div>
        <div>
          <div
            class="bg-green-avo rounded-full p-4 bg-opacity-80 duration-500 hover:bg-opacity-100 transition-all"
            v-if="scrollPointer < threeImagesArray.length - 1"
          >
            <IconChevronRight
              class="text-lime-600 transform scale-150 cursor-pointer pointer-events-auto w-6"
              @click="browseRight"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- content below pics: -->
    <div class="text-md">
      <!-- tabs header -->
      <TabMenu
        v-if="tabs.length"
        @selectTab="setActiveTab"
        class="hidden md:flex mb-5"
        :titles="tabs"
      ></TabMenu>

      <!-- tabs content -->

      <div class="pb-10 tracking-wide leading-normal">
        <!-- overview header for mobile only: -->
        <div
          class="block md:hidden w-full pb-8 font-semibold text-xl flex justify-center"
        >
          overview
        </div>

        <!-- overview -->
        <div
          v-if="activeTab === 0"
          class="block md:grid md:grid-cols-[2fr,1fr] gap-4 transition ease-in duration-300"
        >
          <div class="rounded-3xl bg-white p-5 md:p-12">
            <p v-html="pckage.description" />
            <PackageHeading> includes:</PackageHeading>

            <div v-if="pckage.supplier == 'TH'" class="rounded-3xl" role="list">
              <div
                v-for="(line, index) in pckage.includes"
                :key="index"
                class=""
                role="listitem"
              >
                <p v-html="line"></p>
                <br />
              </div>
            </div>
            <div
              v-if="pckage.supplier != 'TH'"
              v-html="pckage.includes"
              class=""
            />
            <PackageHeading> excludes:</PackageHeading>
            <ul v-if="pckage.supplier == 'TH'" class="rounded-3xl" role="list">
              <li
                v-for="(line, index) in pckage.excludes"
                :key="index"
                v-html="line"
                class=""
                role="listitem"
              ></li>
            </ul>
            <div
              v-if="pckage.supplier != 'TH'"
              class="rounded-3xl bg-white"
              v-html="pckage.excludes"
            ></div>
          </div>

          <div class="rounded-3xl bg-white p-5 lg:p-12">
            <PackageHeading class="pt-0"> details:</PackageHeading>
            <ul id="details" role="list">
              <li role="listitem">
                <div>prices from:</div>
                <div>
                  R
                  {{ pckage.price }}
                  pps
                </div>
              </li>
              <!-- <li role="listitem">
                <div>trip reference:</div>
                <div>
                  {{ pckage.ct_ref }}
                </div>
              </li> -->
              <li v-if="pckage.manually_created">
                <div>flights:</div>
                {{ pckage.flights }}
              </li>

              <li role="listitem">
                <div>travel from:</div>
                {{ from }}
              </li>
              <li>
                <div>to:</div>
                {{ to }}
              </li>
              <li>
                <div>book before:</div>
                {{ pckage.valid_to }}
              </li>
            </ul>
            <div class="flex flex-col items-center mt-5" role="contentinfo">
              <PackageHeading> need visas?</PackageHeading>
              <div>Please confirm with your travel consultant.</div>
              <br />
              <div class="grid grid-cols-[3fr,1fr,3fr,1fr] grid-rows-2 gap-2">
                <span class="text-end">S. Africa:</span>
                <div>No</div>
                <span class="text-right">EU:</span>
                <div>No</div>
                <span class="text-right">America:</span>
                <div>No</div>
                <span class="text-right">British:</span>
                <div>No</div>
              </div>
            </div>
            <PackageHeading> terms and conditions:</PackageHeading>
            <div
              v-if="tsAndCs"
              class="rounded-3xl bg-white transform translate-x-0 transition ease-in duration-300"
              role="contentinfo"
            >
              <div v-html="tsAndCs" class="text-xs" />
            </div>
          </div>
        </div>

        <!-- about destination -->
        <div
          v-if="belowMd || activeTab === 1"
          class="transform translate-x-0 transition ease-in duration-300"
        >
          <h3 class="block md:hidden text-xl text-center font-semibold my-5">
            about {{ pckage.about_content ? pckage.about_content.name : "" }}
          </h3>
          <div
            id="about"
            class="rounded-3xl font-open-sans bg-white p-5 md:p-12"
            v-html="pckage.about_content ? pckage.about_content.copy : ''"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAutoSuggestStore } from "@/stores/autoSuggest";
const suggestStore = useAutoSuggestStore();
import helpers from "@/helpers/packages";
import CarouselImage from "../CarouselImage.vue";
const props = defineProps({
  pckage: Object,
});
const belowMd = ref(null);
const dataLoadingState = ref(true);
const safeImage = ref(null);
const tabs = ref([]);
const tsAndCs = ref(null);
const { getItems } = useDirectusItems();
// fetch universal ts and cs
let tsAndCsRes = null;
let videoEl = ref(null);
try{
 tsAndCsRes = await getItems({
  collection: "terms_and_conditions",
});
} catch (e) {
  console.log("oop",e);
}
tsAndCs.value = tsAndCsRes.copy;
let pckage = ref(processPackage(props.pckage));
function processPackage(pckage) {
  pckage.flights = pckage.includes_flights ? "Included" : "Not Included";

  // Thompsons API package:
  if (pckage.supplier == "thompsons") {
    pckage.supplier = "TH";
    pckage.includes = pckage.includes.split("\n");
    pckage.includes.splice(0, 1);
    pckage.includes = pckage.includes.filter((item) => item !== "");
    pckage.excludes = pckage.excludes.split(". ");
    pckage.excludes = pckage.excludes.filter((item) => item !== "");
    // pckage.termsListItems = pckage.terms
    //   .split(". ")
    //   .filter((item) => item.length > 1);
  }
  return pckage;
}
const destination = ref(null);
onMounted(async () => {
  pckage.value.images = await helpers.mapImages(pckage.value.images);

  console.log(pckage.value.images);
  let destinationObj = await helpers.calculateDestination(pckage.value);
  destination.value = helpers.generateString(destinationObj, pckage.value);
  console.log("destination", destination.value);

  const destinationData = await getItems({
    collection: destinationObj?.type,
    params: {
      filter: {
        name: {
          _eq: destinationObj?.name,
        },
      },
      fields: helpers.allFieldsPlusImagesArray,
    },
  });

  console.log("destinationData", destinationData);

  pckage.value.about_content = {
    name: destinationData[0].name,
    copy: destinationData[0].copy,
  };

  tabs.value = [`overview`, `about ${pckage.value?.about_content.name ?? ""}`];

  console.log("content", pckage.value.about_content);
  // manage no valid images by picking one relevant fallback
  if (
    pckage.value.images.length === 0 ||
    pckage.value.images.filter((item) => !item?.url).length > 0
  ) {
    console.log("fetch a fallback image");
    console.log(pckage.value);
    if (destinationData[0].images.length) {
      safeImage.value = pickOne(helpers.mapImages(destinationData[0].images));
    } else {
      console.log("no images");
      pckage.value.images = [];
      pckage.value.images[0] = {
        url: "7440982e-8e7d-49b0-b41b-ac022373a35a.png",
        alt: "rio",
      };
    }

    console.log("fbArr:", destinationData[0]);
    console.log("image", safeImage.value);
  }
  // manage many images, making a batched array
  if (
    pckage.value.images.length > 2 &&
    pckage.value.images.every((item) => item?.url)
  ) {
    console.log(
      "we have many images, so build 3 images arr",
      pckage.value.images
    );
    for (
      let i = 0;
      i < pckage.value.images.length - (pckage.value.images.length % 3);
      i++
    ) {
      if (i % 3 == 0) {
        threeImagesArray.push([
          pckage.value.images[i],
          pckage.value.images[i + 1],
          pckage.value.images[i + 2],
        ]);
      }
    }

    console.log("3 images", threeImagesArray);
  }
  dataLoadingState.value = false;
});

function pickOne(array) {
  return array[Math.round(Math.random() * (array.length - 1))];
}
let threeImagesArray = [];

const scrollPointer = ref(0);
const browseLeft = () => {
  if (scrollPointer.value > 0) {
    scrollPointer.value--;
  }
  stopVids();
};

const browseRight = () => {
  if (scrollPointer.value < threeImagesArray.length - 1) {
    scrollPointer.value++;
  }
  stopVids();
};
// text data:

//  template methods:
const activeTab = ref(0);
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
const mobilePicPointer = ref(0);
const mobileBrowseLeft = () => {
  if (mobilePicPointer.value > 0) {
    mobilePicPointer.value--;
  }
  stopVids();
};
const mobileBrowseRight = () => {
  if (mobilePicPointer.value < pckage.value.images.length - 1) {
    mobilePicPointer.value++;
  }
  stopVids();
};
const stopVids = () => {
  console.log("stop vids");
// stop all youtube vids
  let vids = document.querySelectorAll("iframe");
  console.log(vids);
  vids.forEach((vid) => {
    var iframeSrc = vid.src;
		vid.src = iframeSrc;
  });
};

const checkXl = () => {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return true;
  }
  return false;
};

const from = new Date(pckage.value.from).toLocaleDateString("en-us", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});
const to = new Date(pckage.value.to).toLocaleDateString("en-us", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});
</script>

<style scoped>
#details > li div:nth-child(1) {
  width: 50%;
  text-align: right;
  font-weight: 400;
  padding-right: 10px;
}

#details li div:nth-child(2) {
  text-align: left;
}

#details li {
  display: flex;
}

span {
  font-weight: 400;
}

a {
  text-decoration: underline !important;
}
</style>
