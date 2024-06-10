<template>
  <div class="relative">
    <!-- HTML preview popup -->
    <div
      v-if="showingState"
      class="absolute z-5 flex flex-column w-full bg-white p-2"
      style="border: 1px solid black; z-index: 5; flex-direction: column"
    >
      <div v-if="showingHTML">
        <div class="flex flex-row mb-5 justify-between">
          <p><strong>HTML Preview</strong><br />{{ newsletterTitle }}</p>
          <a class="btn" @click="showNewsletter()">Show Newsletter</a>
          <a class="btn" @click="hide(newsletter)">Close</a>
        </div>
        <div>
          <textarea
            v-html="html"
            rows="30"
            cols="50"
            class="w-full preview-html"
          ></textarea>
        </div>
      </div>
      <div v-if="showingNewsletter">
        <div class="flex flex-row mb-5 justify-between">
          <p><strong>Newsletter Preview</strong><br />{{ newsletterTitle }}</p>
          <a class="btn" @click="showHTML()">Show HTML</a>
          <a class="btn" @click="hide(newsletter)">Close</a>
        </div>
        <div class="place-content-center">
          <iframe
            :srcdoc="html"
            class="border-2 border-slate-700 w-[1200px] min-h-[500px]"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- newsletters list -->
    <div>
      <p class="mb-2"><strong>Newsletters</strong></p>
      <div class="" v-for="(newsletter, index) of newsletterData" :key="index">
        <div
          class="bg-white rounded-lala py-2 px-5 mb-4 shadow-lg grid grid-cols-[auto,50px] text-xl"
          key="index"
        >
          <div>
            <a
              @click="
                showPreview[newsletter.title]
                  ? hide(newsletter)
                  : show(newsletter)
              "
              class="cursor-pointer btn"
              >Preview</a
            >
            &nbsp; &nbsp;
            <div style="width: 150px; display: inline-block">
              Status:
              <strong
                :class="{
                  'text-green-600': newsletter.status === 'ready',
                  'text-blue-600': newsletter.status === 'approved',
                  'text-orange-600': newsletter.status === 'draft',
                  'text-gray-600': newsletter.status === 'archived',
                }"
                >{{ newsletter.status }}</strong
              >
            </div>
            &nbsp; &nbsp; Title: <strong>{{ newsletter.title }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Newsletter Preview - Computravel",
  meta: [
    { name: "description", content: "Newsletter Preview" },
    { name: "og:description", content: "Newsletter Preview" },
    { name: "og:title", content: "Newsletter Preview - Computravel" },
    { name: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:description", content: "Newsletter Preview" },
    { name: "twitter:site", content: "https://computravel.co.za" },
    { name: "twitter:title", content: "Newsletter Preview - Computravel" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

import helpers from "./helpers";

// const config = useRuntimeConfig();
// const asataImageUrl = ref('');
const html = ref("");
const newsletterTitle = ref("");
const showingState = ref(false);
const showingHTML = ref(true);
const showingNewsletter = ref(false);
const showPreview = ref({});
// const { image: asataImage, imageError } = useGetImage("asata-logo");
// const newsletterWidth = '1000px';
const newsletterWidth = "700px";
const font = "'Titillium Web', sans-serif, Helvetica, Arial";
const styleFontFooter =
  "font-size:10px; line-height:15.21px; font-weight:400; color:white;";
const styleFontHeading =
  "font-family:" +
  font +
  "; font-size:31.5px; line-height:44.1px; color:black;";
const styleFontPackageTitle =
  "font-family:" +
  font +
  "; font-size:17.5px; line-height:26.62px; color:black; font-weight:400;";
const styleFontPackageLocation =
  "font-family:" +
  font +
  "; font-size:15.73px; line-height:23.92px; color:black; font-weight:400;";
const styleFontText =
  "font-family:" + font + "; font-size:14px; line-height:21.29px; color:black;";



const show = (title) => {
  showingState.value = true;
  showPreview.value[title] = true;
  renderHtml(title);
};

const hide = (title) => {
  showingState.value = false;
  showPreview.value[title] = false;
};

const showHTML = () => {
  showingNewsletter.value = false;
  showingHTML.value = true;
};

const showNewsletter = () => {
  showingHTML.value = false;
  showingNewsletter.value = true;
};

const renderHtmlStart = (newsletter) => {
  const title = newsletter.title;
  const imageUrl = formatImageUrl(newsletter.featured_image);
  return (
    "<!DOCTYPE html>" +
    "\r\n" +
    "<html>" +
    "\r\n" +
    "<head>" +
    "\r\n" +
    '<meta charset="utf-8">' +
    "\r\n" +
    "<title>" +
    title +
    " | Computravel Newsletter</title>" +
    "\r\n" +
    '<meta name="description" content="Computravel serves as an online South African travel agent, boasting highly professional experts with years in the tourism and hospitality industries.">' +
    "\r\n" +
    '<meta name="twitter:card" content="summary_large_image" />' +
    "\r\n" +
    '<meta name="twitter:creator" content="@Computravel" />' +
    "\r\n" +
    '<meta name="twitter:description" content="" />' +
    "\r\n" +
    '<meta name="twitter:image" content="' +
    imageUrl +
    '" />' +
    "\r\n" +
    '<meta name="twitter:site" content="@Computravel" />' +
    "\r\n" +
    '<meta name="twitter:title" content="' +
    title +
    ' | Computravel Package" />' +
    "\r\n" +
    '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
    "\r\n" +
    '<meta property="fb:app_id" content="1445715225476059"/>' +
    "\r\n" +
    '<meta property="og:description" content=""/>' +
    "\r\n" +
    '<meta property="og:image" content="' +
    imageUrl +
    '"/>' +
    "\r\n" +
    '<meta property="og:image:alt" content="' +
    title +
    '" />' +
    "\r\n" +
    '<meta property="og:locale" content="en_GB"/>' +
    "\r\n" +
    '<meta property="og:locale" content="en_ZA"/>' +
    "\r\n" +
    '<meta property="og:site_name" content="Computravel"/>' +
    "\r\n" +
    '<meta property="og:title" content="' +
    title +
    ' | Computravel Package"/>' +
    "\r\n" +
    '<meta property="og:type" content="website"/>' +
    "\r\n" +
    '<meta property="twitter:image:alt" content="' +
    title +
    '" />' +
    "\r\n" +
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    "\r\n" +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    "\r\n" +
    '<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet">' +
    "\r\n" +
    renderHeadStyle() +
    "</head>" +
    "\r\n" +
    '<body style="padding:0; margin:0;">' +
    "\r\n" +
    '<table border="0" cellpadding="0" cellspacing="0" id="email-wizard-main-table" width="100%" style="padding:0; margin:0;">' +
    "\r\n" +
    "<tbody>" +
    "\r\n"
  );
};

const renderHeadStyle = () => {
  return (
    "<style>" +
    "\r\n" +
    ".column { vertical-align:top; }" +
    "\r\n" +
    ".column.left { text-align:left; }" +
    "\r\n" +
    ".column.right { text-align:right; }" +
    "\r\n" +
    ".featured-package-holder { text-align:left; margin-top:15px; margin-bottom:15px; }" +
    "\r\n" +
    ".footer-holder { " +
    renderHtmlStyleMedia("flex-direction:column;") +
    "flex-direction:row; }" +
    "\r\n" +
    ".footer-left { text-align:left; " +
    renderHtmlStyleMedia("text-align:center;") +
    "}" +
    "\r\n" +
    ".footer-right { text-align:right; " +
    renderHtmlStyleMedia("text-align:center;") +
    "}" +
    "\r\n" +
    ".intro-enquire { " +
    renderHtmlStyleMedia("display:none;") +
    "; display:block; height:100px; margin-top:15px; }" +
    "\r\n" +
    ".package { max-width:290px; display:flex; }" +
    "\r\n" +
    ".package-details-holder { text-align:center; min-width:290px; max-width:290px; width:290px; }" +
    "\r\n" +
    ".package-holder { display:flex; }" +
    "\r\n" +
    ".package-holder { display:inline-block; width:50; }" +
    "\r\n" +
    ".package-holder-details { text-align:center; width:290px; display:flex; flex-direction:column; align-items:center; justify-content:center; }" +
    "\r\n" +
    ".package-holder-details.column { padding-top:10px; }" +
    "\r\n" +
    ".package-holder.column { flex-direction:column; }" +
    "\r\n" +
    ".package-holder.row { flex-direction:row; }" +
    "\r\n" +
    ".package.column { flex-direction:column; }" +
    "\r\n" +
    ".package.row { flex-direction:row; }" +
    "\r\n" +
    ".single-package { border-radius:50px; max-width:305px; background-color:white; overflow:hidden; display:inline-block; margin-bottom:1rem; }" +
    "\r\n" +
    ".single-package-holder { width:290px; min-width:290px; max-width:290px; }" +
    "\r\n" +
    ".single-package-holder.column { flex-direction:column; width:49.5%; display:inline-block; margin-left:0; margin-bottom:40px; }" +
    "\r\n" +
    ".single-package-holder.row { flex-direction:row; width:100%; }" +
    "\r\n" +
    "</style>" +
    "\r\n"
  );
};

const renderHeader = async (newsletter) => {
  const functionName = "renderHeader";
  let htmlText = "";
  try {
    let logoImage = await getImageByName("logo-transparent");
    let logoImageUrl = logoImage[0].image;
    const imageLogo =
      '<img width="110px" src="' +
      formatImageUrl(logoImageUrl, 112, 28, 90) +
      '" alt="Computravel logo" style="background-color:#E6EEEA; padding:14px 25px; border-radius:50px; width:112px; margin:0;" />' +
      "\r\n";
    // const htmlText = '<div style="display:flex; flex-direction:row; height:200px; padding-top:3.5rem;">' + "\r\n"
    //   + '<div style="text-align:left; width:50%;">' + "\r\n"
    //   + imageLogo
    //   + '</div>' + "\r\n"
    //   + '<div style="height:100px; text-align:right; width:50%;">' + "\r\n"
    //   + '<div class="intro-enquire">' + renderEnquireNow(newsletter.title) + '</div>' + "\r\n"
    //   + '</div>' + "\r\n"
    //   + '</div>' + "\r\n";
    htmlText +=
      '<table cellspacing="0" cellpadding="0" border="0" height="200px" style="width:100%; height:200px;">' +
      "\r\n" +
      "<tr>" +
      "\r\n" +
      '<td width="50%" align="left" valign="middle" style="text-align:left; vertical-align:middle; padding-bottom:50px;">' +
      "\r\n" +
      imageLogo +
      "</td>" +
      "\r\n" +
      '<td width="50%" align="right" valign="middle" style="text-align:right; vertical-align:middle; padding-bottom:50px;">' +
      "\r\n" +
      renderEnquireNow(newsletter.title) +
      "\r\n" +
      "</td>" +
      "\r\n" +
      "</tr>" +
      "\r\n" +
      "</table>" +
      "\r\n";
  } catch (err) {
    console.warn("[" + functionName + "] Exception:", err.message);
  }
  return renderHtmlInWrapper(
    htmlText,
    "white",
    "0",
    formatImageUrl(newsletter.featured_image, 600, 400)
  );
};

const renderFooter = async () => {
  let logoImage = await getImageByName("logo-transparent");
  let logoImageUrl = logoImage[0].image;
  const imageLogo =
    '<img width="134px" src="' +
    formatImageUrl(logoImageUrl, 134, 33, 90) +
    '" alt="Computravel logo" style="width:134px; height:33px;">';
  const address =
    '<div><a href="https://www.google.co.za/maps/dir//Computravel,+59+Waterloo+Road,+Cnr.+Waterloo+Road+and+Wolfe+Street,+Wynberg,+7800/@-34.0090973,18.4598109,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1dcc42f08a750b6f:0x5cb90b25d3b95c58!2m2!1d18.4620049!2d-34.0091018?hl=en&entry=ttu" target="_blank" style="color:white;">59 Waterloo Road, Wynberg, Cape Town</a></div>' +
    "\r\n" +
    '<div style="margin-top:0.25rem;">Tel: <a href="tel:+27217620511" style="color:white;">021 762-0511</a></div>';

  let htmlText =
    '<table border="0" cellpadding="0" cellspacing="0" style="height:92px; margin:0;' +
    renderHtmlStyleMaxWidth() +
    '" width="' +
    newsletterWidth +
    '" height="92px">' +
    "\r\n" +
    "<tbody>" +
    "\r\n" +
    "<tr>" +
    "\r\n" +
    '<td width="50%" align="left" style="text-align:left;">' +
    imageLogo +
    "</td>" +
    "\r\n" +
    '<td width="50%" align="right" style="' +
    styleFontFooter +
    ' text-align:right;">' +
    address +
    "</td>" +
    "\r\n" +
    "</tr>" +
    "\r\n" +
    "</tbody>" +
    "\r\n" +
    "</table>" +
    "\r\n";
  return renderHtmlInWrapper(htmlText, "#1d2a3a");
};

const renderAsata = async (newsletter) => {
  const functionName = "renderAsata";
  let htmlText = "";
  try {
    let smallPrint = "";
    if (typeof newsletter.small_print === "string") {
      if (newsletter.small_print.length > 0) {
        smallPrint +=
          '<div style="clear: both; ' +
          styleFontText +
          ' font-weight:600; padding:0 0 5px 0; text-align:left;">' +
          newsletter.small_print +
          "</div>" +
          "\r\n";
      }
    } else {
      console.warn(
        "[" +
          functionName +
          "] small print is not a string: " +
          typeof newsletter.small_print
      );
    }
    let asataImage = await getImageByName("asata-logo-rectangle");
    let asataLogoUrl = asataImage[0].image;
    htmlText +=
      '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:0px; border:0;' +
      renderHtmlStyleMaxWidth() +
      '">' +
      "\r\n" +
      "<tbody>" +
      "\r\n" +
      "<tr>" +
      "\r\n" +
      '<td align="center" valign="top" width="100%" style="text-align:left;' +
      renderHtmlStyleMaxWidth() +
      '">' +
      "\r\n" +
      smallPrint +
      '<div style="text-align:center; clear: both; ' +
      styleFontText +
      ' font-weight:400;">' +
      "\r\n" +
      '<img src="' +
      formatImageUrl(asataLogoUrl, 290, 125) +
      '" style="display: block; margin: 12px auto 12px auto; min-width:100px; min-height:100px; width:50%; height:auto;" />' +
      "\r\n" +
      "We are accredited members of ASATA whose pivotal role is to ensure and promote the highest standards of professionalism and ethics within the South African travel industry." +
      "\r\n" +
      "</div>" +
      "\r\n" +
      "</td>" +
      "\r\n" +
      "</tr>" +
      "\r\n" +
      "</tbody>" +
      "\r\n" +
      "</table>" +
      "\r\n";
  } catch (err) {
    console.warn("[" + functionName + "] Exception:", err.message);
  }
  return renderHtmlInWrapper(htmlText, "white", "40px");
};

const renderHtmlEnd = () => {
  return (
    "</table>" +
    "\r\n" +
    '<input id="fields[body_fontcolor]" name="fields[body_fontcolor]" type="hidden" value="#202020" /> <input id="fields[body_bgcolor]" name="fields[body_bgcolor]" type="hidden" value="#ffffff" />' +
    "\r\n" +
    "</body>" +
    "\r\n" +
    "</html>"
  );
};

const renderStar = () => {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" style="width:16px; height:16px; color:black; padding-left:2px; padding-right:2px;">' +
    "\r\n" +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>' +
    "\r\n" +
    "</svg>" +
    "\r\n"
  );
};

const renderHtmlIntro = (newsletter) => {
  let htmlText = "";
  try {
    htmlText +=
      "<!-- Intro start -->" +
      "\r\n" +
      '<div style="margin-bottom:40px; margin-top:40px;">' +
      "\r\n" +
      renderHtmlHeading("h2", newsletter.title) +
      renderHtmlHeading("h3", newsletter.subtitle) +
      renderNewsletterBody(newsletter.body) +
      "</div>" +
      "\r\n" +
      "<!-- Intro end -->" +
      "\r\n";
  } catch (err) {
    console.warn("[renderHtmlIntro] Exception:", err.message);
  }
  return renderHtmlInWrapper(htmlText, "white");
};

const renderEnquireNow = (title) => {
  if (typeof title !== "string") {
    title = "";
  }
  return (
    '<a href="mailto:info@computravel.co.za?subject=' +
    title.replaceAll(" ", "%20") +
    '" style="font-size:15.73px; line-height:23.92px; color:white; padding:16px 30px; border-radius:30px; background-color:#ace770; margin:0; text-decoration:none;">enquire now</a>' +
    "\r\n"
  );
};

const renderHtmlHeading = (headingType, title) => {
  if (typeof headingType !== "string" || typeof title !== "string") {
    return "";
  }
  if (headingType.length === 0 || title.length === 0) {
    return "";
  }
  let weight = headingType === "h3" ? "400" : "600";
  return (
    '<table border="0" cellpadding="0" cellspacing="0" style="padding-bottom: 0px; width:100%;">' +
    "\r\n" +
    "<tbody>" +
    "\r\n" +
    "<tr>" +
    "\r\n" +
    '<td width="100%">' +
    "\r\n" +
    "<" +
    headingType +
    ' style="' +
    styleFontHeading +
    " font-weight:" +
    weight +
    '; margin-top:0; margin-bottom:0;">' +
    title +
    "</" +
    headingType +
    ">" +
    "\r\n" +
    "</td>" +
    "\r\n" +
    "</tr>" +
    "\r\n" +
    "</tbody>" +
    "\r\n" +
    "</table>" +
    "\r\n"
  );
};

const renderNewsletterBody = (text) => {
  if (typeof text !== "string") {
    return "";
  }
  if (text.length === 0) {
    return "";
  }
  return (
    '<div style="text-decoration:none; ' +
    styleFontText +
    ' text-align:left; margin-top:15px; margin-bottom:15px;">' +
    "\r\n" +
    text +
    "\r\n" +
    "</div>" +
    "\r\n"
  );
};

const renderPackageImage = async (packageData) => {
  const imageCode = await getPackageImage(packageData);
  if (typeof imageCode === "undefined") {
    return "";
  }
  const imageHeight = 145;
  return (
    '<div style="overflow:hidden; width:100%; max-height:' +
    imageHeight +
    "px; height:" +
    imageHeight +
    'px;">' +
    "\r\n" +
    '<img style="height:' +
    imageHeight +
    'px;" src="' +
    formatImageUrl(imageCode.url, 290, 0, 65) +
    '" width="290" height="' +
    imageHeight +
    '" />' +
    "\r\n" +
    "</div>" +
    "\r\n"
  );
};

const renderPackageDetails = (packageData) => {
  // Get the title and only keep the first part
  let titleAdjusted = packageData.title;
  titleAdjusted = titleAdjusted.split(" - ");
  titleAdjusted = titleAdjusted[0];

  const locationListText = buildPackageLocationText(packageData);
  let locationText = "";
  if (locationListText.length > 0) {
    locationText +=
      '<div style="' +
      styleFontPackageLocation +
      ' text-align:center; padding:0 10px;">' +
      locationListText +
      "</div>" +
      "\r\n";
  }

  let starText = "";
  if (packageData.star_rating > 0) {
    for (let counter = 0; counter < packageData.star_rating; counter++) {
      starText += renderStar();
    }
    starText =
      '<div style="text-align:center; font-size:15.73px; line-height:23.92px;">' +
      starText +
      "</div>" +
      "\r\n";
  }

  return (
    '<div class="package-details-holder">' +
    "\r\n" +
    '<div style="color:black !important; font-family:' +
    font +
    "; " +
    styleFontPackageTitle +
    ' padding:0 10px;">' +
    titleAdjusted +
    "</div>" +
    "\r\n" +
    starText +
    locationText +
    '<div style="text-decoration:none; font-family:' +
    font +
    "; " +
    styleFontHeading +
    ' font-weight:400;">' +
    formatPrice(packageData.price).replace(".00", "") +
    "</div>" +
    "\r\n" +
    "</div>" +
    "\r\n"
  );
};

const renderPackageFeatured = async (newsletterData, packagesData) => {
  const functionName = "renderPackageFeatured";
  if (typeof packagesData === "undefined") {
    console.warn("[" + functionName + "] package data is undefined");
    return "";
  }
  if (typeof packagesData !== "object") {
    console.warn("[" + functionName + "] package data is not an object");
    return "";
  }
  if (packagesData === null) {
    console.warn("[" + functionName + "] package data is null");
    return "";
  }
  let htmlText = "";
  try {
    // const packageData = packagesData[0];
    // const imageCode = getPackageImage(packageData);
    // const packageUrl = formatPackageUrl(packageData);
    if (packagesData.length === 0) {
      htmlText += "<!-- No featured package available -->" + "\r\n";
      return htmlText;
    }
    let featuredTitle = newsletterData.featured_title;
    if (typeof featuredTitle === "undefined") {
      featuredTitle = "Holiday highlight - special deal!";
    }
    if (featuredTitle === null) {
      featuredTitle = "Holiday highlight - special deal!";
    }
    const packageData = packagesData[0];
    htmlText +=
      "<!-- Featured package start -->" +
      "\r\n" +
      renderHtmlHeading("h2", featuredTitle) +
      '<div class="featured-package-holder">' +
      "\r\n" +
      (await renderPackage(packageData, 1, 1)) +
      "</div>" +
      "\r\n" +
      '<div style="' +
      styleFontText +
      ' text-align:center;">Offer valid for a limited time only.</div>' +
      "\r\n" +
      "<!-- Featured package end -->" +
      "\r\n";
  } catch (err) {
    console.warn("[" + functionName + "] Exception:", err.message);
  }
  return renderHtmlInWrapper(htmlText, "#e6eeeb", "22px");
};

const renderPackage = async (packageData, featured, bottomRow) => {
  const functionName = "renderPackage";
  if (typeof packageData === "undefined") {
    console.warn("[" + functionName + "] package data is undefined");
    return "";
  }
  if (packageData === null) {
    console.warn("[" + functionName + "] package data is null");
    return "";
  }
  try {
    if (typeof featured !== "number") {
      featured = 0;
    }
    if (typeof bottomRow !== "number") {
      bottomRow = 0;
    }
    const featuredClass = featured > 0 ? "row" : "column";
    const styleText = bottomRow > 0 ? ' style="margin-bottom:0;"' : "";

    return (
      "<!-- single package start -->" +
      "\r\n" +
      '<div class="single-package-holder ' +
      featuredClass +
      '"' +
      styleText +
      ">" +
      "\r\n" +
      '<a target="_blank" style="text-decoration: none;" href="' +
      formatPackageUrl(packageData) +
      '">' +
      "\r\n" +
      '<div class="package ' +
      featuredClass +
      '">' +
      "\r\n" +
      '<div class="package-holder-image">' +
      "\r\n" +
      (await renderPackageImage(packageData)) +
      "</div>" +
      "\r\n" +
      '<div class="package-holder-details ' +
      featuredClass +
      '">' +
      "\r\n" +
      (await renderPackageDetails(packageData)) +
      "</div>" +
      "\r\n" +
      "</div>" +
      "\r\n" +
      "</a>" +
      "\r\n" +
      "</div>" +
      "\r\n" +
      "<!-- single package end -->" +
      "\r\n"
    );
  } catch (err) {
    console.warn("[" + functionName + "] Exception:", err.message);
  }
  return "<!-- renderPackage | error -->" + "\r\n";
};

const renderPackages = async (
  packagesData,
  countriesData,
  regionsData,
  citiesData
) => {
  if (packagesData.length === 0) {
    return "<!-- No packages available -->" + "\r\n";
  }
  let htmlText =
    "<!-- Packages start -->" +
    "\r\n" +
    '<div style="padding-top:40px; padding-bottom:40px; position:relative;">' +
    "\r\n" +
    "<!-- Packages table start -->" +
    "\r\n" +
    '<table cellspacing="0" cellpadding="0" border="0" width="100%">' +
    "\r\n" +
    "<tr>" +
    "\r\n";
  let packageNumber = 0;
  for (let index in packagesData) {
    if (packageNumber > 0 && packageNumber % 2 === 0) {
      htmlText += "\r\n" + "\r\n" + "</tr><tr>" + "\r\n" + "\r\n";
    }
    htmlText +=
      '<td width="50%" class="column ' +
      (packageNumber % 2 === 0 ? "left" : "right") +
      '" style="' +
      (packageNumber % 2 === 0 ? "text-align:left;" : "text-align:right;") +
      '">' +
      (await renderPackage(
        packagesData[index],
        0,
        packageNumber + 2 >= packagesData.length ? 1 : 0
      )) +
      "</td>";
    packageNumber++;
  }
  if (packageNumber % 2 !== 0) {
    htmlText += '<td width="50%" class="column right"></td>';
  }
  htmlText +=
    "</tr>" +
    "\r\n" +
    "</table>" +
    "\r\n" +
    "</div>" +
    "\r\n" +
    "<!-- End of packages -->" +
    "\r\n";
  return renderHtmlInWrapper(htmlText, "white");
};

const renderHtmlInWrapper = (htmlText, bgColor, marginY, backgroundImage) => {
  if (typeof marginY !== "string") {
    marginY = "0";
  }
  if (marginY === "") {
    marginY = "0";
  }
  if (typeof bgColor !== "string") {
    bgColor = "white";
  }
  if (bgColor === "") {
    bgColor = "white";
  }
  if (typeof backgroundImage !== "string") {
    backgroundImage = "";
  }
  let inlineStyle = "width:" + newsletterWidth + ";";
  let bgColorTd = ' bgcolor="' + bgColor + '"';
  let bgColorStyle = "background-color:" + bgColor + "; ";
  let backgroundStyle = "";
  if (backgroundImage !== "") {
    backgroundStyle =
      " background:url('" +
      backgroundImage +
      "'); background-size:cover; background-position:center;";
    // inlineStyle = inlineStyle + backgroundStyle;
    bgColorTd = "";
    bgColorStyle = "";
  }
  const sideSpacing =
    '<td width="52px" style="width:52px; min-width:52px; max-width:52px;"></td>' +
    "\r\n";
  return (
    "<tr>" +
    "\r\n" +
    '<td align="center" bgcolor="' +
    bgColor +
    '" style="' +
    inlineStyle +
    '">' +
    "\r\n" +
    '<table border="0" cellpadding="0" cellspacing="0" style="display:block; font-family:' +
    font +
    "; color:black;" +
    renderHtmlStyleMaxWidth() +
    "margin-top:" +
    marginY +
    "; margin-bottom:" +
    marginY +
    ";" +
    backgroundStyle +
    '">' +
    "\r\n" +
    "<tbody>" +
    "\r\n" +
    "<tr>" +
    "\r\n" +
    sideSpacing +
    '<td align="center"' +
    bgColorTd +
    ' style="' +
    bgColorStyle +
    "padding-top:0; padding-bottom:0;" +
    renderHtmlStyleMaxWidth() +
    '" valign="top" width="' +
    newsletterWidth +
    '">' +
    "\r\n" +
    "<!-- Wrapper content start -->" +
    "\r\n" +
    htmlText +
    "\r\n" +
    "<!-- Wrapper content end -->" +
    "\r\n" +
    "</td>" +
    "\r\n" +
    sideSpacing +
    "</tbody>" +
    "\r\n" +
    "</table>" +
    "\r\n" +
    "</td>" +
    "\r\n" +
    "</tr>" +
    "\r\n"
  );
};

const renderHtmlStyleMedia = (htmlText) => {
  if (typeof htmlText !== "string") {
    return "";
  }
  if (htmlText == "") {
    return "";
  }
  return "@media only screen and (max-width: 600px) {" + htmlText + "}";
};

const renderHtmlStyleMaxWidth = () => {
  return "max-width:" + newsletterWidth + "; min-width:200px;";
};

const renderSocialMedia = () => {
  let htmlText =
    '<table border="0" cellpadding="0" cellspacing="0" style="margin:0;' +
    renderHtmlStyleMaxWidth() +
    '" width="100%">' +
    "\r\n" +
    "<tbody>" +
    "\r\n" +
    "<tr>" +
    "\r\n" +
    '<td align="left" valign="top" style="font-size:14px;">' +
    "\r\n" +
    '<div align="center" style="text-align:center; margin-bottom:40px;">' +
    "\r\n" +
    '<div style="font-size:17.5px; line-height:26.62px; font-weight:600;">Join us on social media</div>' +
    "\r\n" +
    '<div style="text-align:center; justify-content:space-between; width:120px; display:flex; flex-direction:row; margin-top:10px; margin-left:auto; margin-right:auto;">' +
    "\r\n" +
    '<a target="blank" href="https://www.facebook.com/Computravel/">' +
    "\r\n" +
    renderIcon("facebook") +
    "</a>" +
    "\r\n" +
    '<a target="blank" href="https://twitter.com/computravel">' +
    "\r\n" +
    renderIcon("twitter") +
    "</a>" +
    "\r\n" +
    '<a target="blank" href="https://www.instagram.com/computravel/?hl=en">' +
    "\r\n" +
    renderIcon("instagram") +
    "</a>" +
    "\r\n" +
    "</div>" +
    "\r\n" +
    "</div>" +
    "\r\n" +
    '<p><strong>Call us or Email us on <a href="mailto:info@computravel.co.za" style="color:black;">info@computravel.co.za</a></strong> we love web and email enquiries, but talking to you helps us offer you faster, more efficient service, so call us now 021 762 0511 to discuss your next unique, tailor-made holiday.</p>' +
    "\r\n" +
    "<p><strong>Oh and by the way, we love planning trips on the road less traveled</strong> to unique destinations which may not be featured as a holiday package on our website, for instance:</p>" +
    "\r\n" +
    "<p><strong>Peru, Argentina, Chile, Brazil - the Atacama Desert, Patagonia, the Beagle Channel, the Amazon Rainforest and Iguazu Falls<br />" +
    "\r\n" +
    "Scotland, the Isle of Skye, Loch Ness, the Celtic Heartlands<br />The Philippines and Boracay Bay<br />" +
    "\r\n" +
    "Honolulu<br />" +
    "\r\n" +
    "Mexico<br />" +
    "\r\n" +
    "Cuba - visit before it loses it's unique charm<br />" +
    "\r\n" +
    "Arctic and Antarctic cruises<br />" +
    "\r\n" +
    "Australia - Great Barrier Reef and New Zealand<br />" +
    "\r\n" +
    "Galapagos Islands or Easter Island</strong></p>" +
    "\r\n" +
    '<p><strong><a href="https://www.facebook.com/Computravel" target="_blank" style="color:black;">Please Like us on Facebook</a></strong> we bring you the travel news of the day, happy snaps from clients travels and last minute travel bargains and we would appreciate your comment on all issues related to travel and holidays.</p>' +
    "\r\n" +
    '<p><strong><a href="https://www.computravel.co.za/find-a-hotel" target="_blank" style="color:black;">Browse and book from a selection of serviced apartments worldwide.</a></strong> There are loads of studio, 1, 2 and 3 bedroom apartments to book, which are exceptional value for your spend, such as R2000 per night for 2 people sharing in a studio apartment in Chelsea area, London!</p>' +
    "\r\n" +
    '<p><strong><a href="https://www.computravel.co.za/flight-specials" target="_blank" style="color:black;">Book your own flight on Find-a-Flight</a></strong> you will be amazed at the BEST GUARANTEED FARES to London, Amsterdam, Paris, Munich, Stockholm, Istanbul, Mumbai and New York City.</p>' +
    "\r\n" +
    "</td>" +
    "\r\n" +
    "</tr>" +
    "\r\n" +
    "</tbody>" +
    "\r\n" +
    "</table>" +
    "\r\n";
  return renderHtmlInWrapper(htmlText, "#e6eeeb", "40px");
};

const renderHtml = async (newsletter) => {
  try {
    const newsletterPackages = await getNewsletterPackagesData(
      newsletter.id,
      "newsletters_packages"
    );
    const newsletterPackagesFeatured = await getNewsletterPackagesData(
      newsletter.id,
      "newsletters_featured_packages"
    );
    const packageIds = getNewsletterPackagesIds(newsletterPackages);
    const packageIdsFeatured = getNewsletterPackagesIds(
      newsletterPackagesFeatured
    );
    const packagesData = await getNewsletterPackagesByIdList(packageIds);
    const packagesDataFeatured = await getNewsletterPackagesByIdList(
      packageIdsFeatured
    );
    // const imageIds = getPackageImageIds(packagesData);
    // const imagesData = await getImagesData(imageIds);

    // Build the newsletter
    html.value =
      renderHtmlStart(newsletter) +
      (await renderHeader(newsletter)) +
      renderHtmlIntro(newsletter) +
      (await renderPackageFeatured(newsletter, packagesDataFeatured)) +
      (await renderPackages(
        packagesData,
        countriesData,
        regionsData,
        citiesData
      )) +
      renderSocialMedia() +
      (await renderAsata(newsletter)) +
      (await renderFooter()) +
      renderHtmlEnd();
  } catch (err) {
    console.warn("[renderHtml] Exception:", err.message);
  }
};

const renderIcon = (name) => {
  const widthHeightColor = "width:35px; height:35px; color:black;";
  switch (name) {
    case "instagram":
      return (
        '<svg style="' +
        widthHeightColor +
        '" viewBox="0 0 24 24">' +
        "\r\n" +
        '<path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/></svg>' +
        "\r\n"
      );
    case "facebook":
      return (
        '<svg style="' +
        widthHeightColor +
        '" viewBox="0 0 24 24">' +
        "\r\n" +
        '<path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>' +
        "\r\n" +
        "</svg>" +
        "\r\n"
      );
    case "twitter":
      return (
        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455.731 455.731" style="' +
        widthHeightColor +
        ' enable-background: new 0 0 455.731 455.731" xml:space="preserve">' +
        "\r\n" +
        "<g>" +
        "\r\n" +
        '<rect x="0" y="0" style="fill: none" />' +
        "\r\n" +
        '<path style="fill: black" d="M60.377,337.822c30.33,19.236,66.308,30.368,104.875,30.368c108.349,0,196.18-87.841,196.18-196.18 c0-2.705-0.057-5.39-0.161-8.067c3.919-3.084,28.157-22.511,34.098-35c0,0-19.683,8.18-38.947,10.107 c-0.038,0-0.085,0.009-0.123,0.009c0,0,0.038-0.019,0.104-0.066c1.775-1.186,26.591-18.079,29.951-38.207 c0,0-13.922,7.431-33.415,13.932c-3.227,1.072-6.605,2.126-10.088,3.103c-12.565-13.41-30.425-21.78-50.25-21.78 c-38.027,0-68.841,30.805-68.841,68.803c0,5.362,0.617,10.581,1.784,15.592c-5.314-0.218-86.237-4.755-141.289-71.423 c0,0-32.902,44.917,19.607,91.105c0,0-15.962-0.636-29.733-8.864c0,0-5.058,54.416,54.407,68.329c0,0-11.701,4.432-30.368,1.272 c0,0,10.439,43.968,63.271,48.077c0,0-41.777,37.74-101.081,28.885L60.377,337.822z"/>' +
        "\r\n" +
        "</g>" +
        "\r\n" +
        "</svg>" +
        "\r\n"
      );
    default:
      return "";
  }
};

const formatPrice = (price) => {
  return "R" + price;
};

const formatImageUrl = (imageId, width, height, quality) => {
  if (typeof imageId === "number") {
    console.warn("[formatImageUrl] Image ID is a number");
    return "";
  }
  if (typeof width === "undefined") {
    width = 1280;
  }
  if (typeof height === "undefined") {
    height = 1280;
  }
  if (typeof quality === "undefined") {
    quality = 65;
  }
  if (quality === null) {
    quality = 65;
  }
  let params = "";
  if (width > 0) {
    params += "&width=" + width;
  }
  if (height > 0) {
    params += "&height=" + height;
  }
  return (
    "https://directus-admin.computravel.co.za/assets/" +
    imageId +
    ".jpg?quality=" +
    quality +
    "&format=auto&fit=cover" +
    params
  );
};

const formatPackageUrl = (packageData) => {
  if (typeof packageData === "undefined") {
    console.warn("[formatPackageUrl] package data is undefined");
    return "";
  }
  if (
    typeof packageData.ct_ref === "undefined" ||
    typeof packageData.slug === "undefined"
  ) {
    console.warn("[formatPackageUrl] package slug and/or ct_ref is undefined");
    return "";
  }
  return (
    getSiteUrl() + "/packages/" + packageData?.ct_ref + "/" + packageData?.slug
  );
};

const buildPackageLocationText = (packageData) => {
  let locationList = [];
  if (packageData.city !== null) {
    for (let index in citiesData) {
      if (citiesData[index].id === packageData.city) {
        if (!locationList.includes(citiesData[index].name)) {
          locationList.push(citiesData[index].name);
        }
      }
    }
  }
  if (packageData.province !== null) {
    for (let index in provincesData) {
      if (provincesData[index].id === packageData.province) {
        if (!locationList.includes(provincesData[index].name)) {
          locationList.push(provincesData[index].name);
        }
      }
    }
  }
  if (packageData.country !== null) {
    for (let index in countriesData) {
      if (countriesData[index].id === packageData.country) {
        if (!locationList.includes(countriesData[index].name)) {
          locationList.push(countriesData[index].name);
        }
      }
    }
  }
  if (packageData.region !== null) {
    for (let index in regionsData) {
      if (regionsData[index].id === packageData.region) {
        if (!locationList.includes(regionsData[index].name)) {
          locationList.push(regionsData[index].name);
        }
      }
    }
  }
  if (locationList.length > 0) {
    return locationList.join(", ");
  }
  return "";
};

const pickSafeImage = async (pckage) => {
  // Pick the first available valid image
  if (pckage?.images?.length > 0) {
    pckage.images = await helpers.mapImages(pckage.images);
    for (let index in pckage?.images) {
      const imageData = pckage?.images[index];
      if (typeof imageData.url === "string") {
        if (imageData.url.length > 0) {
          return {
            url: imageData.url,
            alt: imageData.alt,
          };
        }
      }
    }
  }
  return {
    url: "",
    alt: "",
  };
};

const selectFallbackImage = (pckage, destinationData) => {
  // manage no valid images by picking one relevant fallback
  if (typeof pckage !== "undefined" && typeof destinationData !== "undefined") {
    if (
      pckage?.images.length === 0 ||
      pckage?.images.filter((item) => !item?.url).length > 0
    ) {
      if (destinationData.length > 0) {
        if (destinationData.images.length) {
          return pickOne(helpers.mapImages(destinationData.images));
        }
      }
    }
  }

  return {
    url: "7440982e-8e7d-49b0-b41b-ac022373a35a.png",
    alt: "rio",
  };
};

const updatePackageNames = (packageData) => {
  if (packageData.country !== null) {
    for (let index in countriesData) {
      if (countriesData[index].id === packageData.country) {
        packageData.country = {
          id: countriesData[index].id,
          name: countriesData[index].name,
        };
        break;
      }
    }
  }
  if (packageData.city !== null) {
    for (let index in citiesData) {
      if (citiesData[index].id === packageData.city) {
        packageData.city = {
          id: citiesData[index].id,
          name: citiesData[index].name,
        };
        break;
      }
    }
  }
  if (packageData.province !== null) {
    for (let index in provincesData) {
      if (provincesData[index].id === packageData.province) {
        packageData.province = {
          id: provincesData[index].id,
          name: provincesData[index].name,
        };
        break;
      }
    }
  }
  if (packageData.region !== null) {
    for (let index in regionsData) {
      if (regionsData[index].id === packageData.region) {
        regionsData.region = {
          id: regionsData[index].id,
          name: regionsData[index].name,
        };
        break;
      }
    }
  }
  return packageData;
};

const getPackageDestinationData = async (packageData) => {
  packageData = updatePackageNames(packageData);
  const destination = await helpers.calculateDestination(packageData);
  if (destination === null) {
    return [];
  }

  return await getItems({
    collection: destination?.type,
    params: {
      filter: {
        name: {
          _eq: destination?.name,
        },
      },
      fields: helpers.allFieldsPlusImagesArray,
    },
  });
};

const getFallbackImages = async (destination) => {
  return await getItems({
    collection: destination.type,
    params: {
      filter: {
        name: {
          _eq: destination?.name,
        },
      },
      fields: helpers.allFieldsPlusImagesArray,
    },
  });
};

const getPackageImage = async (packageData) => {
  let imageCode = {
    url: "",
    alt: "",
  };
  try {
    // Select a random image from the list of image IDs
    if (packageData.images.length > 0) {
      imageCode = pickOne(helpers.mapImages(packageData.images));
    }

    // Check if safe images exist
    if (typeof imageCode.url === "undefined") {
      imageCode = await pickSafeImage(packageData);
    }

    // Check if an image can be fetched from the destination
    if (
      typeof imageCode.url === "string" ||
      typeof imageCode.url === "undefined"
    ) {
      const destinationData = await getPackageDestinationData(packageData);

      // Fallback images based on destination
      if (typeof destinationData === "object") {
        if (destinationData.length > 0) {
          imageCode = pickOne(helpers.mapImages(destinationData[0].images));
          // const fallbackImages = await getFallbackImages(destinationData[0]);
          // if (fallbackImages[0].images.length) {
          //   imageCode = pickOne(helpers.mapImages(fallbackImages[0].images));
          // }
        }
      }

      // Check for non-empty string
      if (typeof imageCode.url === "string") {
        if (imageCode.url === "") {
          imageCode = selectFallbackImage(packageData, destinationData);
        }
      }

      // Check for undefined
      if (typeof imageCode.url === "undefined") {
        imageCode = selectFallbackImage(packageData, destinationData);
      }
    }
  } catch (err) {
    console.warn("[getPackageImage] Exception:", err.message);
  }
  return imageCode;
};

const getNewsletterPackagesIds = (newsletterPackagesData) => {
  let list = [];
  console.log(">>>", newsletterPackagesData);
  if (newsletterPackagesData !== null) {
    for (let index in newsletterPackagesData) {
      list.push(newsletterPackagesData[index].item);
    }
  }
  return list;
};

const getPackageImageIds = (newsletterPackagesData) => {
  let list = [];
  for (let index in newsletterPackagesData) {
    newsletterPackagesData[index];
    for (let indexImages in newsletterPackagesData[index].images) {
      list.push(newsletterPackagesData[index].images[indexImages]);
    }
  }
  return list;
};

const getNewsletterPackagesData = async (newsletterId, collectionName) => {
  if (typeof collectionName !== "string") {
    collectionName = "newsletters_packages";
  }
  return await getItems({
    collection: collectionName,
    params: {
      filter: {
        newsletters_id: {
          _eq: newsletterId,
        },
      },
    },
  });
};

const getRegionsData = async () => {
  return await getItems({
    collection: "regions",
    params: {},
  });
};

const getCountriesData = async () => {
  return await getItems({
    collection: "countries",
    params: {},
  });
};

const getCitiesData = async () => {
  return await getItems({
    collection: "cities",
    params: {},
  });
};

const getProvincesData = async () => {
  return await getItems({
    collection: "provinces",
    params: {},
  });
};

const getImageByName = async (imageName) => {
  return await getItems({
    collection: "images",
    params: {
      filter: {
        name: imageName,
      },
    },
  });
};

const getImagesData = async (imageIdsList) => {
  let imagesData = [];
  if (imageIdsList.length == 0) {
    return imagesData;
  }
  return await getItems({
    collection: "images",
    params: {
      fields: helpers.allFieldsPlusImage,
      filter: {
        id: {
          _in: imageIdsList,
        },
      },
    },
  });
};

const getNewsletterPackagesByIdList = async (packageIds) => {
  let packagesData = [];
  if (packageIds.length == 0) {
    return packagesData;
  }
  return await getItems({
    collection: "packages",
    params: {
      filter: {
        id: {
          _in: packageIds,
        },
      },
    },
  });
};

const getSiteUrl = () => {
  return window.location.origin;
};

const pickOne = (array) => {
  return array[Math.round(Math.random() * (array.length - 1))];
};

// Get all newsletters
const { getItems } = useDirectusItems();
let newsletterData = await getItems({
  collection: "newsletters",
  params: {},
});
const regionsData = await getRegionsData();
const countriesData = await getCountriesData();
const citiesData = await getCitiesData();
const provincesData = await getProvincesData();
</script>
<style scoped>
.preview-html {
  background-color: white;
  border: 1px solid silver;
  color: black;
  font-family: monospace;
}
.btn {
  background-color: black;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 15px;
}
</style>
