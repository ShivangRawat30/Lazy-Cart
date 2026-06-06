# LazyCart

This is a full-stack ecommerce website built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS. The website provides various features such as user authentication, product listing, shopping cart, search functionality, pagination, payment integration, and more.

![lazy cart Screenshot](./1.png)
![lazy cart Screenshot](./2.png)
![lazy cart Screenshot](./3.png)

## Features

- User Registration and Authentication:
  - Sign up using email and password.
  - Log in with email and password.
  - Forgot password functionality to reset password via email.

- Product Listing:
  - Display a list of products with details such as name, price, description, and images.
  - Categorize products into different categories for easy navigation.

- Shopping Cart:
  - Add products to the cart.
  - Update quantity or remove items from the cart.
  - Calculate the total price of items in the cart.

- Search Functionality:
  - Search for products based on keywords or categories.

- Pagination:
  - Display products in multiple pages for better performance and user experience.

- Payment Integration:
  - Integrate with a payment gateway to allow users to make payments for their orders.
  - Provide a secure and seamless payment process.

## Tech Stack

The project is built using the following technologies:

- **MongoDB**: A NoSQL database used to store product and user data.
- **Express.js**: A Node.js framework used for building the backend API.
- **React.js**: A JavaScript library used for building the frontend user interface.
- **Node.js**: A JavaScript runtime environment used for server-side scripting.
- **Tailwind CSS**: A utility-first CSS framework used for styling the website.

### Full Dependency Stack

| Layer | Libraries |
|-------|-----------|
| **Backend runtime** | Express 4, Mongoose 7 (MongoDB Atlas) |
| **Auth** | `jsonwebtoken` (JWT), `bcrypt` (password hashing), `cookie-parser` (httpOnly cookie sessions) |
| **Media & uploads** | `cloudinary` (image hosting), `express-fileupload` |
| **Payments** | `stripe` (server) + `@stripe/react-stripe-js` / `@stripe/stripe-js` (client) |
| **Email** | `nodemailer` (password-reset mails) |
| **Misc backend** | `cors`, `body-parser`, `dotenv`, `validator` |
| **Frontend core** | React 18 (CRA), `react-router-dom` v6, `axios` |
| **State** | Redux Toolkit (`@reduxjs/toolkit`, `react-redux`, `redux-thunk`) |
| **UI** | Material-UI v4 + MUI v5, Tailwind CSS, `react-alert`, `react-rating-stars-component`, `react-js-pagination` |

---

## Architecture

LazyCart is a classic **decoupled MERN application**: a React single-page app (SPA)
talks to a stateless Express REST API over JSON, and the API persists to MongoDB.
Authentication is **cookie-based** (a signed JWT stored in an `httpOnly` cookie),
images live on **Cloudinary**, and checkout is handled by **Stripe**.

```
┌──────────────────────────────────────────────────────────────────────┐
│                          BROWSER (SPA)                                 │
│  React 18 + Redux Toolkit + React Router v6                            │
│                                                                        │
│   UI Components ── dispatch ──> Redux Slices ── thunks ──> axios       │
│   (pages/cards)                 (user, products,          (baseURL +   │
│        ▲                         cart, order)              withCreds)   │
│        └──────── re-render on store change ◀────────────────┘          │
└─────────────────────────────────┬────────────────────────────────────┘
                                   │  HTTPS / JSON  (cookie: token=<JWT>)
                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      EXPRESS REST API  (/api/v1)                       │
│  server.js → app.js → routes → controllers → models                   │
│                                                                        │
│   middleware:  cors · cookieParser · fileUpload · auth · errorHandler  │
│   utils:       jwtToken · sendEmail · apiFeatures · errorhandler       │
└──────┬───────────────────┬──────────────────┬──────────────┬──────────┘
       │                   │                  │              │
       ▼                   ▼                  ▼              ▼
  MongoDB Atlas        Cloudinary          Stripe        Nodemailer
  (Mongoose ODM)     (image storage)    (payments)    (reset emails)
```

### Request lifecycle (backend)

```
HTTP request
  → server.js            (boots app, loads env, connects DB, configures Cloudinary)
  → app.js               (global middleware, mounts /api/v1 routers)
  → routes/*.js          (path + method → guard(s) → controller)
  → middleware/auth.js   (isAuthenticatedUser → verify JWT cookie; authrizeRoles → RBAC)
  → controllers/*.js     (business logic, wrapped in catchAsyncError)
  → models/*.js          (Mongoose schema validation + persistence)
  → middleware/error.js  (centralised error formatting → JSON)
```

---

## Repository Structure

```
Lazy-Cart/
├── backend/
│   ├── server.js              # Entry point: env, DB connect, Cloudinary, listen
│   ├── app.js                 # Express app: middleware + route mounting (/api/v1)
│   ├── config/
│   │   ├── database.js        # Mongoose connection
│   │   └── config.env         # Secrets (gitignored — see Environment Variables)
│   ├── routes/                # productRoute, userRoutes, orderRoute, paymentRoute
│   ├── controllers/           # product, user, order, payment business logic
│   ├── models/                # productModel, userModel, orderModel (Mongoose schemas)
│   ├── middleware/
│   │   ├── auth.js            # isAuthenticatedUser, authrizeRoles
│   │   ├── catchAsyncError.js # async wrapper
│   │   └── error.js           # global error handler
│   └── utils/
│       ├── jwtToken.js        # sendToken — signs JWT + sets httpOnly cookie
│       ├── sendEmail.js       # Nodemailer transport
│       ├── apiFeatures.js     # search / filter / pagination query builder
│       └── errorhandler.js    # ErrorHandler class
│
├── frontend/
│   └── src/
│       ├── index.js           # axios baseURL + withCredentials, store Provider
│       ├── App.js             # Routes (public + ProtectedRoute), loadUser, Stripe
│       ├── store.js           # configureStore({ user, products, cart, order })
│       ├── enhancements.css   # Global design system (CSS variables, tokens)
│       ├── Slices/            # Redux Toolkit slices (async thunks → axios)
│       │   ├── userSlice.js   # auth, profile, password, admin users
│       │   ├── productSlice.js# product list + details + reviews
│       │   ├── cartSlice.js   # cart items (+ localStorage), shippingInfo
│       │   └── orderSlice.js  # create order, my orders, order details
│       └── component/
│           ├── home/          # Home (hero + featured), product card
│           ├── product/       # ProductPage (grid+filters), ProductDetails
│           ├── Cart/          # Cart, Shipping, ConfirmOrder, Payment, OrderSuccess
│           ├── user/          # LoginSignup, Profile, Update*, *Password
│           ├── Orders/        # MyOrders, OrderDetails
│           ├── Route/         # ProtectedRoute (auth gate, v6)
│           └── layout/        # Navbar, Footer, Loader, Contact, About, MetaData
│
└── vercel.json                # Deploys the backend as a serverless function
```

---

## Data Models

**User** — `name`, `email` (unique), `password` (bcrypt-hashed, `select:false`),
`avatar { public_id, url }`, `role` (`user` | `admin`), `createdAt`,
`resetPasswordToken/Expire`. Methods: `getJWTToken()`, `comparePassword()`,
`getResetPasswordToken()`.

**Product** — `name`, `description`, `price`, `ratings`, `images[] { public_id, url }`,
`category`, `Stock`, `numOfReviews`, `reviews[] { user, name, rating, comment }`,
`user` (creator), `createdAt`.

**Order** — `shippingInfo { address, city, state, country, pinCode, phoneNo }`,
`orderItems[] { name, price, quantity, image, product→Product }`, `user→User`,
`paymentInfo { id, status }`, `paidAt`, `itemsPrice`, `taxPrice`, `shippingPrice`,
`totalPrice`, `orderStatus`, `deliveredAt`.

---

## API Reference

All endpoints are mounted under **`/api/v1`**. Guards: 🔒 = logged-in user
(`isAuthenticatedUser`), 👑 = admin only (`authrizeRoles("admin")`).

### Products
| Method | Path | Guard | Description |
|--------|------|-------|-------------|
| GET | `/products` | — | List products (search / filter / paginate) |
| GET | `/product/:id` | — | Product details |
| GET | `/reviews` | — | Reviews of a product |
| POST | `/product/new` | 🔒 | Create product |
| PUT | `/product/:id` | 🔒 | Update product |
| DELETE | `/product/:id` | 🔒 | Delete product |
| PUT | `/review` | 🔒 | Create / update a review |
| DELETE | `/reviews` | 🔒 | Delete a review |

### Users / Auth
| Method | Path | Guard | Description |
|--------|------|-------|-------------|
| POST | `/register` | — | Register (uploads avatar to Cloudinary), sets cookie |
| POST | `/login` | — | Login, sets JWT cookie |
| GET | `/logout` | — | Clear auth cookie |
| POST | `/password/forgot` | — | Email a reset token |
| PUT | `/password/reset/:token` | — | Reset password |
| GET | `/me` | 🔒 | Current user (used to restore session on refresh) |
| PUT | `/password/update` | 🔒 | Change password |
| PUT | `/me/update` | 🔒 | Update profile |
| GET | `/admin/users` | 👑 | List all users |
| GET·PUT·DELETE | `/admin/user/:id` | 👑 | Get / change role / delete a user |

### Orders
| Method | Path | Guard | Description |
|--------|------|-------|-------------|
| POST | `/order/new` | 🔒 | Place an order |
| GET | `/order/:id` | 🔒 | Single order |
| GET | `/orders/me` | 🔒 | Current user's orders |
| GET | `/admin/orders` | 👑 | All orders |
| PUT·DELETE | `/admin/order/:id` | 👑 | Update status / delete order |

### Payment
| Method | Path | Guard | Description |
|--------|------|-------|-------------|
| POST | `/payment/process` | 🔒 | Create a Stripe PaymentIntent → returns `client_secret` |
| GET | `/stripeApiKey` | 🔒 | Return the Stripe publishable key to the client |

---

## Frontend Architecture

- **State management** — Redux Toolkit `configureStore` with four slices
  (`user`, `products`, `cart`, `order`). Each slice uses `createAsyncThunk` to call
  the API through a shared `axios` instance configured once in `index.js`
  (`baseURL` → backend, `withCredentials: true` so the auth cookie is always sent).
- **Routing** — `react-router-dom` v6. Public routes (home, products, product
  details, login, cart, contact, about) and **protected** routes wrapped in
  `<ProtectedRoute>` (account, profile/password updates, the whole checkout flow,
  orders), which waits for the auth check and redirects to `/login` if unauthenticated.
- **Cart persistence** — `cartSlice` mirrors `cartItems` and `shippingInfo` to
  `localStorage`, so the cart survives refreshes. `addItemsToCart` is a thunk that
  fetches full product details before adding a correctly-shaped item.
- **Design system** — `enhancements.css` defines CSS variables (coral brand color,
  ink/neutral palette, shadows, radii) consumed by every page for a consistent look.

### Key Flows

**Authentication**
```
LoginSignup → loginUser/registerUser thunk → POST /login|/register
            → backend sets httpOnly `token` cookie + returns user
App mount   → loadUser() → GET /me (cookie) → isAuthenticated = true
ProtectedRoute reads isAuthenticated to gate pages; session survives refresh.
```

**Checkout**
```
Cart → "Proceed to Checkout" → /login/shipping (Shipping form → saveShippingInfo)
     → /order/confirm (ConfirmOrder: totals = subtotal + 18% tax + shipping)
     → /process/payment (Stripe Elements):
          POST /payment/process → client_secret → stripe.confirmCardPayment(...)
          → on success: createOrder() → POST /order/new → /success
```

---

## Environment Variables

Create **`backend/config/config.env`** (gitignored):

```env
PORT=4000
DATABASE=mongodb+srv://<user>:<PASSWORD>@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
DATABASE_PASSWORD=your_db_password   # substituted into <PASSWORD> in DATABASE
JWT_SECRET=any_long_random_string
JWT_EXPIRE=5d
COOKIE_EXPIRE=5
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
STRIPE_API_KEY=pk_test_...           # publishable (sent to client)
STRIPE_API_SECRET=sk_test_...        # secret
SMPT_HOST=smtp.gmail.com             # note: code uses the "SMPT" spelling
SMPT_PORT=465
SMPT_SERVICE=gmail
SMPT_MAIL=you@example.com
SMPT_PASSWORD=your_app_password
```

> The connection string must include the **database name** (`/ecommerce`); without
> it Mongoose defaults to the empty `test` database. `config/database.js` replaces
> the literal `<PASSWORD>` token in `DATABASE` with `DATABASE_PASSWORD`.

---

## Getting Started (Local)

```bash
# 1. Backend deps (root package.json) + start API on :4000
npm install
npm run dev            # nodemon backend/server.js   (or: npm start)

# 2. Frontend deps + start SPA on :3000
cd frontend
npm install
npm start
```

The frontend talks to the backend at `http://localhost:4000` (configured in
`frontend/src/index.js`); the backend allows the `http://localhost:3000` origin
with credentials (in `backend/app.js`).

### Deployment notes
For production you must point the frontend at the deployed backend URL (parameterize
the axios `baseURL`), set the backend CORS origin to the deployed frontend URL, add a
SPA rewrite (all routes → `index.html`) for React Router, and — if the frontend and
backend are on different domains — set the auth cookie to `SameSite=None; Secure`.

---

## NPM Scripts

**Root (backend)** — `npm start` (node), `npm run dev` (nodemon)
**Frontend** — `npm start`, `npm run build`, `npm test`

