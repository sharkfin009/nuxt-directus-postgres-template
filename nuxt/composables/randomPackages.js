export const useRandomPackages = () => {
  const packages = ref(null);
  const error = ref(null);

  const config = useRuntimeConfig();
  let now = new Date();

  let query = `
  query{packages(
    pagination:{page:1,pageSize:3}
    ){
        data{
          attributes{
              title
              slug
              ct_ref
           description
           region{
            data{
              attributes{
                name
              }
            }
           }
           country{
            data{
              attributes{
                name
              }
            }
           }
           province{
            data{
              attributes{
                name
              }
            }
           }
           price
           valid_to
           images{
            data{
              attributes{
                url
                alternativeText
              }
            }
           } 
           star_rating
           category{
            data{
              attributes{
                name
              }
            }
           }
           from
          }
        }
      }}
            `;

  fetch(config.strapiUrl + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      packages.value = res.data.packages.data
        .sort(() => Math.random() - 0.5)
        .filter((item) => new Date() < new Date(item.attributes.valid_to));
    })
    .catch((error) => (error.value = error));
  return {
    packages,
    error,
  };
};
