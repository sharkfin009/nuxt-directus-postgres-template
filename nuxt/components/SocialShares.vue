<template>
  <div class="fixed inset-0 flex justify-end items-center pointer-events-none">
    <div class="flex flex-col md:w-[90px] text-3x text-white">
      <SocialButton
        class="bg-blue-500 mb-3 pointer-events-auto"
        @click="share('facebook')"
        tabindex="0"
      >
        <IconFacebook class="cursor-pointer ml-[1px] w-4 md:w-8 mr-2" />
      </SocialButton>
      <SocialButton
        class="bg-blue-200 mb-3 pointer-events-auto"
        @click="share('twitter')"
        tabindex="0"
      >
        <IconTwitterWhite class="cursor-pointer ml-[1px] w-5 md:w-8 mr-1" />
      </SocialButton>
      <SocialButton
        class="bg-gray-400 mb-3 pointer-events-auto"
        @click="share('email')"
        tabindex="0"
      >
        <IconEnvelope class="cursor-pointer w-4 ml-[2px] md:w-6 mr-1" />
      </SocialButton>
      <SocialButton
        class="bg-green-500 pointer-events-auto"
        @click="share('whatsapp')"
        tabindex="0"
      >
        <IconWhatsappWhite class="cursor-pointer ml-[2px] w-4 md:w-6 mr-1" />
      </SocialButton>
    </div>
  </div>
</template>
<script setup>
import { useSocialSharing } from "@/composables/socialSharing";
const { share } = useSocialSharing();
</script>
