# koefood

Restaurant management system for handling tables, orders, menus, and staff — built with Angular + Node.js.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Angular 14, Angular Material, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MySQL via Prisma ORM |
| Auth | JWT + Passport |
| Reports | jsPDF, html2canvas, Chart.js |

## Features

- **Multi-role auth** — Admin, Waiter, User (JWT-based)
- **Restaurant management** — register restaurants, assign staff
- **Table management** — track table state (Free / Occupied / Inactive), handle reservations
- **Menu & categories** — manage products by category, assign to restaurants
- **Order flow** — create orders per table, add items with notes, apply coupons
- **Payment handling** — cash, card, or split; tracks subtotal, IVA, and total
- **Coupons** — discount codes scoped per restaurant
- **PDF exports** — generate order/report PDFs client-side
- **Charts** — sales/order analytics via Chart.js

## Project Structure

```
koefood/
├── client/appKoeFood/   # Angular 14 SPA
│   └── src/app/
│       ├── restaurant/
│       ├── product/
│       ├── order/
│       ├── user/
│       ├── cupon/
│       └── home/
└── server/              # Express REST API
    ├── controllers/
    ├── routes/
    ├── middleware/
    └── prisma/          # Schema + migrations + seed
```

## Running locally

### Prerequisites

- Node.js 16+
- MySQL database
- Angular CLI (`npm install -g @angular/cli`)

### Backend

```bash
cd server
cp .env.example .env        # set DATABASE_URL
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev                  # runs on :3000
```

### Frontend

```bash
cd client/appKoeFood
npm install
ng serve                     # runs on :4200
```

## Data Model (key entities)

```
Restaurant → Tables → Orders → OrderDetails → Products
                   ↘ TableReservations
User (ADMIN | WAITER | USER)
Cupon → applied per OrderDetail
```

## Roles

| Role | Access |
|---|---|
| `ADMIN` | Full access — restaurants, users, reports |
| `WAITER` | Manage tables, orders, payments |
| `USER` | View menu, place orders |
