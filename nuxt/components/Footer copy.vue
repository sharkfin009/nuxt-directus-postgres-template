<template>
  <div
    class="font-open-sans md:pt-20 grid grid-rows-[auto,auto,auto] gap-3 bg-slate-800 text-white px-10 md:px-14 pt-24 pb-12 text-base"
    role="Footer"
  >
    <div class="sm:grid sm:grid-cols-2 gap-3">
      <div class="flex flex-col justify-center gap-10 lg:pr-20">
        <h3 class="font-titillium text-5xl">about computravel</h3>
        <p class="max-w-[400px]">
          Computravel serves as an online South African travel agent, boasting
          highly professional experts with years in the tourism and hospitality
          industries.
        </p>
      </div>

      <a href="/asata" target="blank" class="hover:text-lime-500 active:text-lime-500">
        <div v-if="asataImage">
          <div class="flex justify-center items-center py-10 md:py-0 h-[300px]">
            <nuxt-img
              sizes="sm:100vw md:20vw"
              width="300px"
              height="300px"
              :src="asataImage.url"
              :alt="asataImage.altText"
              aria-label="ASATA logo"
              provider="directus"
              fit="cover"
            >
            </nuxt-img>
          </div>
        </div>
      </a>
    </div>
    <!-- 3rd row -->
    <div class="grid sm:grid sm:grid-cols-2 gap-3">
      <div class="">
        <h3 class="font-titillium text-5xl pb-5">contact us</h3>
        <div class="grid lg:grid lg:grid-cols-2 gap-6 md:gap-3">
          <div class="" role="Telephone number">
            T: +27 (021) 762-0511
          </div>

          <div role="Email addresses">
            <address>
              <a
                to=""
                class="cursor-pointer hover:text-lime-500 active:text-lime-500"
                href="mailto:info@computravel.co.za"
                target="blank"
              >info@computravel.co.za</a><br />
              <a
                to=""
                class="cursor-pointer hover:text-lime-500 active:text-lime-500"
                href="mailto:enquiry@computravel.co.za"
                target="blank"
              >enquiry@computravel.co.za</a>
            </address>
          </div>

          <div class="flex justify-start items-center" role="Enquiry">
              <NuxtLink to="/enquire-form">
                <CompuButton class="bg-lime-500" target="blank"
                  >enquire now</CompuButton
                >
              </NuxtLink>
          </div>
          <div class="flex justify-start items-center" role="Social media links">
            <a
              href="https://www.facebook.com/Computravel/"
              target="blank"
              class="cursor-pointer w-14 h-14 mr-5"
              aria-label="Link to Computravel Facebook page"
            >
              <IconFacebook class="cursor-pointer w-14 h-14" />
            </a>
            <a
              href="https://twitter.com/computravel"
              target="blank"
              class="cursor-pointer w-14 h-14 mr-5"
              aria-label="Link to Computravel Twitter page"
            >
              <IconTwitterWhite class="cursor-pointer w-14 h-14" />
            </a>
            <a
              href="https://www.instagram.com/computravel/?hl=en"
              target="blank"
              class="cursor-pointer w-14 h-14 mr-5"
              aria-label="Link to Computravel Instagram page"
            >
              <IconInstagram class="cursor-pointer w-14 h-14 mr-5" />
            </a>
          </div>
        </div>
      </div>
      <div class="grid lg:grid lg:grid-cols-2 gap-3">
        <div class="flex flex-col justify-end" role="Legal pages links">
          <div class="">
            <h4 class="font-bold mb-4">legal</h4>
          </div>
          <nav aria-label="legal navigation">
            <ul class="list-none">
              <NuxtLink to="/covid-19" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">sacoronavirus.co.za</li>
              </NuxtLink>
              <NuxtLink to="/terms-and-conditions" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">Terms And Conditions</li>
              </NuxtLink>
              <NuxtLink to="/disclaimer" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">Disclaimer</li>
              </NuxtLink>
              <NuxtLink to="/fraud-prevention-policy" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">Fraud Prevention Policy</li>
              </NuxtLink>
              <!-- <NuxtLink to="section-51-PAIA-manual">
                <li>Section 51 PAIA Manual</li>
              </NuxtLink> -->
            </ul>
          </nav>
        </div>
        <div class="flex flex-col justify-end" role="Privacy and cookie policy links">
          <div class="flex items-center">
            <h4 class="font-bold mb-4">data, privacy and more</h4>
          </div>
          <nav aria-label="data, privacy, cookie policy, FAQs and travel tips navigation">
            <ul class="list-none text-base">
              <NuxtLink to="/privacy-policy" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">Privacy Policy</li>
              </NuxtLink>
              <NuxtLink to="cookie-policy" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">Cookie Policy</li>
              </NuxtLink>
              <!-- <NuxtLink to="careers" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">Careers</li>
              </NuxtLink> -->
              <NuxtLink to="faqs" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">FAQs</li>
              </NuxtLink>
              <NuxtLink to="/travel-tips" target="blank" class="hover:text-lime-500 active:text-lime-500">
                <li class="sm:my-1 md:my-0 my-2">Travel Tips</li>
              </NuxtLink>
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