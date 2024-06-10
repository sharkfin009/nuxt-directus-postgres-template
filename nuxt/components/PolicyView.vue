<template>
  <div class="my-10 md:px-20 policy">
    <div class="font-titillium font-bold text-4xl mb-5">
      {{ title }}
    </div>
    <div class="policies" v-html="body" />
  </div>
</template>
<script setup>
const props = defineProps({
  docName: String,
  title: String,
});
const { getItems } = useDirectusItems();
let res = await getItems({
  collection: "documents",
  params: {
    fields: "*",
    filter: {
      name: {
        _eq: props.docName,
      },
    },
  },
});
let body = res[0].body;
</script>
<style scoped>
h3 {
  font-size: 18px !important;
}

</style>