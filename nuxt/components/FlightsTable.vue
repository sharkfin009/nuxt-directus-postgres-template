<template>
  <table
    class="w-full font-open-sans font-light text-xs md:text-xl "
  >
    <tbody class="overflow-auto">
      <tr
        v-for="(special, index) in specials"
        :key="index"
      >
        <td class="">
          {{ special.name }}
        </td>
        <td class="hidden lg:table-cell h-full items-center justify-center">
          {{
            new Date(special.valid_from).toLocaleDateString(
              "eng-GB",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )
          }}
          -
          {{
            new Date(special.valid_to).toLocaleDateString("eng-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }}
        </td>
        <td>R{{ special.price }}</td>
        <td class="flex justify-center items-center py-5">
          <NuxtLink
            :to="`/flight-special-enquiry-form/${special.reference}`"
          >
            <CompuButton class="bg-lime-500">
              <span class="">view </span>
            </CompuButton>
          </NuxtLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const { getItems} = useDirectusItems()

 
let specials = await getItems({
  collection: "flight_specials",
  fields:"*"

})

</script>