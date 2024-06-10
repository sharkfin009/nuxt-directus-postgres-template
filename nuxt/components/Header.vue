<template>
  <div class="pointer-events-none w-full z-50 flex flex-col">
    <div
      class="relative flex w-full justify-between px-8 pt-6 pb-4 md:py-8 md:px-16"
    >
      <!--  logo -->
      <div
        class="text-primary cursor-pointer pointer-events-auto bg-green-avo rounded-full shadow pb-1 md:pb-2 w-[150px] md:w-[277px] justify-center flex items-center"
        @click="logoClick"
      >
        <IconComputravelLogo class="h-[30px] md:h-[50px] -mb-1 md:mb-1" alt="Computravel, tour portal to the travel experts" aria-label="Computravel logo" role="img" />
      </div>

      <div
        class=" ml-3 hidden md:flex items-center pointer-events-auto md:w-[400px]"
        v-if="global.options"
        role="searchbox"
        aria-label="Search for a destination or package"
      >
        <SearchBar v-if="route.path !== '/'" :parent="'header'" />
      </div>

      <div class="flex pointer-events-auto" v-if="global.options">
      <slot />
        <div class="relative flex justify-center md:w-[210px]">
          <NuxtLink class="" to="/enquire-form">
            <div
              class="relative h-full   w-[100px] flex justify-center"
              v-if="route.path !== '/enquire-form'"
            >
              <CompuButton class="!text-center inset-0 bg-lime-500 !h-full"
                >enquire
                <span class="hidden md:block">&nbsp;now</span></CompuButton
              >
            </div>
          </NuxtLink>
        </div>
        <!-- hamburger -->
        <div
          @click.stop="showMenu"
          class="z-100 flex justify-center items-center bg-green-avo rounded-full shadow flex w-[52px] h-[52px] md:w-[69px] md:h-[69px] cursor-pointer z-10 hover:bg-lime-100 transition duration-300"
          :class="{
            'opacity-0': global.showMenu == true,
          }"
          tabindex="0"
        >
          <IconHamburger class="w-8 text-stone-600 text-2xl md:text-2xl" />
        </div>
        <transition name="fade">
          <Menu v-show="global.showMenu" />
        </transition>
      </div>
    </div>
    <!-- mobile search bar -->
    <div
      v-if="route.path !== '/'"
      class="block md:hidden w-full flex justify-evenly items-center pb-4 px-8"
    >
      <SearchBar class="" :parent="'header'" />
    </div>

    <!-- MODALs -->

    <transition name="fade">
      <ConfirmModal v-if="global.modalState.showConfirmation">
        <template #header> Thank you for your enquiry! </template>
        <template #body>
          One of our travel experts will be in touch soon.</template
        >
      </ConfirmModal>
    </transition>

    <SocialShares />
  </div>
</template>

<script setup>
import { useGlobal } from "@/stores/global";
const global = useGlobal();
const route = useRoute();
const emit = defineEmits(["scrollButton"]);
const scrollButton = (target) => {
  console.log("target in Header", target);
  global.showMenu = false;
  emit("scrollButton", target);
};
const showMenu = () => {
  global.showMenu = true;
};

const enquirySent = () => {
  return localStorage.getItem("enquiry-sent");
};

const logoClick = () => {
  if (route.path !== "/") {
    navigateTo("/");
  } else {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
};
</script>
