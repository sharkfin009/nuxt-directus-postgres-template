<template>
  <div class="bg-slate-50">
    <SearchOptions />
    <div
      class="w-full h-[50vh] mt-20 flex justify-center items-center"
      v-if="searchStore.loadingState == true"
    >
      <IconTick class="animate-ping" style="color: #8fc15a" />
    </div>
    <!-- results -->
    <Transition name="fade">
      <div
        v-if="searchStore.results.length && searchStore.loadingState == false"
        class="w-full pt-10 px-10 flex justify-center"
      >
      
        <div class="">
          <div
            class=""
            v-for="(twelve, index) in searchStore.results"
            :key="index"
          >
            <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              <div v-for="(card, cardIndex) in twelve" :key="cardIndex">
                <Card :package="card" class="" />
              </div>
            </div>
          </div>

          <div
            class="w-full flex justify-center h-[50vh] mt-20 "
            v-if="searchStore.batchLoadingState"
          >
            <IconTick class="animate-ping" style="color: #8fc15a" />
          </div>

          <!-- <div
            class="w-full flex justify-center"
            v-if="!searchStore.batchLoadingState && !searchStore.noMoreResults"
          >
            <CompuButton class="bg-green-avo text-green my-20" @fire="seeMore"
              >see more </CompuButton
            >
          </div> -->
        </div>
      </div>
    </Transition>
    <!-- random results -->
    <Transition name="fade">
      <div>
      <div class="text-xl text-lime-600 font-titillium">
          <div class="text-center my-10" v-if="searchStore.firstLoad">
           Here is a general selection of  holiday packages: </div
          >
          <div
            class="text-center my-20"
            v-if="!searchStore.firstLoad && !searchStore.results.length"
          >
            No results found.<br /> Why not
            browse these holiday packages
          </div>
          <div
            class="text-center py-10"
            v-if="!searchStore.firstLoad && searchStore.results.length"
          >
            Other holiday package options:
          </div>
        </div>
      <div
        v-if="
          searchStore.pickedRandomResults.length &&
          searchStore.loadingState == false
        "
        class="w-full  px-10 flex flex-col gap-y-2 border-black  items-center justify-center"
      >
       

        <div class="grid gap-y-10">
          <div
            class=""
            v-for="(twelve, index) in searchStore.pickedRandomResults"
            :key="index"
          >
            <div class="grid gap-10  md:grid-cols-2 xl:grid-cols-3 ">
              <div v-for="(card, cardIndex) in twelve" :key="cardIndex">
                <Card :package="card" class="" />
              </div>
            </div>
          </div>

          <div
            class="w-full flex justify-center h-[50vh] mt-20"
            v-if="searchStore.batchLoadingState"
          >
            <IconTick class="animate-ping" style="color: #8fc15a" />
          </div>
        </div>
        <div
            class="w-full flex justify-center"
            v-if="!searchStore.batchLoadingState"
          >
            <CompuButton @fire="seeMoreRandom()" class="bg-lime-500 text-white my-20"
              >see more random picks</CompuButton
            >
          </div>
      </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>



definePageMeta({
  layout: "general",
});
useHead({
  title: "Search for your travel destination - Computravel",
  meta: [
    { name: "description", content: "Search for your travel destination" },
    { name: "og:description", content: "Search for your travel destination" },
    { name: "og:title", content: "Search for your travel destination - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Search for your travel destination" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Search for your travel destination - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});
import { useStore } from "@/stores/search";
const searchStore = useStore();
const route = useRoute();
onMounted(() => {
 
  const content = ref(null);

  console.log(content);
    searchStore.category.name = route.query.category;
    searchStore.destination.name = route.query.destination;
    searchStore.destination.type = route.query.destinationType;
    searchStore.sortBy.name = route.query.sortBy;
    searchStore.sortBy.value = route.query.sortBy;
    searchStore.price_min = route.query.price_min;
    searchStore.price_max = route.query.price_max;
    searchStore.queryString = route.query.query;
    console.log(route.path)
    if(Object.keys(route.query).length > 0){
      searchStore.fireQuery(false)
    } else {
      searchStore.randomQuery(12, true);
      console.log("random query")
    }
    
});



const seeMoreRandom = () => {
  console.log("seeMoreRandom");
  
  // searchStore.customReset();
  searchStore.randomQuery(12, true);
};

</script>
