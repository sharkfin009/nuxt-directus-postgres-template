import { defineStore } from "pinia";
import { useAutoSuggestStore } from "@/stores/autoSuggest";
import {useGlobal } from "@/stores/global";

import helpers from "@/helpers/packages";

export const useStore = defineStore("search", {
  state: () => ({
    noMoreResults: false,
    firstLoad: true,
    results: [],
    loadingState: true,
    allPackageIds: [],
    pickedRandomResults: [],
    //filters:
    destination: { name: null, type: null },
    category: {
      name: null,
      type: null,
    },
    from_date: null,
    to_date: null,
    price_min: 0,
    price_max: 100000,
    sortBy: { name: "Price low to high", type: null, value: "priceInc" },
    showFilters: false,
    queryString: null,
    page: 1,
    batchLoadingState: false,
    rnd: 0,
  }),
  actions: {
    async fireQuery(adding = false) {
    
      console.log("fireQuery");
      const router = useRouter()
      const global = useGlobal();
      global.showShadow = false

// store the query in the url
let params  = this.returnParams()
      router.push({ query:  params });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      // this.firstLoad = false;
      if (adding == true) {
        this.batchLoadingState = true;
      } else {
        this.page = 1;
      }
      this.pickedRandomResults = [];
      if (!adding) {
      this.loadingState = true;
      }
      // set up filter
      let filter = {
        status: {
          _eq: "published",
        }
      };
      if(this.price_min && this.price_max) {
        price: {
          _between: [this.price_min, this.price_max]
        }
      }
      if (this.queryString) {
        filter["_or"] = [
          {
            description: {
              _icontains: this.queryString,
            },
            title: {
              icontains: this.queryString,
            },
          },
        ];
      }
      if (this.destination.name) {
        filter[this.destination.type] = {
          name: {
            _icontains: this.destination.name,
          },
        };
      }

      if (this.category.name) {
        filter.category = {
          name: {
            _icontains: this.category.name,
          },
        };
      }
      if (this.from_date) {
        filter.from = {
          _gte: this.from_date,
        };
      }

      if (this.to_date) {
        filter.to = {
          _lte: this.to_date,
        };
      }
      const { getItems } = useDirectusItems();
      let sort = "";
      if(this.sortBy.value != ""){}
      if (this.sortBy.value == "priceInc") {
        sort = "price";
      } else if (this.sortBy.value == "priceDesc") {
        sort = "-price";
      } else {
        sort = "price";
      }
      let res = await getItems({
        collection: "packages",
        params: {
          // limit: 12,
          page: this.page,
          fields: helpers.packageFields,
          filter: filter,
          sort: sort,
        },
      });

      if (!res.length) {
        console.log("->", res);
        this.loadingState = false;

        this.firstLoad = false;
        this.results = [];
      }
      if (res.length < 12) {
        this.noMoreResults = true;
      }
      if (adding && res.length) {
        this.results.push(res);
        this.unbatchSortRebatch();
        this.batchLoadingState = false;
        this.page++;
      } else {
        this.results = res.length ? [res] : [];
        this.page++;
      }
      this.randomQuery(12, false);
      console.log("search done");
      this.loadingState = false;
    },

    async randomQuery(number = 12, adding = false) {
      console.log("randomQuery");
      if (adding) {
        this.batchLoadingState = true;
      }
      const { getItems } = useDirectusItems();
      if (!this.allPackageIds.length) {
        this.allPackageIds = await getItems({
          collection: "packages",
          params: {
            limit: 500,
            fields: "id",
            filter: {
              status: {
                _eq: "published",
              },
              description: {
                _nempty: true,
              },
            },
          },
        });
      }
      let array = [];
      while (array.length < number) {
        let r = Math.round(Math.random() * (this.allPackageIds.length - 1));
        if (!array.includes(this.allPackageIds[r].id))
          array.push(this.allPackageIds[r].id);
      }
      if (adding) {
        let packages = await this.getPackagesFromIds(array);
        this.pickedRandomResults.push(packages);
        this.batchLoadingState = false;
      } else {
        let packages = await this.getPackagesFromIds(array);
        this.pickedRandomResults = [packages];
      }
      this.loadingState = false;

    },
    async getPackagesFromIds(array) {
      const { getItems } = useDirectusItems();
      let res = await getItems({
        collection: "packages",
        params: {
          fields: helpers.packageFields,
          filter: {
            id: {
              _in: array,
            },
          },
        },
      });
      return res;
    },
 
    unbatchSortRebatch(array) {
      let all = this.results.flat();
      all =
        this.sortBy.value == "priceInc"
          ? all.sort((a, b) => a.price - b.price)
          : all.sort((a, b) => b.price - a.price);
      console.log("flat sorted:", all);
      this.results = this.createBatches(all);
    },
    createBatches(array) {
      // console.log(array)
      const batches = [];
      for (let i = 0; i < array.length; i += 12) {
        let chunk = array.slice(i, i + 12);
        batches.push(chunk);
      }
      return batches;
    },
    resetStore() {
      this.$reset();
      this.randomQuery();
    },
    returnParams(){
      const router = useRouter()
      let options = {
        sort: this.sortBy.value, 
        destination: this.destination.name,
        destinationType: this.destination.type,
        category: this.category.name,
        from_date: this.from_date,
        to_date: this.to_date,
        price_min: this.price_min,
        price_max: this.price_max,
        query: this.queryString,
       }

       for (const key in options) {
         if (options[key] == null) {
           delete options[key]
         }
       }
       
      console.log("options", options)
       return options
    }
  },
  setValue(key, value) {
    this[key] = value;
  }
});
