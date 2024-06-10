import { defineNuxtPlugin } from "#app";
import { useGlobal } from "@/stores/global";

export default defineNuxtPlugin(function (nuxtApp) {
  const config = useRuntimeConfig();
  const globalState = useGlobal();
  const graphql = (queryString, jwt = null) => {
    return new Promise((resolve, reject) => {
      fetch(config.strapiUrl + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt ? "Bearer " + jwt : null,
        },
        body: JSON.stringify({
          query: queryString,
        }),
      })
        .then((response) => response.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  };
  return {
    provide: {
      graphql: graphql,
    },
  };
});
