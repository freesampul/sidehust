const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp(); // Initialize Firebase Admin SDK

// Now you can use getFirestore function to access Firestore

//Get stripeKey from env file
const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookKey = process.env.STRIPE_WEBHOOK_SECRET;

const { Stripe } = require("stripe");
const stripe = new Stripe(stripeKey, {
  apiVersion: "2020-08-27", // Adjust the API version based on your needs
});

// Firestore reference
const db = getFirestore();

// Cloud Function to listen to Stripe webhooks
exports.stripeWebhookHandler = onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookKey);
  } catch (err) {
    logger.error("Error verifying Stripe webhook signature:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "invoice.payment_succeeded":
      const customerId = event.data.object.customer;

      // Retrieve customer information from Stripe
      const customer = await stripe.customers.retrieve(customerId);

      // Check if the customer has any subscriptions or successful payments
      if (
        customer.subscriptions.data.length > 0 ||
        customer.invoice_settings.default_payment_method
      ) {
        // Calculate the amount paid for the subscription
        const invoice = event.data.object;
        const amountPaid = invoice.amount_paid / 100; // Convert amount from cents to dollars

        // Update the points for the customer
        await addPointsToCustomer(customerId, amountPaid);
      }

      return res.status(200).send("Webhook received");

    default:
      logger.info(`Unhandled event type: ${event.type}`);
  }
});

// Function to add points to a customer's collection in Firestore
async function addPointsToCustomer(customerId, pointsToAdd) {
  const customerRef = doc(db, "customers", customerId);

  try {
    const customerDoc = await getDoc(customerRef);
    const currentPoints = customerDoc.data().points || 0;
    const newPoints = currentPoints + pointsToAdd;

    await updateDoc(customerRef, { points: newPoints });
  } catch (error) {
    logger.error("Error adding points to customer:", error);
    throw error;
  }
}
