<template>
  <div class="w-full flex flex-col justify-center justify-between">
    <h3 class="pb-8">{{ label }}</h3>
    <div class="text-gray-500 pb-8">
      (add birthdates - dd/mm/yyyy - and press enter}
    </div>

    <Chips
      style="height: 80px"
      class="chips"
      v-model="inputValue"
      placeholder=""
      @keydown="keyDownListen($event)"
      @blur="validationObject.$touch"
    />
    <div class="absolute pointer-events-none flex justify-center w-full">
      <div
        v-show="validationObject.$error"
        class="-translate-y-7 font-medium flex items-center animate__animated animate__headShake text-base text-left text-red-700 bg-stone-50 shadow rounded-2xl p-3 border z-10"
      >
        <div>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  inputName: {
    type: String,
  },
  errorMessage: {
    type: String,
  },
  validationObject: {
    type: Object,
  },
});

const keyDownListen = (e) => {
  if (e.key == "Backspace") {
    return;
  }
  if (!/^[0-9\/]*$/.test(e.key)) {
    e.preventDefault();
  }
};

const inputValue = ref(null);
const emit = defineEmits(["setValue"]);
watch(
  () => inputValue.value,
  (a, b) => {
    emit("setValue", props.inputName, inputValue.value);
  }
);
</script>

<style>
.p-chips-input-token {
  height: 39px;
  border-radius: 15px !important;
  user-select: none;
}
</style>
