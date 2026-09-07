# 🧭 TripoSpace — Full-Stack Travel Accommodation Platform

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-v5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB%20Atlas-green.svg)](https://www.mongodb.com/atlas)
[![Bootstrap](https://img.shields.io/badge/styling-Bootstrap%205.3%20%2B%20CSS-purple.svg)](https://getbootstrap.com/)
[![Render](https://img.shields.io/badge/deployed-Render-46E3B7.svg)](https://tripospace.onrender.com/listings)

**TripoSpace** is a modern, responsive, full-stack travel accommodation platform inspired by Airbnb. Built with Node.js, Express, MongoDB Atlas, and EJS, it delivers a rich guest and host experience with interactive maps, live booking calculators, categorized stay discovery, wishlist management, and complete dark mode support.

🌐 **Live Demo:** [tripospace.onrender.com](https://tripospace.onrender.com/listings)

---

## 🌟 Key Features

### 1. 🏷️ Category-Driven Discovery
- **11 Curated Categories**: Filter stays by *Trending*, *Rooms*, *Iconic Cities*, *Mountains*, *Amazing Pools*, *Camping*, *Farms*, *Castles*, *Arctic*, *Beachfront*, and *Luxury*.
- **"All" Quick Reset**: Instant single-tap button to clear category filters while preserving other active search parameters.
- **Native Touch-Friendly Scroll**: Horizontal category bar with smooth touch swiping on mobile and zero-layout-shift controls on desktop.

### 2. 🎴 Modern Listing Cards & Grid
- **20/19 Aspect Ratio**: Standardized image framing with `onerror` fallbacks to eliminate broken thumbnails.
- **Dynamic Rating Badges**: Real-time review score calculation (e.g. `★ 4.8 (12)` or `★ New`).
- **Live Tax Calculation Toggle**: "Display total after taxes" switch calculates real-time **+18% GST** on all cards without page reloads.
- **Interactive Wishlist**: AJAX-powered heart button with optimistic toggle animations.
- **Filter Modal**: Multi-parameter search by nightly price range, guest capacity, and amenities (WiFi, Pool, AC, Kitchen, Parking, TV, Fireplace).

### 3. 🗺️ Interactive Maps & View Switcher
- **Leaflet & OpenStreetMap**: Integrated interactive mapping with custom price pin badges.
- **Floating Map / List Switcher**: Toggle seamlessly between the responsive cards grid and a full-page interactive map view.

### 4. 🏡 Airbnb-Style Single Listing Experience
- **Photo Gallery & Lightbox**: Multi-photo layout with a high-resolution Bootstrap lightbox carousel modal.
- **Sticky Booking Widget**:
  - Live check-in & checkout date pickers with automatic night counter.
  - Guest capacity selector.
  - Real-time cost breakdown: Nightly subtotal, cleaning fee, TripoSpace service fee (8%), and GST (18%).
  - Interactive "Reserve Stay" confirmation modal.
- **Review Category Breakdown**: Visual progress meters for *Cleanliness*, *Accuracy*, *Communication*, and *Location*.
- **Similar Stays Carousel**: Recommends related stays in the same category or geographic region.

### 5. 📱 Flawless Mobile Responsiveness
- **Dedicated Mobile Drawer**: Custom drop-down drawer with opaque elevation background that eliminates content overlap.
- **Touch Targets**: 44px+ tap targets for navigation links, wishlist toggles, and reservation buttons.
- **Zero Horizontal Overflow**: Enforced `overflow-x: hidden;` across all viewports.

### 6. 🌓 Full-Page Dark Mode
- Seamless day/night theme toggle with persistent `localStorage` preference.
- Synchronized `data-theme` and `data-bs-theme` tokens with inline pre-render script to prevent Flash of Unstyled Content (FOUC).

### 7. 🔐 Authentication, Authorization & Security
- User registration, login, and session persistence using **Passport.js** and **connect-mongo**.
- Role-based permissions: Only stay owners can edit or delete their listings.
- Author-only review deletion protection.
- Input validation and sanitization using **Joi** schemas.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime & Server** | Node.js (v24+), Express.js (v5.1) |
| **Database & ODM** | MongoDB Atlas, Mongoose (v8.19) |
| **Session & Auth** | Passport.js, Passport-Local, Express-Session, Connect-Mongo |
| **Templating Engine** | EJS (Embedded JavaScript), EJS-Mate layouts |
| **Frontend Styling** | Vanilla CSS3 (Custom Properties), Bootstrap 5.3, Plus Jakarta Sans font |
| **Icons & Maps** | FontAwesome 6.5, Leaflet.js, OpenStreetMap |
| **Image Management** | Multer, Cloudinary, Multer-Storage-Cloudinary |
| **Deployment** | Render (Web Service), Cloudinary CDN |

---

## 📁 Project Structure

```text
Project1/
├── controllers/          # Business logic (MVC architecture)
│   ├── listings.js       # Search, filter, CRUD, and calculation logic
│   ├── reviews.js        # Review creation & deletion
│   └── users.js          # Authentication & wishlist handlers
├── init/                 # Database initialization & seed scripts
│   ├── data.js           # 29+ curated luxury demo stays across all 11 categories
│   └── index.js          # Seeding script supporting both Local and Atlas DB
├── middleware.js         # Auth checks, review author validation, schema middleware
├── models/               # Mongoose schemas & data models
│   ├── listing.js        # Listing schema (geometry, category, capacity, amenities)
│   ├── review.js         # Review schema with author references
│   └── user.js           # User schema with Passport plugin and wishlist array
├── public/               # Static frontend assets
│   ├── css/
│   │   ├── style.css     # Design system, dark mode tokens, mobile queries
│   │   └── rating.css    # Starability review rating stars
│   └── js/
│       ├── tripospace.js # Client-side interactive engine (taxes, map, scroll)
│       └── script.js     # Form validation helpers
├── routes/               # Express modular routers
│   ├── listing.js        # /listings routes
│   ├── review.js         # /listings/:id/reviews routes
│   └── user.js           # /signup, /login, /wishlist routes
├── schema.js             # Joi validation schemas for listings & reviews
├── utils/                # Error handling utilities (ExpressError, wrapAsync)
├── views/                # EJS templates
│   ├── includes/         # Navbar, footer, and flash partials
│   ├── info/             # Privacy policy & terms of service pages
│   ├── layouts/          # Boilerplate master layout
│   ├── listings/         # Explore grid, show detail, new, and edit views
│   └── users/            # Login, signup, and wishlist views
├── app.js                # Application entrypoint & server setup
├── commit.sh             # Custom automated Git commit assistant
├── package.json          # Dependencies and npm scripts
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- [Cloudinary Account](https://cloudinary.com/) (for image upload storage)

### 1. Clone the Repository
```bash
git clone https://github.com/suffun/TripoSpace.git
cd TripoSpace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Configuration
Create a `.env` file in the root directory:
```env
# Cloudinary Credentials (for photo uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MongoDB Connection Strings
LOCAL_MONGO_URL=mongodb://127.0.0.1:27017/TripoSpace
ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tripospaceDB?retryWrites=true&w=majority

# Session Secret
SECRET=your_super_secret_session_key

# Environment
NODE_ENV=development
```

### 4. Seed the Database
Populate your database with the curated demo properties:

```bash
# To seed your local MongoDB database:
node init/index.js local

# To seed your MongoDB Atlas cloud database:
node init/index.js atlas
```

### 5. Start the Application
```bash
# Start development server with Nodemon:
npm run dev

# Or start standard Node process:
npm start
```
Open your browser at **`http://localhost:8080`**.

---

## 📡 RESTful API Endpoints

### Listings
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/listings` | Explore stays with optional search & category filters | No |
| `GET` | `/listings/new` | Render form to create a new stay | Yes |
| `POST` | `/listings` | Create a new listing with uploaded image | Yes |
| `GET` | `/listings/:id` | View detailed stay page (gallery, map, booking) | No |
| `GET` | `/listings/:id/edit`| Render form to edit listing | Yes (Owner) |
| `PUT` | `/listings/:id` | Update existing listing details or photo | Yes (Owner) |
| `DELETE`| `/listings/:id` | Delete listing and its associated reviews | Yes (Owner) |

### Reviews
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/listings/:id/reviews` | Submit a review with star rating and comment | Yes |
| `DELETE`| `/listings/:id/reviews/:reviewId` | Delete a review | Yes (Author) |

### Users & Wishlist
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/signup` | Render signup form | No |
| `POST` | `/signup` | Register new user account | No |
| `GET` | `/login` | Render login form | No |
| `POST` | `/login` | Authenticate user session | No |
| `GET` | `/logout` | Terminate user session | Yes |
| `GET` | `/wishlist` | View saved wishlist stays | Yes |
| `POST` | `/wishlist/toggle/:id`| AJAX toggle stay in/out of wishlist | Yes |

### Admin & Utilities
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/admin/seed-demo-data?secret=...` | Production one-click database seeder | Secret Key |
| `GET` | `/privacy` | Privacy Policy page | No |
| `GET` | `/terms` | Terms of Service page | No |

---

## 🚢 Deployment (Render)

1. Push your code to GitHub:
   ```bash
   git push origin main
   ```
2. Create a new **Web Service** on [Render](https://render.com/).
3. Connect your GitHub repository: `TripoSpace`.
4. Configure service settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
5. In the **Environment Variables** tab, add:
   - `NODE_ENV` = `production`
   - `ATLASDB_URL` = `<your-mongodb-atlas-url>`
   - `SECRET` = `<your-session-secret>`
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`
6. Once deployed, trigger the one-click seeder to populate demo properties:
   ```text
   https://your-service.onrender.com/admin/seed-demo-data?secret=tripospace_seed_demo_2026
   ```

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Sufiyan Khan**
- GitHub: [@suffun](https://github.com/suffun)
- Repository: [TripoSpace](https://github.com/suffun/TripoSpace)
