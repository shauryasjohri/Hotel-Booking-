# Hotel Booking Backend

Production-ready backend for the hotel booking application. Uses **Clerk** for authentication, **Supabase** (PostgreSQL) for data, and **Stripe** for payments.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `CLERK_SECRET_KEY` | From [Clerk Dashboard](https://dashboard.clerk.com) → API Keys |
| `CLERK_PUBLISHABLE_KEY` | From Clerk Dashboard |
| `SUPABASE_URL` | From [Supabase](https://supabase.com/dashboard) → Project Settings |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase → API (service_role, keep secret) |
| `STRIPE_SECRET_KEY` | From [Stripe Dashboard](https://dashboard.stripe.com) |
| `STRIPE_WEBHOOK_SECRET` | From Stripe → Webhooks (after creating endpoint) |

### 3. Database schema

Run the migration in Supabase SQL Editor:

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Execute

### 4. Stripe webhook

1. Install Stripe CLI: `stripe login` then `stripe listen --forward-to localhost:5000/api/v1/payments/webhook`
2. Or create a webhook in Stripe Dashboard pointing to `https://your-domain.com/api/v1/payments/webhook`
3. Add these events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 5. Run

```bash
npm run dev   # Development with watch
npm start     # Production
```

## API Overview

Base URL: `/api/v1`

| Module | Endpoints |
|--------|-----------|
| **Users** | `GET /users/me` — Current user (auth required) |
| **Hotels** | `GET /hotels`, `GET /hotels/:id`, `POST /hotels`, `PATCH /hotels/:id`, `DELETE /hotels/:id` |
| **Rooms** | `GET /hotels/:hotelId/rooms`, `GET /hotels/:hotelId/rooms/:roomId`, `POST` / `PATCH` / `DELETE` |
| **Bookings** | `POST /bookings`, `GET /bookings/my`, `GET /bookings/:id` |
| **Payments** | `POST /payments/create-intent`, `POST /payments/webhook` (Stripe) |
| **Admin** | `GET /admin/hotels/pending`, `PATCH /admin/hotels/:id/approve`, `PATCH /admin/users/:id/role` |

## Roles

- **guest** — Create bookings
- **owner** — Manage own hotels and rooms
- **admin** — Approve hotels, manage all resources, change user roles

## Architecture

- Layered: controllers → services → Supabase
- Middleware: `protectRoute` (Clerk + user sync), `restrictTo(roles)`, `validate`
- Bookings use transactional `create_booking_atomic` to prevent overbooking
