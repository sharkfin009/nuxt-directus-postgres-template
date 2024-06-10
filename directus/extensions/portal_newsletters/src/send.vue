<template>
  <v-sheet class="hp">
    <v-card-title>Newsletter title: {{ title }} </v-card-title>
    <div>
      paste html here
      <input v-model="html" class="w-100" type="textarea" />
    </div>
    <br />
    <br />
    <v-button @click="send(true)">Send Test</v-button>
    <v-button
      v-if="sentState !== 'sent' && confirmState === false"
      @click="confirm"
      class="fl-right"
      >Send Newsletter</v-button
    >
    <v-button
      v-if="sentState !== 'sent' && confirmState === true"
      @click="send(false)"
      class="fl-right"
      >Click to confirm</v-button
    >
   
    <br>
    <br>
    <div class="w-100 flex"
    style="padding-left:200px; padding-right:200px; padding-top:50px; padding-bottom:50px;"
    v-if="sentState === 'sent'">
      Success
      <v-icon
    
        class="iconColor fl-right"
        name="check"
        size="xl"
      />
    </div>
  </v-sheet>
</template>
<script setup>
let props = defineProps({
  title: {
    type: String,
  },
  status: {
    type: String,
  },
  id: {
    type: Number,
  },
  subscribers: {
    type: Array,
  },
});
import { onMounted, ref, reactive } from "vue";
import { useApi } from "@directus/extensions-sdk";
const api = useApi();
const confirm = async () => {
  confirmState.value = true;
};
const html = ref("");
const confirmState = ref(false);
const sentState = ref("not sent");
const testMode = ref(true);

const send = async (testMode) => {
  // send to email endpoint
  console.log("sending email");
  api
    .post(`./newsletter_send/send`, {
      html: html.value,
      title: props.title,
      testMode: testMode,
      subscribers: props.subscribers,
    })
    .then((res) => {
      if (res.status == 200) {
        console.log("response from endpoint", JSON.stringify(res));
        confirmState.value = true;
        updateStatus();
      } else {
        console.log("error from endpoint", JSON.stringify(res));
      }
    });
  return "done";
  //
};

const updateStatus = async () => {
  api
    .patch(`./items/newsletters/${props.id}`, {
      status: "sent",
    })
    .then((res) => {
      if (res.status == 200) {
        console.log("response from API", JSON.stringify(res));
        sentState.value = "sent";
      } else {
        console.log("error from API", JSON.stringify(res));
      }
    });
  return "done";
};
</script>
