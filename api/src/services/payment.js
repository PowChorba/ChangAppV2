const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51Lb2ZIKO72YUdcCNms5TiiqU5bIrmzLzFNgZgmQKxdRkc6xw7v039b2peRu9zTnH15bpt4L39cWmFZ9KzoFgCCJT00mF6RRlOa"
  // "sk_test_51LcCp7EP7te43QfZE6MuPkgfb9GjW9ExMhKnMn1tZN8jPcwec1N9k07m2e66FvpRTCokPmb167adKo5emqqBLsrv00VXmB7WKQ"
);
const paymentMail = require("./Emails/sendEmails");

const paymentMethod = async (req, res) => {
  try {
    const { id, amount, email } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "ARS",
      payment_method: id,
      confirm: true,
    });
    res.send({ message: "Successful payment" });
    const asunto = "Pago del servicio";
    const mensaje =
      "Ha recibido el pago de su servicio con exito. Felicitaciones.";
    paymentMail.email(email, asunto, mensaje);
  } catch (error) {
    res.send({ message: error.raw.message });
  }
};

module.exports = {
  paymentMethod,
};