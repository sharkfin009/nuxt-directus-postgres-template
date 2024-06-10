export const useSocialSharing = () => {
  const config = useRuntimeConfig();
  const route = useRoute();
  let siteUrl = config.siteUrl;
  if (typeof siteUrl === 'undefined') {
    if (typeof window !== 'undefined') {
      siteUrl = window.location.origin + window.location.pathname;
    }
  } else {
    siteUrl += route.fullPath;
  }
  let fullPath = encodeURIComponent(siteUrl);
  const share = (provider) => {
    let url = "";
    let pageTitle = "";

    if (provider == "facebook") {
      url = "https://www.facebook.com/sharer.php?u=" + fullPath;
      socialWindow(url, 570, 570);
    }

    if (provider == "twitter") {
      url =
        "https://twitter.com/intent/tweet?url=" +
        fullPath +
        "&text=" +
        pageTitle;
      socialWindow(url, 570, 300);
    }

    if (provider == "whatsapp") {
      url = "https://wa.me/?text=" + fullPath;
      // url = "https://wa.me/whatsappphonenumber/?text=" + "package" + "%20" + fullPath;
      // url = "https://wa.me/?text=" + "package" + "%20" + fullPath;
      // url = "whatsapp://send?text=" + "package" + "%20" + fullPath; // This makes a blank popup
      socialWindow(url, 570, 450);
    }

    if (provider == "email") {
      url = "/mailto:" + fullPath;
      window.location.href = "mailto:?subject=Hi!&body=" + fullPath;
    }
  };

  const socialWindow = (url, width, height) => {
    let left = (screen.width - width) / 2;
    let top = (screen.height - height) / 2;
    let params =
      "menubar=no,toolbar=no,status=no,width=" +
      width +
      ",height=" +
      height +
      ",top=" +
      top +
      ",left=" +
      left;
    window.open(url, "", params);
  };
  return { share };
};
