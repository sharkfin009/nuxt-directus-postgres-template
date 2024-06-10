import jsConvert, { toSentenceCase } from "js-convert-case";
    import { env } from "process";


export default (router, { services, exceptions, database, schema }) => {
  router.post("/send", async (req, res) => {
    console.log("enquiry received", req.body);
    const { MailService, ItemsService, UsersService } = services;
    const { ServiceUnavailableException, ForbiddenException } = exceptions;



    let customerLiquidArray = [];
    if (req.body.customerFormData) {

    for (const [key, value] of Object.entries(req.body.customerFormData)) {
      customerLiquidArray.push(`${jsConvert.toSentenceCase(key)}:${value}`);
    }
  }
    let enquiryLiquidArray = [];

    if ( req.body.enquiryFormData){
    for (let [key, value] of Object.entries(req.body.enquiryFormData)) {
      if (key === "minors") {
        key = "minors(2 to 11 years)";
        let array = JSON.parse(value);
        let no = array.length;
        if (no > 0) {
          value = `${no} Minor${no == 1 ? "" : "s"} ( Birthdate${(no = 1
            ? ""
            : "s")} ${array.join(", ")} )`;
        } else value = "";
      }
      if (key === "no_of_infants") {
        console.log("infants", value);
        key = "Infants(up to 2 years)";
        value = value !== '""' ? value : "";
      }
      enquiryLiquidArray.push(`${jsConvert.toSentenceCase(key)}:${value}`);
    }
  }
    let enquiriesDict = {
      general_enquiries: "General",
      package_enquiries: "Package",
      group_enquiries: "Group",
      flight_special_enquiries: "Flight Special",
      contact_enquiries: "Contact Us",
    };
console.log(env['EMAIL_TEMPLATES_PATH'])
    let data = {
      enquiryType: enquiriesDict[req.body.enquiryType],
      customer: customerLiquidArray,
      enquiry: enquiryLiquidArray,
      consultant: req.body.consultant,
      imageURL: req.body.imageURL,
    };

    let subject =
      "A new " + enquiriesDict[req.body.enquiryType] + " Enquiry has come in";
    console.log("data", JSON.stringify(data, null, 4));
    const mailService = new MailService({ schema });
    await mailService.send({
      to: [
        "lala@hippl.co",
        "sharkfin007@yahoo.com",
        "ben.amato@gmail.com",
        "lindsay@computravel.co.za",
      ],
      subject,
      template: {
        name: "enquiry",
        data: {
          data,
        },
      },
    });
    
    
    data.title = req.body?.title;   
    console.log("customer email", JSON.stringify(req.body.title));
    let confirmationSubject =
      "Thank you for your enquiry";
    await mailService.send({
      to: [req.body?.customerFormData?.email],
      subject: confirmationSubject,
      template: {
        name: "enquiry_confirmation",
        data: {
          data,
        },
      },
    });

    res.send(data);
  });
};
