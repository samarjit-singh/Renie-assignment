# Renie Assignment

## Overview

Renie Assignment is a full-stack application designed to manage and track recycling activities.

## Live Demo

Check out the live application [here](https://renie-assignment.vercel.app).

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

## Getting Started

### Backend Setup

1. Navigate to the `renie-backend` directory:
    ```sh
    cd renie-backend
    ```

2. Create a `.env` file in the `renie-backend` directory and add your database URL:
    ```env
    DATABASE_URL="your db url"
    ```

3. Install the necessary dependencies and start the backend server:
    ```sh
    npm install
    npm run start
    ```

### Frontend Setup

1. Navigate to the `renie-frontend` directory:
    ```sh
    cd renie-frontend
    ```

2. Update the API host URL in `src/utils/ApiRoutes.js`:
    ```javascript
    const host = "your host url"; // Replace with your host URL
    ```

3. Install the necessary dependencies and start the frontend server:
    ```sh
    npm install
    npm run start
    ```

## Using the Application

1. **Landing Page**: Click on the `Recycle` button to navigate to the `/register` page.
   
2. **Registration**:
    - Select either `New User` or `Existing User`.
    - Fill in the required details and proceed.

3. **Recycling**:
    - On the `/recycle` page, enter the type of compartment and quantity, then submit.

4. **User Dashboard**:
    - Navigate to `/userdashboard` to view personal statistics.

5. **Public Dashboard**:
    - Navigate to `/publicdashboard` to view public statistics.

6. **Settings**:
    - Navigate to `/settings` to update your name or email.
