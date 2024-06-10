<template>
<Transition name="fade">
  <div
    class="z-[15] "
    v-show="suggestStore.showSuggestions == true"
    :class="{ '': parent != 'welcome' }"
 ref="overlay"

  >
    <div
      class="flex  items-start pb-10 px-2 "
      :class="{ 'bg-slate-50 px-[30px]': parent != 'welcome' }"
    >
      <div
        class="
          rounded-3xl
          bg-slate-200
          p-5
          md:p-20
          
          
          opacity-100
          flex flex-col
          cursor-pointer
          mb-20
            w-full  
        "
      >
        <!-- query suggestions -->
        <div
          class="
            hidden
            md:block
            text-3xl
            font-semibold font-titillium
            tracking-wide
            inset-0
          "
        >
        </div>
        <div class="m-0 inset-0">
          <div class="flex flex-wrap justify-center sm:gap-4">
            <div
              v-for="(item, index) in suggestStore.querySuggestions"
              :key="index"
              class="
                flex
                items-center
                bg-slate-50
                rounded-xl
                pr-4
                py-1
                mb-4
                text-lime-700
                hover:bg-lime-500 hover:text-lime-200
                mr-4
              "
              @click="suggestStore.searchByOption(item )"
              :class="{
                ' !bg-opacity-90  bg-lime-600 text-lime-200':
                  index === suggestStore.selectedSuggestion,
              }"
            >
              <IconSearch class="h-4 text-black mx-2" />
              <div class="">{{ item.name }}</div>
            </div>
          </div>
        </div>

   
        <!-- packages -->
     
        <div class="md:block inset-0">
          <div
            v-for="(suggestion, index) in suggestStore.packageSuggestions"
            :key="index"
            class=""
            @click="
              suggestStore.viewPackage(suggestion.slug, suggestion.ct_ref)
            "
          >
            <div
              class="rounded-3xl  p-6 "
              v-on:mouseover="mouseOver(index)"
              @mouseleave="hoveredSuggestion = 0"
              :class="{
                '!bg-lime-500 !bg-opacity-80 !text-white':
                  index === hoveredSuggestion - 1 && !mobile,
              }"
            >
              <div
                class="grid grid-cols-[auto,100px] mb-2 gap-2"
                @mouseleave="mouseLeave"
              >
                <div class="">
                  <div
                    class="
                      w-full
                      rounded-l-full
                      cursor-pointer
                      transition-colors
                    "
                  >
                    <div
                      class="font-semibold text-lime-600"
                      :class="{
                        ' !text-lime-200': index === hoveredSuggestion - 1,
                      }"
                    >
                      {{ helpers.ellipsis(suggestion.title,70) }}
                    </div>
                  </div>
                </div>
                <div
                  class="
                    h-full
                    text-lime-700
                    items-center
                    font-medium
                    text-end
                    w-full
                  "
                  :class="{
                    ' !text-lime-200': index === hoveredSuggestion - 1,
                    '  !text-lime-200':
                      index === suggestStore.selectedSuggestion,
                  }"
                >
                  {{ suggestion.destination }}
                </div>
              </div>
              <div class="flex grid md:grid md:grid-cols-[auto,100px]">
                <div class="font-light" v-html="helpers.ellipsis(suggestion.description??'', 200)"></div>
                <div class="text-end">R {{ suggestion.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</Transition>
</template>
<script setup>
onMounted(() => {
  let mobile = window.matchMedia("(min-width: 600px");
});
import { useStore } from "@/stores/search";
const searchStore = useStore();
import helpers from "@/helpers/text"
import { useGlobal } from "@/stores/global";
const global = useGlobal();
import { useAutoSuggestStore } from "@/stores/autoSuggest";
const suggestStore = useAutoSuggestStore();
const route = useRoute();
const props = defineProps({
  parent: String,
});

const hoveredSuggestion = ref(0);

const mouseOver = (index) => {
  hoveredSuggestion.value = index + 1;
};

const mouseLeave = () => {
  hoveredSuggestion.value = null;
};

const overlay = ref(null);
useDetectOutsideClick(overlay, () => {
  if(!suggestStore.inputHasFocus){
  suggestStore.showSuggestions = false;
  global.showShadow = false
  console.log("outside click")
  }
  
});


</script>
