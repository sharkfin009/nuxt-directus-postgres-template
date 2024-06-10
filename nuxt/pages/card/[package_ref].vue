<template>
    <card id="card" :package="data"> </card>
</template>
<script setup>
const route = useRoute();
const { getItems } = useDirectusItems();
const packageRef = route.params.package_ref;
import helpers from "@/helpers/packages";
let res = await getItems({
  collection: "packages",
  params: {
    fields: helpers.packageFields,
    filter: {
      ct_ref: {
        _eq: packageRef,
      },
    },
  },
});

let data = res[0];
console.log(data);
</script>
