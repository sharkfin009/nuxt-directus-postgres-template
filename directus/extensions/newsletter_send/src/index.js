

export default async(router, { services, exceptions, database, schema }) => {
  router.post("/send", async (req, res) => {
    console.log("send newsletter ext", req.body);
    const { MailService } = services;
    const mailService = new MailService({ schema });

    let mailList = [];
    for (let subscriber of req.body.subscribers) {
      mailList.push(subscriber.email);
    }
let recipients = [];
if(req.body.testMode){
recipients.push(...["lindsay@computravel.co.za","lala@hippl.co","ben.amato@gmail.com"])
} else {
  recipients.push(...mailList);
}
console.log("mailList", mailList);
console.log("recipients", recipients);
    
  try {
    await mailService.send({
      to: ["ben.amato@gmail.com","lindsay@computravel.co.za","lala@hippl.co"],
      subject: req.body.title,
      template: {
        name: "newsletter",
        data: {
          "html": req.body.html
        },
      },
    });
  }
  catch (error) {
    console.log("endpoint error", error);
  }
    res.send();
  });
};
