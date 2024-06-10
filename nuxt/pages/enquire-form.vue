<template>
  <div class="bg-slate-50">
    <div class="w-full flex justify-center">
      <div class="w-full md:w-[70vw]">
        <SectionHeading
          heading="Where would you like to go?"
          subheading="We will get right back to you"
          :inverted="false"
        />
        <div
          class="bg-green-avo rounded-xl p-8 lg:p-10 flex flex-col items-evenly justify-evenly"
        >
          <!-- <div class="row-span-full flex justify-center w-full mb-10">
            <input
              @input="toggleTest($event)"
              type="checkbox"
              id="testMode"
              name="testMode"
              style="width: 30px"
            />
            <label for="testMode"
              >DEV TEST MODE: enable to submit test form data without filling
              form</label
            >
          </div> -->
          <div
            class="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:grid-rows-3 pb-10"
          >
            <Input
              v-if="vl.full_name"
              inputName="full_name"
              label="Full Name"
              type="text"
              :validationObject="vl.full_name"
              errorMessage="full name is required"
              placeholder="full name"
              @setValue="setValue"
            />
            <Input
              v-if="vl.email"
              inputName="email"
              label="Email Address"
              type="text"
              :validationObject="vl.email"
              errorMessage="valid email address required"
              placeholder="email"
              @setValue="setValue"
            />
            <Input
              v-if="vl.cell_number"
              inputName="cell_number"
              label="Cell Number"
              type="tel"
              :validationObject="vl.cell_number"
              errorMessage="valid cell no is required"
              placeholder="cell number"
              @setValue="setValue"
            />

            <CTSelect
              class=""
              label="Destination"
              inputName="destination"
              :options="global.destinations.map((item) => item.name).sort()"
              placeholder="anywhere"
              @setValue="setValue"
            />

            <CTSelect
              class=""
              label="Departing From"
              inputName="departing_from"
              :options="airports"
              placeholder="anywhere"
              @setValue="setValue"
            />

            <Input
              v-if="vl.approximate_departure"
              inputName="approximate_departure"
              label="Approximate Departure"
              type="date"
              :validationObject="vl.approximate_departure"
              errorMessage="date is required"
              placeholder="anytime"
              @setValue="setValue"
            />
            <CTSelect
              class="col-span-full"
              label="No of Adults (12 +)"
              inputName="no_of_adults"
              :options="['1', '2', '3', '4', '5', '6', 'large group']"
              @setValue="setValue"
            />

            <ChipsInput
              class="block col-span-full"
              v-if="vl.minors"
              :validationObject="vl.minors"
              @setValue="setValue"
              label="Number of and Ages of Minors (under 12 years)"
              inputName="minors"
              errorMessage="Invalid date/s"
            >
            </ChipsInput>
            <CTSelect
              class="col-span-full"
              label="No of infants (under 02 years)"
              inputName="no_of_infants"
              :options="['0', '1', '2', '3', '4', '5', '6']"
              @setValue="setValue"
            />
            <TextArea
              class="col-span-full"
              v-if="vl.customer_comments"
              inputName="customer_comments"
              :validationObject="vl.customer_comments"
              label="Comment"
              placeholder=""
              @setValue="setValue"
            />
          </div>

          <div class="flex flex-col items-center justify-center">
            <div v-if="!spinnerState">
              <CompuButton @fire="validate" class="bg-lime-500 my-10"
                >send enquiry</CompuButton
              >
            </div>
            <div v-if="showPrompt" class="font-medium text-xl text-red-700">
              Please fill in all required fields correctly
            </div>
            <div
              class="w-full h-[200px] flex justify-center items-center"
              v-if="spinnerState"
            >
              <IconTick class="animate-ping" style="color: #8fc15a" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "general",
});
useHead({
  title: "Enquire form - Computravel",
  meta: [
    { name: "description", content: "Where would you like to go?" },
    { name: "og:description", content: "Where would you like to go?" },
    { name: "og:title", content: "Enquire form - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Where would you like to go?" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Enquire form - Computravel" }
  ],
  htmlAttrs: {
    lang: 'en'
  },
});

import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  alpha,
  alphaNum,
  numeric,
} from "@vuelidate/validators";

const state = reactive({
  full_name: "",
  email: "",
  cell_number: "",
  destination: "",
  departing_from: "",
  approximate_departure: "",
  no_of_adults: "",
  minors: "",
  no_of_infants: "",
  comment: "",
  customer_comments: "",
});
const validPhoneNo = (value) => !/[a-zA-Z]/.test(value) && /[+0-9]/.test(value);
const checkValidDOB = (array) => {
  if (array.length == 0) {
    return true;
  }
  let fails = array.filter((item) => {
    return !/^\d{2}\/\d{2}\/\d{4}$/.test(item);
  }).length;
  console.log(array, fails);

  return fails == 0;
};

const rules = {
  full_name: {
    required,
  },
  email: {
    required,
    email,
  },
  cell_number: {
    required,
    validPhoneNo,
  },
  destination: {},
  departing_from: {},
  no_of_adults: {},
  minors: {
    checkValidDOB,
  },
  no_of_infants: {},
  customer_comments: {},
  approximate_departure: { required },
};

const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};

const airports = [
  "Johannesburg (O.R. Tambo International)",
  "Johannesburg (Lanseria International)",
  "Cape Town (Cape Town International)",
  "Durban (King Shaka International)",
  "Windhoek (Hosea Kutako International)",
  "Lusaka (Lusaka International Airport)",
  "Harare (Robert Gabriel Mugabe International Airport)",
  "Other",
];

const showPrompt = ref(false);
const spinnerState = ref(false);
const validate = async function () {
  const isFormCorrect = await vl.value.$validate();
  if (!isFormCorrect && !testMode.value) {
    showPrompt.value = true;
    return;
  }
  showPrompt.value = false;
  spinnerState.value = true;
  send();
};
const send = async () => {
  global.modalState = {
    imageName: "general_enquiries",
    showConfirmation: true,
    showRef: true,
    headerText: "Thank you for your enquiry!",
    bodyText: "We'll get right back to you",
  };
  let customerFormData = {
    full_name: state.full_name,
    email: state.email,
    cell_number: state.cell_number,
  };

  let enquiryFormData = {
    destination: state.destination,
    approximate_departure: state.approximate_departure,
    departing_from: state.departing_from,
    no_of_adults: state.no_of_adults,
    minors: JSON.stringify(state.minors),
    no_of_infants: state.no_of_infants,
    customer_comments: state.customer_comments,
  };

  if (testMode.value) {
    customerFormData = {
      full_name: "test",
      email: "general@dd.ff",
      cell_number: "1234",
    };
    enquiryFormData = {
      destination: "Africa",
      approximate_departure: "2023-02-10",
      departing_from: "Lusaka (Lusaka International Airport)",
      no_of_adults: 0,
      minors: '["10/22/2010"]',
      no_of_infants: 2,
      customer_comments: "test",
    };
  }
  global.upsertCustomerAddEnquiry(
  customerFormData,
  enquiryFormData,
    "general_enquiries"
  );
};

// get options for destinations
import { useGlobal } from "@/stores/global";
const global = useGlobal();

const testMode = ref(false);
const toggleTest = (e) => {
  console.log(e.target.checked);
  testMode.value = e.target.checked;
};
</script>
