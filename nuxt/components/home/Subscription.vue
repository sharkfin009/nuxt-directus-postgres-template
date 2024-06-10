<template>
  <HomeSectionLayout bgColor="bg-stone-50">
    <div class="grid grid-rows-[min-content,auto,min-content] bg-stone-50">
      <!-- header section -->
      <SectionHeading
        heading="join our mailing list"
        subheading="to receive exciting travel deals"
        :inverted="false"
      />
      <!-- body section -->
      <div
        class="relative flex flex-col justify-center items-center pb-20 md:pb-0"
      >
        <form
          class="bg-green-avo rounded-3xl mt-5 mb-5 w-[280px] md:w-[600px] p-5 flex flex-col gap-5"
        >
          <Input
            v-if="vl.full_name"
            inputName="full_name"
            type="text"
            :validationObject="vl.full_name"
            errorMessage="full name is required"
            placeholder="full name"
            @setValue="setValue"
            class=""
          />
          <Input
            v-if="vl.email"
            inputName="email"
            type="text"
            :validationObject="vl.email"
            errorMessage="valid email is required"
            placeholder="email"
            @setValue="setValue"
          />
        </form>
        <CompuButton @fire="validate" class="bg-lime-500">sign me up</CompuButton>
        <div v-if="showPrompt" class="font-medium text-xl text-red-700">
          Please fill in all required fields
        </div>
      </div>
    </div>
  </HomeSectionLayout>
</template>
<script setup>
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
});
const rules = {
  full_name: {
    required,
  },
  email: {
    required,
    email,
  },
};
const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};
import { useGlobal } from "@/stores/global"
const global = useGlobal()
const showPrompt = ref(false)
const validate = async function () {
  const isFormCorrect = await vl.value.$validate();
  if (!isFormCorrect) {
    showPrompt.value = true;
    return;
  }
  send();
};

const send = async() => {
  showPrompt.value = false

  global.modalState = {
    imageName: "subscribers",
    showConfirmation:true,
    showRef:false,
    headerText:"Thank you for your subscription!",
    bodyText:"We hope you enjoy receiving our news."
  }

  const { createItems } = useDirectusItems();
  let createResponse = await createItems({
    collection:"subscribers",
    items: {
      name: state.full_name,
      email: state.email
    }
  }
)
};
</script>
