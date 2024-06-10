<template>
  <div
    class="bg-green-avo rounded-xl p-5 md:p-10 flex flex-col items-evenly justify-evenly"
  >
    <div
      class="flex flex-col grid-rows-3 pb-10 gap-8 md:grid md:grid-cols-2 md:gap-10"
    >
      <Input
        v-if="$v.full_name"
        inputName="full_name"
        label="Full Name"
        type="text"
        :validationObject="$v.full_name"
        errorMessage="full name is required"
        placeholder="full name"
        @setValue="setValue"
      />
      <Input
        v-if="$v.email"
        inputName="email"
        label="Email Address"
        type="text"
        :validationObject="$v.email"
        errorMessage="valid email required"
        placeholder="email"
        @setValue="setValue"
      />
      <Input
        v-if="$v.cell_number"
        inputName="cell_number"
        label="Cell Number"
        type="text"
        :validationObject="$v.cell_number"
        errorMessage="please add valid cell no"
        placeholder="number"
        @setValue="setValue"
      />
      <Input
        v-if="$v.company"
        inputName="company"
        label="Company Name"
        type="text"
        :validationObject="$v.company"
        errorMessage=""
        placeholder=""
        @setValue="setValue"
      />
      <Input
        v-if="$v.group"
        inputName="group"
        label="Group Name"
        type="text"
        :validationObject="$v.group"
        errorMessage=""
        placeholder=""
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
        class="col-span-full"
        label="Departing From"
        inputName="from_where"
        :options="airports"
        placeholder="anywhere"
        @setValue="setValue"
      />

      <Input
        v-if="$v.approximate_departure"
        inputName="approximate_departure"
        label="Approximate Departure"
        type="date"
        :validationObject="$v.approximate_departure"
        errorMessage="Required"
        placeholder="anytime"
        @setValue="setValue"
      />

      <CTSelect
        label="No of Adults (12 +)"
        inputName="no_of_adults"
        :options="['1', '2', '3', '4', '5', '6', 'large group']"
        @setValue="setValue"
      />
      <CTSelect
        label="Travel Insurance"
        inputName="travel_insurance"
        :options="['yes', 'no']"
        @setValue="setValue"
      />

      <Input
        v-if="$v.budget_per_person"
        inputName="budget_per_person"
        label="Budget per person"
        type="text"
        :validationObject="$v.budget_per_person"
        placeholder="eg R5000 per person"
        @setValue="setValue"
      />
    </div>
    <!-- textareas -->
    <TextArea
      v-if="$v.room_requirements"
      inputName="room_requirements"
      label="Room Requirements"
      :validationObject="$v.room_requirements"
      errorMessage=""
      placeholder=""
      @setValue="setValue"
    />
    <TextArea
      v-if="$v.meal_plan"
      inputName="meal_plan"
      label="Meal Plan"
      :validationObject="$v.meal_plan"
      errorMessage=""
      placeholder=""
      @setValue="setValue"
    />
    <TextArea
      v-if="$v.conference_requirements"
      inputName="conference_requirements"
      label="Conference Requirements"
      :validationObject="$v.conference_requirements"
      errorMessage="date is required"
      placeholder=""
      @setValue="setValue"
    />

    <TextArea
      v-if="$v.tours"
      inputName="tours"
      label="Tours"
      :validationObject="$v.tours"
      errorMessage="date is required"
      placeholder=""
      @setValue="setValue"
    />
    <TextArea
      v-if="$v.additional_info"
      inputName="additional_info"
      label="Additional Information"
      :validationObject="$v.additional_info"
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
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, email, numeric } from "@vuelidate/validators";
import { useGlobal } from "@/stores/global";
const global = useGlobal();

const state = reactive({
  full_name: "",
  email: "",
  cell_number: "",
  company: "",
  group: "",
  destination: "",
  from_where: "",
  approximate_departure: "",
  no_of_adults: "",
  budget_per_person: "",
  room_requirements: "",
  meal_plan: "",
  conference_requirements: "",
  tours: "",
  additional_info: "",
  comment: "",
  travel_insurance: "",
});
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
    numeric,
  },
  company: {},
  group: {},
  destination: {},
  from_where: {},
  budget_per_person: {},
  room_requirements: {},
  no_of_adults: {},
  meal_plan: {},
  approximate_departure: { required },
  conference_requirements: {},
  tours: {},
  additional_info: {},
  comment: {},
};
const $v = useVuelidate(rules, state);
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
];

const { $graphql } = useNuxtApp();
const response = ref("");
const packages = ref([]);
let ids = [];
const titles = ref([]);
let list = "";

const showPrompt = ref(false);
const spinnerState = ref(false);
const validate = async function () {
  const isFormCorrect = await $v.value.$validate();
  // uncomment for testing:
  // if (!isFormCorrect) {
  //   showPrompt.value = true;
  //   alert("p");
  //   return;
  // }
  spinnerState.value = true;
  send();
};
const send = async () => {
  global.modalState = {
    imageName: "group_enquiries",
    showConfirmation: true,
    showRef: true,
    headerText: "Thank you for your enquiry!",
  };
  const customerFormData = {
    full_name: state.full_name,
    email: state.email,
    cell_number: state.cell_number,
  };

  const enquiryFormData = {
    company: state.company,
    group: state.group,
    from_where: state.from_where,
    no_of_adults: state.no_of_adults,
    budget_per_person: state.budget_per_person,
    room_requirements: state.room_requirements,
    meal_plan: state.meal_plan,
    conference_requirements: state.conference_requirements,
    tours: state.tours,
    customer_comments: state.additional_info,
    travel_insurance: state.travel_insurance,
    approximate_departure: state.approximate_departure,
  };

  // const customerFormData = {
  //   full_name: "name",
  //   email: "group@ee.dssd",
  //   cell_number: "1345",
  // };
  // const enquiryFormData = {
  //   company: "test",
  //   group: "test",
  //   from_where: "test",
  //   no_of_adults: 2,
  //   approximate_departure: "2033-03-22",
  //   budget_per_person: 2,
  //   room_requirements: "test",
  //   meal_plan: "test",
  //   conference_requirements: "test",
  //   tours: "test",
  //   customer_comments: "test",
  //   travel_insurance: "test",
  // };

  global.upsertCustomerAddEnquiry(
    customerFormData,
    enquiryFormData,
    "group_enquiries"
  );
};
</script>
