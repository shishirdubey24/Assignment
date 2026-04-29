# Role-Based Voucher Management System

A modern, frontend-only web application built with React to manage accounting vouchers. The application features a clean, professional, enterprise-grade UI built with Tailwind CSS v4 and implements robust Role-Based Access Control (RBAC) entirely on the client side using `localStorage`.

##

### 1. Authentication System

- **Secure Login Flow**: Protected routes ensuring only authenticated users can access the dashboard.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Full access. Can Create, Read, Edit, and Delete vouchers.
  - **Staff**: Limited access. Can only Create and Read vouchers. Editing and Deleting actions are strictly disabled/hidden.

### 2. Voucher Management

- **Dynamic Voucher Creation**:
  - Selection for Voucher Type (Payment / Received).
  - Date and Narration fields (Narration smartly defaults to "On Account" and clears on focus).
- **Dynamic Multi-Row Engine**:
  - Add and remove independent rows for complex transactions.
  - Select Account (Cash, Bank, Sales, etc.) and enter Amount.
  - **Smart TDS Logic**: Toggle "TDS Applicable". The "TDS Type" dropdown dynamically enables and becomes required only if TDS is marked as "Yes".
- **Real-time Calculations**: Automatically calculates the total amount across all dynamic rows.

### 3. Data Persistence

- No backend required! All data, including user sessions and voucher records, is securely persisted in the browser's `localStorage`.

### 4. Premium UI/UX

- Built with **Tailwind CSS v4** for a clean, sleek, B2B SaaS aesthetic.
- Beautiful, highly-readable tables and tabbed navigation.
- Smooth interactions powered by **Lucide React** icons.

## Technology Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Hooks (`useState`, `useEffect`, Context API) + Local Storage

## Running the Project Locally

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173`

## Demo Credentials

Use the following credentials to test the RBAC features:

**Admin Role** (Full Permissions)

- **Username**: `admin`
- **Password**: `admin123`

**Staff Role** (Create & Read Only)

- **Username**: `staff`
- **Password**: `staff123`
