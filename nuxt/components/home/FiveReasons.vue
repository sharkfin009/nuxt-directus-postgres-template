<template>
  <HomeSectionLayout v-if="reasons !== undefined" bgColor="bg-green-avo">
    <div
      class="bg-green-avo flex flex-col text-2xl justify-evenly md:mx-0 pb-5"
    >
      <SectionHeading
        heading="travel with us"
        subheading="five reasons to"
        :inverted="true"
      />

      <TabMenu
        @selectTab="setActiveTab"
        :titles="titles"
        class="mb-5"
      ></TabMenu>

      <div class="relative h-[280px] md:h-[400px] overflow-hidden ">
        <HomeReason
          v-for="(reason, index) in reasons"
          :key="index"
          :reason="reason"
          class="absolute inset-0 transition ease-in duration-300"
          :class="{ 'opacity-0 translate-x-[80vw]': index !== activeTab }"
        />
      </div>
    </div>
  </HomeSectionLayout>
</template>

<script setup>
const activeTab = ref(0);
let titles = ref([]);
const setActiveTab = (index) => {
  activeTab.value = index;
};
const { getItems } = useDirectusItems();
let fields = [  "*","image.description",
  "image.filename_disk",
  "image.filename_download"].join()
let reasons = await getItems({
  collection: "reasons",
  params: {
    fields
  }
})
titles.value = reasons.map((item) => item.title);
reasons = reasons.map((item) => ({
  subtitle: item.subtitle,
  content: item.content,
  imageUrl:item.image.filename_disk ,
  altText: item.image.description?item.image.description:item.image.filename_download
}));
// update global when mounted:
import { useGlobal } from "@/stores/global";
const global = useGlobal();
onMounted(() => {
});
</script>
