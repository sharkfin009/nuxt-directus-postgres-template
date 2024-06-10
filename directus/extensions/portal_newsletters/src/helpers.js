export default {
    mapImages(array) {
      // console.log(array)
      return array.map((img) => {
        return this.mapImage(img.directus_files_id);
      });
    },
  
    mapImage(img) {
      return {
        url: img?.filename_disk,
        alt: img?.description ?? img?.filename_download,
      };
    },
  
    packageFields: [
      "*",
      "region.name",
      "country.name",
      "city.name",
      "province.name",
      "category.name",
      "images.directus_files_id.description",
      "images.directus_files_id.filename_disk",
      "images.directus_files_id.filename_download",
    ].join(),
    allFieldsPlusImage: [
      "*",
      "image.description",
      "image.filename_disk",
      "image.filename_download",
    ].join(),
    allFieldsPlusImagesArray: [
      "*",
      "images.directus_files_id.description",
      "images.directus_files_id.filename_disk",
      "images.directus_files_id.filename_download",
    ].join(),
    favouriteFields: [
      "package.*",
      "package.region.name",
      "package.country.name",
      "package.city.name",
      "package.province.name",
      "package.category.name",
      "package.images.directus_files_id.description",
      "package.images.directus_files_id.filename_disk",
      "package.images.directus_files_id.filename_download",
    ].join(),
  
    async calculateDestination(pckage) {
      return new Promise(function (resolve, reject) {
        resolve(getDestination(pckage));
      });
      function getDestination(pckage) {
        let lookup = {
          province: pckage?.province?.name,
          country: pckage?.country?.name,
          city: pckage?.city?.name,
          region: pckage?.region?.name,
        };
        let parsed = null;
        parsed = lookup.region
          ? {
              type: "regions",
              name: lookup.region,
            }
          : null;
        parsed = lookup.country
          ? {
              type: "countries",
              name: lookup.country,
            }
          : parsed;
        parsed = lookup.province
          ? {
              type: "provinces",
              name: lookup.province,
            }
          : parsed;
  
        parsed = lookup.city
          ? {
              type: "cities",
              name: lookup.city,
            }
          : parsed;
        
        return parsed;
      }
     
    },
    generateString(dest,pckage){
      switch (dest?.type) {
        case "regions":
          return dest?.name;
        case "cities":
          return (
            dest?.name +
            ", " +
            (dest.country? pckage?.country?.name +
            ", " : '') +
            pckage.region?.name
          );
        case "countries":
          return dest.name + ", " + pckage.region?.name;
        case "provinces":
          return dest.name + ", " + pckage.country?.name;
        default: return "none"
      }
    }
  };
  