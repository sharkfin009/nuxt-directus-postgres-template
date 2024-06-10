<template>
  <HomeSectionLayout v-if="faves" bgColor="bg-green-avo">
    <!-- <pre>{{faves }}</pre> -->

    <div>
      <!-- top row -->
      <SectionHeading
        heading="holiday packages"
        subheading="our favourite"
        :inverted="true"
        class=""
      />
      <!-- desktop cards: -->
      <div class="hidden md:grid w-full grid-cols-[80px,auto,80px]">
        <div
          class="flex items-center justify-center cursor-pointer"
          @click="scrollLeft"
        >
          <IconChevronLeft class="cursor-pointer hover:scale-110 w-10 z-10" />
        </div>
        <!-- desktop cards -->
        <div class="overflow-x-auto lg:snap-x lg:snap-mandatory" ref="cardRow">
          <div ref="" class="card-grid flex pb-8">
            <div
              v-for="(fave, index) in faves"
              :key="index"
              class="snap-center"
            >
              <Card class="" :package="fave" />
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-center cursor-pointer"
          @click="scrollRight"
        >
          <IconChevronRight class="hover:scale-110 w-10 z-10" />
        </div>
      </div>

      <!-- mobile cards: -->
      <div class="flex justify-center md:hidden relative md:pt-10">
        <div class="relative w-[305px] h-[400px]">
          <div v-for="(fave, index) in faves" :key="index">
            <transition name="fade">
              <card
                v-show="index == browsePointer"
                :package="fave"
                class="absolute inset-0"
              ></card>
            </transition>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center h-full py-5">
        <NuxtLink to="/search">
          <CompuButton
            class="bg-black hidden lg:flex mx-10 md:mx-20 shadow-2xl mb-5"
          >
            view more holidays
          </CompuButton>
        </NuxtLink>
        <div class="lg:hidden flex justify-between items-center w-[320px]">
          <IconChevronLeft class="cursor-pointer w-10" @click="browseLeft" />
          <IconChevronRight class="cursor-pointer w-10" @click="browseRight" />
        </div>
      </div>
    </div>
  </HomeSectionLayout>
</template>

<script setup>
const { getItems } = useDirectusItems();
const config = useRuntimeConfig();
import { useGlobal } from "@/stores/global";
const global = useGlobal();
import helpers from "@/helpers/packages";
let faves = await getItems({
  collection: "favourites",
  params: {
    fields: helpers.favouriteFields,
  },
}).catch((e) => {
  console.log(e);
});

faves = faves.map((item) => item.package);
console.log(JSON.stringify("faves", faves, null, 3));
const cardRow = ref(null);
cardRow.scrollBehavior = "smooth";
var scrollAmount = 0;

const scrollRight = () => {
  cardRow.value.scrollTo({
    top: 0,
    left: Math.max((scrollAmount += 500), 1000),
    behavior: "smooth",
  });
};

const scrollLeft = () => {
  cardRow.value.scrollTo({
    top: 0,
    left: Math.max((scrollAmount -= 500), 0),
    behavior: "smooth",
  });
};
const browsePointer = ref(0);
setInterval(() => {
  if (browsePointer.value < faves.length - 1) {
    browsePointer.value++;
  } else {
    browsePointer.value = 0;
  }
}, 5000);
const browseLeft = () => {
  if (browsePointer.value > 0) {
    browsePointer.value--;
  } else browsePointer.value = faves.length - 1;
};
const browseRight = () => {
  if (browsePointer.value < faves.length - 1) {
    browsePointer.value++;
  } else browsePointer.value = 0;
};
</script>

<style>
.card-grid > * + * {
  margin-left: 2rem;
}
</style>
