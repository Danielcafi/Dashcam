# DashCams API Documentation

## Database Schema

### User Model (Installers)
- `id`: String (Primary Key)
- `email`: String (Unique)
- `name`: String
- `phone`: String (Optional)
- `location`: String (Optional)
- `bio`: String (Optional)
- `rating`: Float (Default: 0)
- `isActive`: Boolean (Default: true)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Appointment Model
- `id`: String (Primary Key)
- `customerName`: String
- `customerEmail`: String
- `customerPhone`: String
- `vehicleMake`: String
- `vehicleModel`: String
- `vehicleYear`: Int
- `serviceType`: String
- `preferredDate`: DateTime
- `status`: AppointmentStatus (Default: PENDING)
- `notes`: String (Optional)
- `address`: String
- `postcode`: String
- `installerId`: String (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### AppointmentStatus Enum
- `PENDING`
- `CONFIRMED`
- `IN_PROGRESS`
- `COMPLETED`
- `CANCELLED`

## API Endpoints

### Installers

#### GET /api/installers
Get all active installers
- Query params: `location`, `page`, `limit`
- Response: List of installers with pagination

#### POST /api/installers
Create new installer
- Body: `{ name, email, phone?, location?, bio? }`
- Response: Created installer

#### GET /api/installers/[id]
Get single installer
- Response: Installer details with appointment count

#### PUT /api/installers/[id]
Update installer
- Body: `{ name?, email?, phone?, location?, bio?, rating?, isActive? }`
- Response: Updated installer

#### DELETE /api/installers/[id]
Deactivate installer (soft delete)
- Response: Success message

### Appointments

#### GET /api/appointments
Get all appointments
- Query params: `installerId`, `status`, `page`, `limit`
- Response: List of appointments with pagination

#### POST /api/appointments
Create new appointment
- Body: `{ customerName, customerEmail, customerPhone, vehicleMake, vehicleModel, vehicleYear, serviceType, preferredDate, notes?, address, postcode, installerId }`
- Response: Created appointment with installer details

#### GET /api/appointments/[id]
Get single appointment
- Response: Appointment with installer details

#### PUT /api/appointments/[id]
Update appointment
- Body: Any appointment fields to update
- Response: Updated appointment

#### DELETE /api/appointments/[id]
Delete appointment
- Response: Success message

#### PATCH /api/appointments/[id]/status
Update appointment status
- Body: `{ status }`
- Response: Updated appointment

#### GET /api/appointments/installer/[installerId]
Get appointments by installer
- Query params: `status`, `page`, `limit`
- Response: Installer's appointments with pagination

## Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dashcams_db"
```

## Setup Instructions

1. Install dependencies:
```bash
npm install prisma @prisma/client
```

2. Initialize Prisma:
```bash
npx prisma init
```

3. Set up your database and update the DATABASE_URL in `.env.local`

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run migrations:
```bash
npx prisma migrate dev --name init
```

6. (Optional) Seed the database:
```bash
npx prisma db seed
```
