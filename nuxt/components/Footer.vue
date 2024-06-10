<template>
  <div
    class="font-open-sans md:pt-20 grid grid-rows-[auto,auto,auto] gap-3 bg-slate-800 text-white px-10 md:px-14 pt-24 pb-12 text-base"
  >
    <div class="sm:grid sm:grid-cols-2 gap-3">
      <div
        class="flex flex-col justify-center gap-10 lg:pr-20"
        role="contentinfo"
        aria-label="Information about Computravel"
      >
        <h3 class="font-titillium text-4xl">about computravel</h3>
        <p class="max-w-[400px]">
          Computravel serves as an online South African travel agent, boasting
          highly professional experts with years in the tourism and hospitality
          industries.
        </p>
      </div>

      <a href="/asata" target="blank" tabindex="0">
        <div v-if="asataImage">
          <div class="flex justify-center items-center py-10 md:py-0 h-[300px]">
            <nuxt-img
              sizes="sm:100vw md:20vw"
              width="300px"
              height="300px"
              :src="asataImage.url"
              :alt="
                asataImage.altText
                  ? asataImage.altText
                  : 'ASATA - Southern African Travel Agents'
              "
              :aria-label="
                asataImage.altText
                  ? asataImage.altText
                  : 'ASATA - Southern African Travel Agents'
              "
              provider="directus"
              fit="cover"
              loading="lazy"
            >
            </nuxt-img>
          </div>
        </div>
      </a>
    </div>
    <!-- 3rd row -->
    <div class="grid sm:grid sm:grid-cols-2 gap-3">
      <div class="">
        <h3 class="font-titillium text-4xl pb-5">contact us</h3>
        <div class="grid lg:grid lg:grid-cols-2 gap-6 md:gap-3">
          <div
            class=""
            role="Telephone number"
            aria-label="The Computravel telephone number is +27 (021) 762-0511"
          >
            <a
              to=""
              class="cursor-pointer hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
              href="tel:+27217620511"
              tabindex="0"
              >T: +27 (021) 762-0511</a
            >
          </div>

          <div role="list" aria-label="Email addresses">
            <address>
              <a
                to=""
                class="cursor-pointer hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                href="mailto:info@computravel.co.za"
                target="blank"
                tabindex="0"
                role="listitem"
                aria-role="Email address for information"
                >info@computravel.co.za</a
              ><br />
              <a
                to=""
                class="cursor-pointer hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                href="mailto:enquiry@computravel.co.za"
                target="blank"
                tabindex="0"
                role="listitem"
                aria-label="Email address for enquiry"
                >enquiry@computravel.co.za</a
              >
            </address>
          </div>

          <div
            class="flex justify-start items-center md:py-5 lg:py-0"
            role="navigation"
            aria-label="Button to the enquiry form"
          >
            <NuxtLink to="/enquire-form" tabindex="0">
              <CompuButton class="bg-lime-500" target="blank"
                >enquire now</CompuButton
              >
            </NuxtLink>
          </div>
          <div
            class="flex justify-start items-center"
            role="navigation"
            aria-label="Social media links"
          >
            <a
              href="https://www.facebook.com/Computravel/"
              target="blank"
              class="cursor-pointer w-14 h-14 mr-5"
              role="navigation"
              aria-label="Link to Computravel Facebook page"
              tabindex="0"
            >
              <IconFacebook
                class="cursor-pointer w-14 h-14"
                loading="lazy"
                alt="Computravel Facebook page"
              />
            </a>
            <a
              href="https://twitter.com/computravel"
              target="blank"
              class="cursor-pointer w-14 h-14 mr-5"
              role="navigation"
              aria-label="Link to Computravel Twitter page"
              tabindex="0"
            >
              <IconTwitterWhite
                class="cursor-pointer w-14 h-14"
                loading="lazy"
                alt="Computravel Twitter page"
              />
            </a>
            <a
              href="https://www.instagram.com/computravel/?hl=en"
              target="blank"
              class="cursor-pointer w-14 h-14 mr-5"
              role="navigation"
              aria-label="Link to Computravel Instagram page"
              tabindex="0"
            >
              <IconInstagram
                class="cursor-pointer w-14 h-14 mr-5"
                loading="lazy"
                alt="Computravel Instragram page"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="grid lg:grid lg:grid-cols-2 gap-3">
        <div
          class="flex flex-col /*justify-end*/ pb-5 md:pb-5 lg:pb-0"
          role="navigation"
          aria-label="Legal documents links"
        >
          <div
            class="text-4xl sm:text-4xl md:text-4xl lg:text-3xl 2xl:text-4xl"
          >
            <h3 class="font-titillium text-4xl mb-4">legal</h3>
          </div>
          <nav aria-label="Legal navigation">
            <ul
              class="list-none"
              role="list"
              aria-label="Legal documents links"
            >
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="/covid-19"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  >sacoronavirus.co.za</NuxtLink
                >
              </li>
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="/terms-and-conditions"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  role="navigation"
                  >Terms And Conditions</NuxtLink
                >
              </li>
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="/disclaimer"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  >Disclaimer</NuxtLink
                >
              </li>
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="/fraud-prevention-policy"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  >Fraud Prevention Policy</NuxtLink
                >
              </li>
              <!-- <li>
                <NuxtLink to="section-51-PAIA-manual" tabindex="0">Section 51 PAIA Manual</NuxtLink>
              </li> -->
            </ul>
          </nav>
        </div>
        <div class="flex flex-col /*justify-end*/" role="navigation">
          <h3 class="font-titillium text-4xl mb-4">data, privacy and more</h3>
          <nav aria-label="data, privacy, cookie policy, FAQs and travel tips navigation">
            <ul class="list-none text-base" role="list">
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="/privacy-policy"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  >Privacy Policy</NuxtLink
                >
              </li>
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="cookie-policy"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  >Cookie Policy</NuxtLink
                >
              </li>
              <!-- <li class="sm:my-1 md:my-0 my-2">
                <NuxtLink to="careers" class="hover:text-lime-500 active:text-lime-300" tabindex="0">Careers</NuxtLink>
              </li> -->
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="faqs"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  >FAQs</NuxtLink
                >
              </li>
              <li class="sm:my-1 md:my-0 my-2" role="listitem">
                <NuxtLink
                  to="/travel-tips"
                  target="blank"
                  class="hover:text-lime-500 active:text-lime-300 contrast-100 hover:contrast-200 active:contrast-200"
                  tabindex="0"
                  >Travel Tips</NuxtLink
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="bg-slate-800 flex justify-center p-5">
      <div class="text-center text-sm">
        Website custom coded by Ben Amato, design by
        <i>hippl</i>
      </div>
    </div>
  </div>
</template>

<script setup>
// const { share } = useSocialSharing();

const { image: asataImage, imageError } = useGetImage("asata-logo");
</script>

<style>
address {
  font-style: normal;
}
</style>
