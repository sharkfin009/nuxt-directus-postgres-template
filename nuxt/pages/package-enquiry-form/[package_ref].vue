<template>
  <div class="bg-slate-50 min-h-[100vh]">
    <div
      class="w-full h-[500px] flex justify-center items-center"
      v-if="pending"
    >
      <IconTick class="animate-ping" style="color: #8fc15a" />
    </div>

    <div class="w-full flex justify-center" v-if="!pending">
      <div class="w-full md:w-[70vw]">
        <SectionHeading
          :heading="package_data.title"
          subheading="Thank you for your interest in this package. Please give us some details and we will get right back to you."
          :inverted="false"
        />

        <div
          class="bg-green-avo rounded-xl p-5 lg:p-10 flex flex-col items-evenly justify-evenly"
        >
          <div
            class="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-20 mb-5"
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
              class="col-span-full"
              inputName="cell_number"
              label="Cell Number"
              type="tel"
              :validationObject="vl.cell_number"
              errorMessage="valid cell number is required"
              placeholder="number"
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
              label="approximate departure"
              type="date"
              :validationObject="vl.approximate_departure"
              errorMessage="date is required"
              placeholder="anytime"
              @setValue="setValue"
            />
            <CTSelect
              label="No of Adults (12 +)"
              class="col-span-full"
              inputName="no_of_adults"
              :options="['1', '2', '3', '4', '5', '6', 'large group']"
              @setValue="setValue"
            />
            <ChipsInput
              v-if="vl.minors"
              :validationObject="vl.minors"
              class="col-span-full"
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
          </div>
          <TextArea
            v-if="vl.customer_comments"
            inputName="customer_comments"
            :validationObject="vl.customer_comments"
            label="Comment"
            placeholder=""
            @setValue="setValue"
          />

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
              class="w-full h-[250px] flex justify-center items-center"
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
const route = useRoute();
import { useGlobal } from "@/stores/global";
const global = useGlobal();
const { getItems } = useDirectusItems();
import helpers from "@/helpers/packages";
const packageRef = route.params.package_ref;
let res = await getItems({
  collection: "packages",
  fields: helpers.packageFields,
  params: {
    filter: {
      ct_ref: {
        _eq: packageRef,
      },
    },
  },
});
console.log(res);
// throw 404 if no results
// if (!res?.data.length) {
//   throw new Error("404");
// }

let package_data = res[0];
console.log(package_data.title);
import text from "@/helpers/text";

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
  // destination: "",
  departing_from: "",
  approximate_departure: "",
  no_of_adults: "",
  minors: "",
  no_of_infants: "",
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
  // destination: {},
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
  if (!isFormCorrect) {
    showPrompt.value = true;
    return;
  }
  spinnerState.value = true;
  send();
};

const send = async () => {
  global.modalState = {
    imageName: "package_enquiries",
    showConfirmation: true,
    showRef: true,
    headerText: "Thank you for your enquiry!",
  };
  const customerFormData = {
    full_name: state.full_name,
    email: state.email,
    cell_number: state.cell_number,
  };
  // const customerFormData = [
  //   {
  //     full_name: "test",
  //     email: "package@hh.cc",
  //     cell_number: "test",
  //   },
  // ];
  const enquiryFormData = {
    departing_from: state.departing_from,
    no_of_adults: state.no_of_adults,
    minors: JSON.stringify(state.minors),
    no_of_infants: state.no_of_infants,
    customer_comments: state.customer_comments,
    from: package_data.from,
    to: package_data.to,
    approximate_departure: state.approximate_departure,
    excludes: package_data.excludes,
    includes: package_data.includes,
    price: package_data.price,
    duration: package_data.duration,
    star_rating: package_data.star_rating,
    terms: package_data.terms,
    description: text.ellipsis(package_data.description, 50),
    supplier: package_data.supplier,
    title: package_data.title,
    supplier_ref: package_data.supplier_ref,
    ct_ref: package_data.ct_ref,
    valid_to: package_data.valid_to,
    valid_from: package_data.valid_from,
    includes_flights: package_data.includes_flights,
    includes_all_tax: package_data.includes_all_tax,
    prices_PPS: package_data.prices_PPS,
    CPT_price_in_rands: package_data.CPT_price_in_R,
    JHB_price_in_rands: package_data.JHB_price_in_R,
    DBN_price_in_rands: package_data.DBN_price_in_R,
  };

  // const enquiryFormData = {
  //   departing_from: "test",
  //   no_of_adults: "test",
  //   minors: "["12/22/2101"]",
  //   no_of_infants: "test",
  //   approximate_departure: "2078-03-22",
  //   customer_comments: "test",
  //   from: "2078-03-22",
  //   to: "2078-03-22",
  //   excludes: "test",
  //   includes: "test",
  //   price: 1234,
  //   duration: 33,
  //   star_rating: 3,
  //   terms: "test",
  //   description: "test",
  //   supplier: "test",
  //   title: "test",
  //   ct_ref: "test",
  //   ct_ref: "test",
  //   valid_to: "3944-04-22",
  //   valid_from: "2333-03-22",
  //   includes_flights: false,
  //   includes_all_tax: true,
  //   prices_PPS: false,
  //   CPT_price_in_rands: 33,
  //   JHB_price_in_rands: 33,
  //   DBN_price_in_rands: 334444,
  // };
  global.upsertCustomerAddEnquiry(
    customerFormData,
    enquiryFormData,
    "package_enquiries"
  );
};

// get options for destinations

const destinationOptions = computed(() => {
  let array = global.options.filter((item) => {
    item.name !== "category";
  });
  array.push("Other");
  return array;
});
</script>
