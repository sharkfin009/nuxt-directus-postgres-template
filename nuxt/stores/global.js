import { defineStore } from "pinia";

export const useGlobal = defineStore("global", {
  state: () => ({
    showMenu: false,
    options: null,
    homePageScroll: null,
    modalState: {
      showConfirmation: false,
      imageName: null,
      showRef: false,
      headerText: null,
      bodyText: "One of our travel experts will be in touch soon.",
    },
    enquiryRef: null,
    test: false,
    homepageRenderOrder: 0,
    homePageComponents: ["menu"],
    randomSearchResults: [],
    showShadow: false,
    welcomeCarouselLoaded: false,
  }),
  getters: {
    destinations(state) {
      return this.options
        .filter((item) => item.type !== "category")
        .sort((a, b) => {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
    },
    categories(state) {
      return this.options
        .filter((item) => item.type == "category")
        .sort((a, b) => {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
    },
  },

  actions: {
    async upsertCustomerAddEnquiry(
      customerFormData,
      enquiryFormData,
      enquiryType
    ) {
      const self = this;
      this.enquiryRef = Math.floor(Math.random() * 10000000000);
      enquiryFormData.ref = this.enquiryRef;
      console.log("enquiryFormData", enquiryFormData);
      // check if customer is on directus:
      const { getItems, createItems } = useDirectusItems();
      let customer = await getItems({
        collection: "customers",
        params: {
          filter: {
            email: customerFormData.email,
          },
        },
      });
      // get first consultant in queue:
      const { getUsers } = useDirectusUsers();
      const { updateItems } = useDirectusItems();
      let [firstConsultant] = await getUsers({
        params: {
          filter: {
            queue_placing: 1,
            role: "a1f3596d-9627-4257-890d-07aa217083e5",
          },
        },
      });
      console.log("firstConsultant", firstConsultant);
      // if customer doesnt exist, create them, and assign them to first consultant in queue:
      if (!customer) {
        try {
          customer = await createItems({
            collection: "customers",
            items: {
              ...customerFormData,
              consultant: {
                id: firstConsultant.id,
              },
            },
          });
        } catch (e) {
          console.log(e);
        }

        // get all consultants
        const consultants = await getUsers({
          params: {
            filter: {
              role: "a1f3596d-9627-4257-890d-07aa217083e5",
            },
          },
        });
        console.log("consultants", consultants);
        // rotate the queue positions:
        const { updateUser } = useDirectusUsers();
        consultants.forEach((consultant, index) => {
          let newPlacement = index + 1;
          if (newPlacement == consultants.length) {
            newPlacement = 0;
          }
          updateUser({
            id: consultant.id,
            user: {
              queue_placing: newPlacement,
            },
          });
        });
        //
      }

      // create the enquiry, linked to the customer
      const config = useRuntimeConfig();
      const url = config.directusUrl + `/items/${enquiryType}`;
      const {
        data: enquiry,
        pending,
        error,
      } = await useLazyFetch(url, {
        method: "post",
        headers: {
          Authorization: "Bearer " + config.directusToken,
          "Content-Type": "application/json",
        },
        body: {
          ...enquiryFormData,
          customer: {
            email: customerFormData.email,
          },
        },

        onResponse({ request, response, options }) {
          // Process the response data
          console.log("request", request);
          console.log("response", response);

          if (response.status !== 200) {
            this.modalState = {
              imageName: "package_enquiries",
              showConfirmation: true,
              showRef: true,
              headerText:
                "Oops, we're sorry. There was a problem. Please try again!",
              bodyText: "",
            };
          }
        },

        onResponseError({ request, response, options }) {
          // Handle the response errors
          alert("oops, there was a problem, please contact us or try again");
          navigateTo("/");
          console.log(response);
        },
      });
      console.log("enquiry", enquiry.value, "error", error.value);
      // get image for email:
      let imageResult = await getItems({
        collection: "images",
        params: {
          filter: {
            name: enquiryType + "_confirmation",
          },
        },
      });

      // send request to backend emails endpoint
      const { data: emailsResult } = await useLazyFetch(
        config.directusUrl + `/enquiry_emails/send`,
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + config.directusToken,
            "Content-Type": "application/json",
          },
          body: {
            enquiryFormData,
            customerFormData,
            enquiryType,
            enquiryRef: this.enquiryRef,
            consultant:
              firstConsultant.first_name + " " + firstConsultant.last_name,
            imageUrl: "",
            // imageURL: config.directusUrl + "/assets/" + imageResult[0].image,
          },

          onResponse({ request, response, options }) {
            // Process the response data
            console.log("endp request", request);
            console.log("endp response", response);

            if (response.status !== 200) {
              this.modalState = {
                imageName: "package_enquiries",
                showConfirmation: true,
                showRef: true,
                headerText:
                  "Oops, we're sorry. There was a problem. Please try again!",
                bodyText: "",
              };
            }
          },

          onResponseError({ request, response, options }) {
            // Handle the response errors
            alert("oops, there was a problem, please contact us or try again");
            navigateTo("/");
            console.log(response);
          },
        }
      );
      console.log("emailsResult", emailsResult);
    },
  },
});
