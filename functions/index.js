const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripeSec = process.env.STRIPE_SECRET_KEY;
const stripeWebHook = process.env.STRIPE_WEBHOOK_KEY;

const stripe = require('stripe')(stripeSec);

admin.initializeApp();

exports.handleStripeCheckoutCompleted = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebHook);

    if (event.type === 'invoice.payment_succeeded') {
      const session = event.data.object;
      
      console.log('Session object:', session);

      const customerId = session.customer;
      const customerEmail = session.customer_email;
      const subscriptionPrice = (session.amount_paid / 100); 

      let points = 0;
      if (subscriptionPrice > 0 && subscriptionPrice < 4) {
        points = 100; 
      } else if (subscriptionPrice > 4) {
        points = 250; 
      }

      const userPointsRef = admin.firestore().collection('userPoints').doc(customerId);
      const userPointsSnapshot = await userPointsRef.get();

      let currentPoints = 0;
      if (userPointsSnapshot.exists) {
        currentPoints = userPointsSnapshot.data().points;
      }

      const totalPoints = currentPoints + points;

      // Update userPoints document with points and email
      await userPointsRef.set({
        email: customerEmail,
        points: totalPoints
      }, { merge: true });

      console.log(`Updated points for user ${customerId} to ${totalPoints}`);
    }

    res.status(200).send('Webhook received successfully');
  } catch (err) {
    console.error('Error handling webhook:', err.message);
    res.status(400).send('Webhook Error: ' + err.message);
  }
});
