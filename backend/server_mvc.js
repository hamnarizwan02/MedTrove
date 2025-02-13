// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const Stripe = require('stripe');
// const stripe = Stripe('sk_test_51QmvIF07WWhTO31txQtIXqvhXvPzWgNqQ71NxY6mh3DTkg3Kh3bUFjaMHwvh1OcYXnxcprkkJR4gFSX58vjgCe2400ifIevHTL');

// const authRoutes = require('./routes/authRoutes');
// const medicineRoutes = require('./routes/medicineRoutes');
// const alternativeRoutes = require('./routes/alternativeRoutes');
// const priceRoutes = require('./routes/priceRoutes');
// const DDIRoutes = require('./routes/DDIRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const currentUser = require('./routes/currentUserRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.use('/api', authRoutes);
// app.use('/api', medicineRoutes);
// app.use('/api', alternativeRoutes);
// app.use('/api', priceRoutes);
// app.use('/api', cartRoutes);
// app.use('/api', currentUser);
// app.use('/user', userRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://i210603:hamna123@medtrove.r56y0tg.mongodb.net/medTrove', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });    

// app.get('/checkout', (req, res) => {
//   const { clientSecret } = req.query;
  
//   if (!clientSecret) {
//     return res.status(400).send('Client secret is required');
//   }

//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Checkout</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <script src="https://js.stripe.com/v3/"></script>
//       </head>
//       <body>
//         <div id="payment-element"></div>
//         <button id="submit">Pay now</button>
//         <div id="error-message"></div>
        
//         <script>
//           const stripe = Stripe('${CONFIG.STRIPE_PUBLISHABLE_KEY}');
//           const elements = stripe.elements({ clientSecret: '${clientSecret}' });
//           const paymentElement = elements.create('payment');
//           paymentElement.mount('#payment-element');

//           document.getElementById('submit').addEventListener('click', async () => {
//             try {
//               const { error } = await stripe.confirmPayment({
//                 elements,
//                 confirmParams: {
//                   return_url: '${CONFIG.successUrl}',
//                 },
//               });

//               if (error) {
//                 const messageDiv = document.getElementById('error-message');
//                 messageDiv.textContent = error.message;
//               }
//             } catch (err) {
//               console.error('Payment error:', err);
//               const messageDiv = document.getElementById('error-message');
//               messageDiv.textContent = 'An unexpected error occurred';
//             }
//           });
//         </script>
//       </body>
//     </html>
//   `);
// });

// app.get('/success', (req, res) => {
//   const { payment_intent, payment_intent_client_secret, redirect_status } = req.query;
  
//   if (redirect_status === 'succeeded') {
//     // You can render a success page here if you want
//     res.send(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Payment Successful</title>
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <script>
//             // This will help close the WebView properly
//             setTimeout(() => {
//               window.location.href = '/payment-completed';
//             }, 1000);
//           </script>
//         </head>
//         <body>
//           <h1>Payment Successful!</h1>
//           <p>Redirecting...</p>
//         </body>
//       </html>
//     `);
//   } else {
//     res.status(400).send('Payment failed');
//   }
// });

// Add a route to handle the final redirect


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./controllers/CurrentUserController');

const CONFIG = require('./config');
dotenv.config(); 

const stripe = require('stripe')(CONFIG.STRIPE_SECRET_KEY);

const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const alternativeRoutes = require('./routes/alternativeRoutes');
const priceRoutes = require('./routes/priceRoutes');
const DDIRoutes = require('./routes/DDIRoutes');
const cartRoutes = require('./routes/cartRoutes');
const currentUser = require('./routes/currentUserRoutes');
const userRoutes = require('./routes/userRoutes');
const addressInfoRoutes = require('./routes/addressInfoRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
const remindermedsRoutes = require('./routes/remindermedsRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', medicineRoutes);
app.use('/api', alternativeRoutes);
app.use('/api', priceRoutes);
app.use('/api', cartRoutes);
app.use('/api', currentUser);
app.use('/user', userRoutes);
app.use('/api', addressInfoRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api', DDIRoutes);

console.log('Available routes:', remindermedsRoutes.stack
  .filter(r => r.route)
  .map(r => ({
      path: r.route.path,
      methods: Object.keys(r.route.methods)
  }))
);

app.use('/api', remindermedsRoutes);

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Payment Error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

app.get('/checkout', (req, res) => {
  const { clientSecret } = req.query;
  
  if (!clientSecret) {
    return res.status(400).send('Client secret is required');
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Checkout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://js.stripe.com/v3/"></script>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            min-height: 100vh;
          }
          
          .container {
            max-width: 450px;
            margin: 0 auto;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          h1 {
            color: #32325d;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
          }
          
          #payment-element {
            margin-bottom: 24px;
          }
          
          #submit {
            background: #064D65;
            color: white;
            border-radius: 6px;
            border: none;
            padding: 12px 16px;
            font-weight: 600;
            width: 100%;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          #submit:hover {
            filter: brightness(110%);
          }
          
          #submit:disabled {
            background-color: #697386;
            cursor: default;
          }
          
          #error-message {
            color: #dc3545;
            text-align: center;
            margin-top: 12px;
            font-size: 14px;
          }
          
          .processing {
            display: none;
            text-align: center;
            margin-top: 12px;
          }
          
          .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #5469d4;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin: 10px auto;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Complete Your Payment</h1>
          <div id="payment-element"></div>
          <button id="submit">Pay now</button>
          <div id="error-message"></div>
          <div class="processing" id="processing">
            <div class="spinner"></div>
            <p>Processing your payment...</p>
          </div>
        </div>
        
        <script>
          const stripe = Stripe('${CONFIG.STRIPE_PUBLISHABLE_KEY}');
          const elements = stripe.elements({
            clientSecret: '${clientSecret}',
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#5469d4',
              }
            }
          });
          
          const paymentElement = elements.create('payment');
          paymentElement.mount('#payment-element');
          
          const submitButton = document.getElementById('submit');
          const processingDiv = document.getElementById('processing');
          const errorMessage = document.getElementById('error-message');
          
          submitButton.addEventListener('click', async () => {
            submitButton.disabled = true;
            processingDiv.style.display = 'block';
            errorMessage.textContent = '';
            
            try {
              const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                  return_url: '${CONFIG.successUrl}',
                }
              });
              
              if (error) {
                errorMessage.textContent = error.message;
                submitButton.disabled = false;
                processingDiv.style.display = 'none';
              }
            } catch (err) {
              errorMessage.textContent = 'An unexpected error occurred';
              submitButton.disabled = false;
              processingDiv.style.display = 'none';
            }
          });
        </script>
      </body>
    </html>
  `);
});

app.get('/success', (req, res) => {
  const { redirect_status } = req.query;
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Successful</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .success-container {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
          }
          
          .success-icon {
            width: 60px;
            height: 60px;
            background: #28a745;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
          }
          
          .checkmark {
            color: white;
            font-size: 30px;
            transform: rotate(45deg);
          }
          
          h1 {
            color: #32325d;
            margin-bottom: 12px;
          }
          
          p {
            color: #6b7c93;
            margin-bottom: 0;
          }
        </style>
        <script>
          setTimeout(() => {
            window.location.href = '/payment-completed';
          }, 2000);
        </script>
      </head>
      <body>
        <div class="success-container">
          <div class="success-icon">
            <span class="checkmark">✓</span>
          </div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. You will be redirected shortly.</p>
        </div>
      </body>
    </html>
  `);
});

app.get('/payment-completed', (req, res) => {
  res.send('PAYMENT_COMPLETED'); 
});

app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    details: err
  });
  
  if (err.name === 'MongooseError') {
    return res.status(500).json({
      success: false,
      message: 'Database error',
      error: err.message
    });
  }
  
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  next(err);
});

// Error handling middleware should be after all routes
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect('mongodb+srv://i210603:hamna123@medtrove.r56y0tg.mongodb.net/medTrove', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});