<template>
  <private-view
    :title="'Enquiries Portal: ' + user.first_name + ' ' + user.last_name"
  >
    <template v-slot:navigation>
      <v-card-title style="text-align: center"> Customers: </v-card-title>
      <v-list>
        <v-list-item v-for="(customer, index) in customers" :key="index">
          <v-list>
            {{ customer.full_name }}
            <table>
              <tr
                v-for="(enq, eIndex) in customer.enquiries"
                :key="eIndex"
                v-on:click="selectEnquiry(customer.email, eIndex)"
              >
                <td>
                  <v-list-item class="enquiryItem">
                    {{ eIndex + 1 + " " + enq.label + " " }}
                  </v-list-item>
                </td>
                <td width="15">
                  <v-icon
                    v-if="
                      selectedCustomer.email == customer.email &&
                      selectedEnquiry.id == enq.id
                    "
                    name="check"
                    x-small
                  />
                </td>
              </tr>
            </table>
          </v-list>
        </v-list-item>
      </v-list>
    </template>
    <div class="mb">
      <transition-expand>
        <v-sheet class="hp" v-if="selectedEnquiry !== {}">
          <v-table
            class="mb"
            :headers="[
              {
                text: 'Customer Name',
                value: 'name',
              },
              {
                text: 'Phone Number',
                value: 'cell_number',
              },
              {
                text: 'Email',
                value: 'email',
              },
            ]"
            :items="[
              {
                name: selectedCustomer.full_name,
                cell_number: selectedCustomer.cell_number,
                email: selectedCustomer.email,
              },
            ]"
          />

          <h1
            style="text-align: center; font-size: 20px; color: green"
            class="mb"
          >
            {{
              selectedEnquiry.label
                ? selectedEnquiry.label.toUpperCase()
                : "ENQUIRY"
            }}
          </h1>

          <h4 class="mb">My comments on this enquiry:</h4>
          <form class="form">
            <v-textarea
              class="mb"
              @keyup="setDirty"
              v-model="selectedEnquiry.consultant_comments"
            />

            <h4 class="mb">Enquiry Status:</h4>
            <v-select
              style="margin-bottom: 30px"
              block="true"
              v-model="selectedEnquiry.status"
              class="mb"
              @click="setDirty"
              :items="[
                {
                  text: 'Current',
                  value: 'current',
                },
                {
                  text: 'Unresolved',
                  value: 'unresolved',
                },
                {
                  text: 'Resolved',
                  value: 'resolved',
                },
              ]"
            />
            <h4 style="padding-top: 30px" class="mb">Completed:</h4>
            <v-checkbox
              class="mb"
              v-model="selectedEnquiry.completed"
              label="Completed"
              block="true"
              @click="setDirty"
            />
            <div
              style="
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: center;
              "
            >
              <v-button v-show="formDirty" @click="submit" class="mt-5"
                >Save Changes</v-button
              >
            </div>
          </form>

          <div>
            <h1
              style="font-size: 20px; color: green; text-align: center"
              class="mb text-center w-full"
            >
              ENQUIRY DETAILS
            </h1>
            <table class="w-100 mb">
              <tr
                v-for="(row, index) of getEnquiryPropsAsArray(selectedEnquiry)"
                :key="index"
              >
                <td class="w-25">{{ row.property }}</td>
                <td>{{ row.value }}</td>
              </tr>
            </table>
          </div>
        </v-sheet>
      </transition-expand>
      <v-transition v-if="selectedEnquiry === {}">
        <v-sheet class="hp"> loading... </v-sheet>
      </v-transition>
    </div>
  </private-view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useApi } from "@directus/extensions-sdk";
const api = useApi();

const customers = ref({});
const selectedCustomer = ref({});
const selectedEnquiry = ref({});
const user = ref({});
const formDirty = ref(false);

const setDirty = () => {
  formDirty.value = true;
};

const submit = async () => {
  api
    .patch(
      `./items/${selectedEnquiry.value.collection}/${selectedEnquiry.value.id}`,
      {
        consultant_comments: selectedEnquiry.value.consultant_comments,
        completed: selectedEnquiry.value.completed,
        enquiry_status: selectedEnquiry.value.enquiry_status,
      }
    )
    .then((res) => {
      formDirty.value = false;
    });
};

const selectEnquiry = async (email, enquiryIndex) => {
  selectedCustomer.value = await customers.value.find(
    (item) => item.email == email
  );
  selectedEnquiry.value = await selectedCustomer.value.enquiries[enquiryIndex];
  console.log("selected enquiry: ", selectedEnquiry.value);
  formDirty.value = false;
};

const getEnquiryPropsAsArray = (enq) => {
  let result = Object.entries(enq)
    .filter(
      (pair) =>
        ![
          "id",
          "status",
          "sort",
          "enquiry",
          "completed",
          "consultant_comments",
          "enquiry_status",
          "package_enquiry",
          "group_enquiry",
          "flight_special_enquiry",
        ].includes(pair[0])
    )
    .map((pair) => ({
      property: titleCase(pair[0]),
      value: pair[1],
    }));

  return result;
};

const titleCase = (s) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : " " + d.toUpperCase()
  );

onMounted(async () => {
  await api.get("users/me").then((res) => {
    user.value = res.data.data;
  });

  if (user.value.role == "a1f3596d-9627-4257-890d-07aa217083e5") {
    await api
      .get(`/items/customers?filter[consultant][_eq]=${user.value.id}&fields=*`)
      .then((res) => {
        customers.value = res.data.data;
      });
  } else {
    await api.get(`/items/customers?fields=*`).then((res) => {
      customers.value = res.data.data;
    });
  }

  let enquiryTypes = [
    {
      label: "General Enquiry",
      collection: "enquiries",
    },
    {
      label: "Package Enquiry",
      collection: "package_enquiries",
    },
    {
      label: "Group Enquiry",
      collection: "group_enquiries",
    },
    {
      label: "Flight Special Enquiry",
      collection: "flight_special_enquiries",
    },
    {
      label: "Contact Us Enquiry",
      collection: "contact_enquiries",
    }
  ];

  for (let customer of customers.value) {
    let enqs = [];
    for (let enquiryType of enquiryTypes) {
      let res = await getEnquiry(enquiryType, customer.email);
      if (res) {
        enqs.push(res);
        customer.enquiries = enqs.flat() ?? [];
        selectedEnquiry.value = enqs.flat()[0] ?? [];
      }
    }
  }
});

const getEnquiry = async (enquiryType, customerEmail) => {
  let res = await api.get(
    `/items/${enquiryType.collection}?filter[customer][_eq]=${customerEmail}`
  );
  let result = res.data.data;
  if (result.length) {
    result = result.map((item) => {
      return {
        label: enquiryType.label,
        collection: enquiryType.collection,
        ...item,
      };
    });
    return result;
  }
};
</script>

<style>
.hp {
  /* --v-sheet-padding: 50px; */
  padding-left: 50px !important;
  padding-right: 50px !important;
}
.w-100 {
  width: 100%;
}
.w-25 {
  width: 25% !important;
}
.v-table {
  /* pointer-events: none; */
  margin-top: 30px;
}
.mb {
  margin-bottom: 30px !important;
}
.mt {
  margin-top: 10px !important;
}
.fl-right {
  float: right;
}
.enquiryItem {
  cursor: pointer;
}
.enquiryItem:hover {
  color: green;
}
.flex {
  display: flexbox !important;
}
.center {
  text-align: center !important;
}
.iconColor {
  color: green;
}
</style>
