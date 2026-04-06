# Premium-eCommerce Server

### Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install deps: `npm install`
3. Run in development: `npm run dev`

Required environment variables:
- `MONGO_URI` (MongoDB connection string)
- `JWT_SECRET` (JWT signing secret)

Optional environment variables:
- `PORT` (default: 5000)
- `CORS_ORIGIN` (comma-separated allowed origins)
- `ADMIN_SECRET` (required only for `POST /api/auth/seed-admin`)

Endpoints:
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `GET /api/auth/me` — profile (protected)
- `GET /api/products` — list/search products
- `GET /api/products/:id` — single product
- `POST /api/orders` — create order (protected)
- `GET /api/orders/my` — my orders (protected)
- `GET /api/health` — liveness endpoint

This server is a minimal production-ready scaffold: add validation, rate-limiting, logging, and cloud image uploads as needed.
