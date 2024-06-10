<template>
  <div class="px-5 lg:p-10 flex flex-col items-evenly justify-evenly pb-5">
    <div v-if="!bookingSent && flightData">
      <div class="text-center font-titillium">
        <div class="mb-5 font-bold">Flight Information:</div>
        <div class="mb-5 text-2xl font-bold">
          {{ flightData.name }}
        </div>
      </div>
      <div
        class="grid grid-cols-[1fr,2fr] md:grid-cols-2 gap-5 font-light text-xl mb-10"
      >
        <div class="text-end font-medium">airline:</div>
        <div class="">
          {{ flightData.airline }}
        </div>
        <div class="text-end font-medium">departing Airport:</div>
        <div class="">
          {{ flightData.departing_airport }}
        </div>
        <div class="text-end font-medium">destination Airport:</div>
        <div class="">
          {{ flightData.destination_airport }}
        </div>
        <div class="text-end font-medium">ticket By:</div>
        <div class="">
          {{ flightData.ticket_by }}
        </div>
        <div class="text-end font-medium">duration:</div>
        <div>
          {{ flightData.duration }}
        </div>
        <div class="text-end font-medium">valid from:</div>
        <div>
          {{ flightData.valid_from }}
        </div>
        <div class="text-end font-medium">valid to:</div>
        <div>
          {{ flightData.valid_to }}
        </div>
      </div>

      <div class="flex flex-col items-center w-full">
        <h4
          class="text-2xl font-bold flex justify-center mb-10 w-full md:w-[700px]"
        >
          Thank you for your interest in this flight special. Please give us
          some details and we will get right back to you.
        </h4>
        <div
          class="md:w-[700px] bg-green-avo rounded-xl pt-10 pb-10 md:pt-10 px-10"
        >
          <div class="mb-5 w-full flex flex-col gap-5">
            <Input
              v-if="vl.full_name"
              inputName="full_name"
              label="Full Name"
              type="text"
              :validationObject="vl.full_name"
              errorMessage="valid full name is required"
              placeholder="full name"
              @setValue="setValue"
            />
            <Input
              v-if="vl.email"
              inputName="email"
              label="Email Address"
              type="text"
              :validationObject="vl.email"
              errorMessage="valid email is required"
              placeholder="email"
              @setValue="setValue"
            />
            <Input
              v-if="vl.cell"
              inputName="cell"
              label="Cell Number"
              type="text"
              :validationObject="vl.cell"
              errorMessage="valid cell no is required"
              placeholder="number"
              @setValue="setValue"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <CompuButton @fire="validate" class="bg-lime-500 my-10"
          >send enquiry</CompuButton
        >
        <div v-if="showPrompt" class="font-medium text-xl text-red-700">
          Please fill in all required fields
        </div>
      </div>
      <div class="flex w-full flex-col items-center py-10">
        <div class="text-center font-titillium">
          <div class="mb-5 font-bold">Fare Rules:</div>
        </div>
        <div class="font-light" v-html="flightData.fare_rules" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { getItems } = useDirectusItems();

import { useGlobal } from "~~/stores/global";
const global = useGlobal();

const route = useRoute();
console.log(route.params.ref);
let flightData = await getItems({
  collection: "flight_specials",
  fields: "*",
  params: {
    filter: {
      reference: {
        _eq: route.params.ref,
      },
    },
  },
});
definePageMeta({
  layout: "general",
});
flightData = flightData[0];
const bookingSent = ref(false);
import useVuelidate from "@vuelidate/core";
import { required, email, numeric } from "@vuelidate/validators";

const state = reactive({
  full_name: "",
  email: "",
  cell: "",
});
const rules = {
  full_name: {
    required,
  },
  email: {
    required,
    email,
  },
  cell: {
    required,
    numeric,
  },
};
const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};

const showPrompt = ref(false);
const validate = async function () {
  const isFormCorrect = await vl.value.$validate();
  if (!isFormCorrect) {
    showPrompt.value = true;
    return;
  }
  send();
};

const send = async () => {
  global.modalState = {
    imageName: "flight_special_enquiries",
    showConfirmation: true,
    showRef: true,
    headerText: "Thank you for your flight enquiry!",
  };
  let customerFormData = {
    full_name: state.full_name,
    email: state.email,
    cell_number: state.cell,
  };
  let enquiryFormData = {
    // from special:
    ref: route.params.ref,
    airline: flightData.airline,
    departing_airport: flightData.departing_airport,
    destination_airport: flightData.destination_airport,
    ticket_by: flightData.ticket_by,
    duration: flightData.duration,
    valid_from: flightData.valid_from,
    valid_to: flightData.valid_to,
  };

  global.upsertCustomerAddEnquiry(
    customerFormData,
    enquiryFormData,
    "flight_special_enquiries"
  );
};
</script>
