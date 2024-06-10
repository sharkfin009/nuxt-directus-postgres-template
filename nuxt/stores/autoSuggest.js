import { defineStore } from "pinia";
import { useStore } from "@/stores/search";
import { useGlobal } from "@/stores/global";

import helpers from "@/helpers/packages";

export const useAutoSuggestStore = defineStore("autoSuggest", {
  state: () => ({
    queryString: null,
    querySuggestions: [],
    packageSuggestions: [],
    showSuggestions: false,
    selectedSuggestion: ref(0),
    inputHasFocus: false,
  }),
  actions: {
    manageKeyUp(e) {
      let global = useGlobal();
      global.showShadow = true;
      // window.scrollTo(0, 0);
      const searchStore = useStore();
      // escape:
      if (e.key === "Escape") {
        this.clear();

        return;
      }

      // down Arrow:
      if (
        e.key === "ArrowDown" &&
        this.selectedSuggestion < this.querySuggestions.length - 1
      ) {
        this.selectedSuggestion++;

        return;
      }
      if (
        e.key === "ArrowDown" &&
        this.selectedSuggestion === this.querySuggestions.length - 1
      ) {
        this.selectedSuggestion = 0;

        return;
      }
      // up arrow:
      if (e.key === "ArrowUp") {
        if (this.selectedSuggestion >= 0) {
          this.selectedSuggestion--;
        }
        return;
      }
      // enter
      if (e.key === "Enter") {
        // if no selection:
        if (this.selectedSuggestion === -1) {

          this.showSuggestions = false;
          global.showShadow = false;
          this.generalTextSearch(this.queryString);
          return;
        }

        // if suggestion:
        if (this.queryString !== "") {
          this.queryString = this.querySuggestions[this.selectedSuggestion];
        }

        this.searchDestination(this.querySuggestions[this.selectedSuggestion]);
        this.clear();
        global.showShadow = false;
        return;
      }

         // backspace
      if (e.key === "Backspace") {
        global.showShadow = false;
        this.packageSuggestions = [];
        this.querySuggestions = [];
        this.selectedSuggestion = -1;
        if (this.queryString == "") {
          this.clear();
          return;
        }
      }
      if (this.queryString.length == 0) {
        this.showSuggestons = false;
        global.showShadow = false;
        return;
      } else {
        this.createQuerySuggestions(e.target.value);
        this.createPackageSuggestions(e.target.value);
        this.showSuggestions = true
        global.showShadow = true;
        if (this.queryString < 3) {
          this.queryString == true
        }
      }
    },

    createQuerySuggestions(string) {
      const global = useGlobal();

      this.querySuggestions = global.options
        .filter((item) =>
          item.name.toLowerCase().includes(string.toLowerCase())
        )
        .sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
        });
    },
    async createPackageSuggestions(string) {
      const global = useGlobal();
      const { getItems } = useDirectusItems();

      let data = await getItems({
        collection: "packages",
        params: {
          fields:
            "slug,ct_ref,title,description,price,region.name,city.name,country.name,province.name,status",
          filter: {
            status: {
              _eq: "published",
            },
            description: {
              _nempty: true,
            },
            _or: [
              {
                title: {
                  _icontains: string,
                },
              },
              {
                description: {
                  _icontains: string,
                },
              },
              {
                country: {
                  name: {
                    _icontains: string,
                  },
                },
              },
              {
                province: {
                  name: {
                    _icontains: string,
                  },
                },
              },
              {
                region: {
                  name: {
                    _icontains: string,
                  },
                },
              },
              {
                city: {
                  name: {
                    _icontains: string,
                  },
                },
              },
            ],
          },
        },
      });

      this.packageSuggestions = data.map((item) => {
        let parsed = helpers.calculateDestination(item);
        return {
          destination: parsed.name??'',
          ...item,
        };
      });
    },
    generalTextSearch() {
      const searchStore = useStore();
      this.clear()
      searchStore.queryString = this.queryString
      history.replaceState(null, "", "?query=" + searchStore.queryString);
      searchStore.fireQuery();
    },
    searchByOption(payload) {
      const router = useRouter();
      const searchStore = useStore();
      this.clear()
      searchStore.$reset();
console.log("router", router.path);
  let url = "";
  if (payload.type == "category") {
     url = `/search?category=${payload.name}`;
  } else {
     url = `/search?destinationType=${payload.type}&destination=${payload.name}`;
  }
  // check if we are on the search page. If not, navigate to search page
  if (router.currentRoute.value.path != "/search") {
    console.log("navigating to search", url);
    router.push(url);
  } else {
    if(payload.type == "category") {

      searchStore.category.name = payload.name;
      searchStore.category.value = payload.value;
    } else {
      searchStore.destination.name = payload.name;
      searchStore.destination.type = payload.type;
    }
    
    searchStore.fireQuery();
  }

    },
  

    viewPackage(slug, ct_ref) {
      this.clear();
      navigateTo({
        path: "/packages/" + ct_ref + "/" + slug,
      });
    },

    clear() {
      this.queryString = null;
      let global = useGlobal();
      this.selectedSuggestion = -1;
      this.querySuggestions= [],
      this.packageSuggestions= [],
      console.log("clearing");
      this.showSuggestions= false,
      global.showShadow= false
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

    },
  },

  getters: {},
});
