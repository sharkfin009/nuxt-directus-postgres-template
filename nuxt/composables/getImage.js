import helpers from "@/helpers/packages";
export const useGetImage = (name) => {
  let image = ref(null);
  let error = ref(null);

  const { getItems } = useDirectusItems();

  let res = getItems({
    collection: "images",
    params: {
      fields: helpers.allFieldsPlusImage,
      filter: {
        name: name,
      },
    },
   
  })
    .then((res) => {
      if (!res.length) {
        console.error("no matching image name");
        return null
      }

      image.value = helpers.mapImage(res[0].image)
       
    
    })
    .catch((e) => {
      console.log(e);
      error.value = e;
    });

  return {
    image,
    error,
  };
};
