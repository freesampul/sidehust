const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51MKsf9DT4vO9oNMHxNBXZYgcrEDlb0BNnNdS0L5bjTHD7gIM2vnXohrEP9DMD2GU9IYCDzhQt5amEanG7NwW7jGG00wJveSBEx');

admin.initializeApp();

exports.handleStripeCheckoutCompleted = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, 'whsec_IrLF3DrmHrbbWqfWXkHhHkjkq4znx6Vl');

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Extract relevant data from the session
      const customerId = session.customer;
      const subscriptionPrice = (session.amount_total / 100); 

      let points = 0;
      if (subscriptionPrice === 10) {
        points = 10; 
      } else if (subscriptionPrice === 15) {
        points = 20; 
      } else if (subscriptionPrice === 20) {
        points = 30; 
      }

      const userPointsRef = admin.firestore().collection('userPoints').doc(customerId);
      const userPointsSnapshot = await userPointsRef.get();

      let currentPoints = 0;
      if (userPointsSnapshot.exists) {
        currentPoints = userPointsSnapshot.data().points;
      }

      const totalPoints = currentPoints + points;

      await userPointsRef.set({
        points: totalPoints
      }, { merge: true });

      console.log(`Updated points for user ${customerId} to ${totalPoints}`);
    }

    res.status(200).send('Webhook received successfully');
  } catch (err) {
    console.error('Error handling webhook:', err.message);
    res.status(400).send('Webhook Error: ' + err.message); // Corrected error response
  }
});
