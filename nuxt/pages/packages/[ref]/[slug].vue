<template>
  <div class="relative">
    <Head>
      <Meta
        property="og:description"
        :content="'R ' + pckage.price + ' per person sharing'"
      />

      <Meta property="og:title" :content="pckage.title" />
      <Meta property="og:image" :content="pckage.images[0]?.url" />

      <!-- twitter: -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content="'https://computravel.co.za'" />

      <Meta name="twitter:image" />
    </Head>

    <div class="h-full w-full bg-slate-50 flex justify-center">
      <div class="w-full max-w-[1600px]">
        <PackageBody v-if="pckage.images" :pckage="pckage"> </PackageBody>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "general",
});
const route = useRoute();
const { getItems } = useDirectusItems();
import helpers from "@/helpers/packages";
const packages = await getItems({
  collection: "packages",
  params: {
    fields: helpers.packageFields,
    filter: {
      ct_ref: {
        _eq: route.params.ref,
      },
      status: {
        _eq: "published",
      },
    },
  },
});

if (!packages.length) {
  throw createError({
    statusCode: 404,
    statusMessage: "Oops! Looks like you've found an unknown destination",
    fatal: true,
  });
}
let pckage = packages[0];

// Get some locations for meta data
const extractNameCopy = (data) => {
  if (
    typeof data === "undefined" ||
    typeof data !== "object" ||
    data === null
  ) {
    return "";
  }
  if (typeof data.name === "string") {
    return data.name;
  }
  if (typeof data.copy === "string") {
    return data.copy.replace("<p>", "").replace("</p>", "");
  }
  return "";
};
let region_list = [];
if (extractNameCopy(pckage.province) !== "") {
  region_list.push(extractNameCopy(pckage.province));
}
if (extractNameCopy(pckage.country) !== "") {
  region_list.push(extractNameCopy(pckage.country));
}
let description_list = [];
if (extractNameCopy(pckage.province) !== "") {
  description_list.push("Category: " + extractNameCopy(pckage.province));
}
if (extractNameCopy(pckage.about_content) !== "") {
  description_list.push(extractNameCopy(pckage.about_content));
}

useHead({
  title: pckage.title + " package in " + region_list.join(", ") + " - Computravel",
  meta: [
    { name: "description", content: description_list.join(", ") },
    { name: "og:description", content: description_list.join(", ") },
    { name: "og:title", content: pckage.title + " package in " + region_list.join(", ") + " - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:description", content: description_list.join(", ") },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: pckage.title + " package in " + region_list.join(", ") + " - Computravel" }
  ],
  htmlAttrs: {
    lang: "en",
  },
});

//   "@context": "https://schema.org/",
//   "@type": "Product",
//   url: config.siteUrl + route.path,
//   name: pckage.title,
//   image: config.directusUrl + "/assets" + pckage.images[0].directus_files_id.filename_disk,
//   description: pckage.description,
//   // sku: pckage.ct_ref,
//   // mpn: "925872",
//   brand: {
//     "@type": "Brand",
//     name: "Computravel",
//   },
//   offers: {
//     "@type": "Offer",
//     url: config.siteUrl + "/" + pckage.ct_ref + "/" + route.params.slug,
//     priceCurrency: "ZAR",
//     price: pckage.price,
//     priceValidUntil: pckage.valid_to,
//     image: config.directusUrl + "/assets" + pckage.images[0].directus_files_id.filename_disk,
//     availability: "https://schema.org/InStock",
//   },
// });
</script>
