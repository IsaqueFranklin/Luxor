Luxor LMS
===============

Welcome to Luxor! This is a **Full-Stack** web system, with the **Frontend** built using **React** and **Vite**, and the **Backend** running on **Node.js** with **Express**.

📋 Prerequisites
----------------

To run this project locally, you will need the following installed:

-   **Node.js** (Recommended version: 18 or higher)

-   **npm** (usually included with Node.js) or **Yarn**

* * * * *

⚙️ Backend Configuration (API)
------------------------------

The backend is an **Express** server that runs on port `3000` (or another port configured in the `.env` file).

### 1\. Navigate to the Backend Directory

Bash

```
cd backend

```

*(Adjust the path if your backend directory has a different name, e.g., `api`)*

### 2\. Install Dependencies

Use your preferred package manager:

Bash

```
npm install
# OR
yarn install

```

### 3\. Environment Variables

Create a file named **`.env`** in the root of the `backend` directory.

> **`.env` Example:**
>
> ```
> PORT=3000
> # Add other variables here, such as
> # DATABASE_URL=...
> # JWT_SECRET=...
>
> ```

### 4\. Start the Server

You can start the server in development mode (with hot-reloading, if configured) or in production mode.

**Development Mode:**

Bash

```
npm run dev
# OR
yarn dev

```

**Production Mode:**

Bash

```
npm start
# OR
yarn start

```

The backend will be accessible, by default, at `http://localhost:3000`.

* * * * *

💻 Frontend Configuration (React/Vite)
--------------------------------------

The frontend is a **React** application bootstrapped with **Vite**. By default, it runs on port `5173`.

### 1\. Navigate to the Frontend Directory

Open a new terminal and navigate to the frontend directory:

Bash

```
cd frontend

```

*(Adjust the path if your frontend directory has a different name, e.g., `client`)*

### 2\. Install Dependencies

Use the same package manager you used for the backend:

Bash

```
npm install
# OR
yarn install

```

### 3\. Environment Variables

Create a file named **`.env`** in the root of the `frontend` directory. **Vite** environment variables **must** be prefixed with `VITE_`.

> **`.env` Example (Frontend):**
>
> ```
> VITE_API_URL=http://localhost:3000/api
>
> ```

### 4\. Start the React Application

Start the Vite development server:

Bash

```
npm run dev
# OR
yarn dev

```

The frontend will be accessible, by default, at `http://localhost:5173`.

* * * * *

🏁 Running the Complete Project
-------------------------------

To get the full system running:

1.  **Open two separate terminals.**

2.  In the **First Terminal**, navigate to the `backend` directory and run `npm run dev`.

3.  In the **Second Terminal**, navigate to the `frontend` directory and run `npm run dev`.
