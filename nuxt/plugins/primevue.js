import PrimeVue from "primevue/config";
import Chips from "primevue/chips";
import Skeleton from 'primevue/skeleton';


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component("Chips", Chips)
});
