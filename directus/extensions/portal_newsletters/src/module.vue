<template>
  <private-view :title="'Newsletter Portal: '">
    <template v-slot:navigation>
      <v-card-title style="text-align: center"> Newsletters </v-card-title>
      <v-list class="w-100">
        <v-list-item
          :value="2"
          :block="true"
          :clickable="true"
          :grow="true"
          :exact="true"
          :query="false"
          :nav="false"
          class=""
          v-for="(newsletter, index) in newsletters"
          :key="index"
          style="margin-left: 30px; margin-right: 30px"
          v-on:click="selectNewsletter(newsletter.id)"
        >
          <div class="cp w-100">
           <div> {{ newsletter.title }}</div> 
            <div class="fl-right">status: {{ newsletter.status }}</div>
          </div>
        </v-list-item>
      </v-list>
    </template>
 
    <div class="mb" >
        <send 
        v-if="showSend"
        :title="selectedNewsletter.value.title"
        :id="selectedNewsletter.value.id"
         :status="selectedNewsletter.value.status"
         :subscribers="subscribers"
         :key = "selectedNewsletter.value.id"
         />
        
    </div>
  </private-view>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useApi } from "@directus/extensions-sdk";
import send from "./send.vue";


let api = useApi();
const newsletters = ref([]);
const selectedNewsletter = reactive({});
const showSend = ref(false);
const subscribers = ref([])

const selectNewsletter = async (id) => {
  console.log("selected newsletter id: ", id);
  selectedNewsletter.value = newsletters.value.find((item) => item.id == id);
  console.log("selected newsletter: ", selectedNewsletter);
  showSend.value = true
};

onMounted(async () => {
  await api.get(`/items/newsletters?fields=*`).then((res) => {
    newsletters.value = res.data.data;
  });
  await api.get(`/items/subscribers?fields=email&limit=10000`).then((res) => {
    subscribers.value = res.data.data;

  });
});




</script>

<style>
.hp {
  /* --v-sheet-padding: 50px; */
  padding-left: 50px !important;
  padding-right: 50px !important;
}
.w-100 {
  width: 100%;
}
.w-25 {
  width: 25% !important;
}
.v-table {
  /* pointer-events: none; */
  margin-top: 30px;
}
.mb {
  margin-bottom: 30px !important;
}
.mt {
  margin-top: 10px !important;
}
.fl-right {
  float: right;
}
.cp {
  cursor: pointer;
}
.enquiryItem:hover {
  color: green;
}
.flex {
  display: flexbox !important;
}
.between {
  justify-content: space-between !important;
}
.center {
  text-align: center !important;
}
.iconColor {
  color: green;
}
</style>
