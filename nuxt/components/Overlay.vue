<template>
    <Transition name="fade">
<div class="fixed inset-0 bg-black bg-opacity-50 z-10" v-if="global.showShadow" ></div>
    </Transition>
</template>

<script setup>
import { useGlobal } from "@/stores/global";
const global = useGlobal();


</script>