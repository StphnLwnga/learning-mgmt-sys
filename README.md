# [Learning Management System Demo 🔗](https://learning-mgmt-sys.vercel.app/)

## Setup

To run the project locally, install the project's dependencies:

```bash
npm install
```

Rename the **`.env.sample`** file to **`.env`** and populate all the fields as described below. The variable names are self explanatory.

If you plan on running the app on another port or URL, change the value of **`NEXT_PUBLIC_APP_URL`** to the appropriate URL.

### Database

- The app has been tested with MySQL and PostgreSQL. The default database is currently set to MySQL.

- To use Postgres, change the provider in the **`datasource`** block in **`./prisma/schema.prisma`** file from **`mysql`** to **`postgresql`**:

  ```shell
  # ...
  datasource db {
    provider     = "postgresql"
  # ...
  ```

- Push the Prisma schema to the database

  ```sh
  npx prisma db push
  ```

  ```sh
  npx prisma generate
  ```

- Seed the database with categories:

  ```sh
  npm run seed
  ```

### Auth

- Register an account, and sign into **[clerk](https://clerk.com/)**, and create a new application.

- Name the application and select your desired authentication methods, and create the application.

- Select Next.js framework and copy the values of the API keys into **`.env`**.

- Set the values of the following variables as well:

  ```shell
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
  ```

### File Upload

- Uploads are handled using **[uploadthing](https://uploadthing.com/sign-in)**. Sign in and create a new app.
- Name the app and Create App.
- Navigate to the API Keys section, and copy them into **`.env`**.

### Video Player

- **[Mux](https://www.mux.com/)** handles HLS playback.
- Sign up and select **Integrate with your app**.
- Select **Development** environment from the dropdown, and select **Mux Video**, and **Generate token**.
- Copy & Paste the **Access Token ID** & **Secret Key** to **`MUX_TOKEN_ID`** & **`MUX_TOKEN_SECRET`** variables respectively.
- Adding a credit/debit card to the free tier removes the watermark, 10 second limit, and video deletion after 24 hours.*

### Checkout

- Sign up for **[Stripe](https://dashboard.stripe.com/register)**, verify your email, and navigate to your **[dashboard](https://dashboard.stripe.com/dashboard)**.

  ![stripe dashboard](https://res.cloudinary.com/stphn/image/upload/v1707572188/misc/stripe_gzypvk.png)

- Select **New Account**and give it a name.

- Select the **Developers** tab in the top right and navigate to the **API keys** tab.

- Reveal the test key on **Secret Key**, copy and paste it as the value of **`STRIPE_API_KEY`**

  ![stripe secret key](https://res.cloudinary.com/stphn/image/upload/v1707578009/misc/Screenshot_2024-02-10_071034_bnf0kj.png)

- To setup the webhook to listen for stripe events, navigate to the **Webhooks** tab and select **Test in a local environment** at the bottom of the page.

  ![stripe webhook](https://res.cloudinary.com/stphn/image/upload/v1707577469/misc/stripe2_qlr8q5.png)

- Follow **Step 1** of **Listen to Stripe events**.

- For **Step 2**, forward events to the webhook. If the app is running on <http://localhost:3000>:

  - Enter the following after **`stripe login`**:

    ```sh
    stripe listen --forward-to localhost:3000/api/webhook
    # format:  stripe listen --forward-to <URL>/api/webhook
    ```

  - Copy the webhook signing secret to the **`STRIPE_WEBHOOK_SECRET`** variable in **`.env`**

    ![stripe webhook secret](https://res.cloudinary.com/stphn/image/upload/v1707583245/misc/Screenshot_2024-02-10_083152_cpufz9.png)

- If you decide to run the app on another port or URL, in the **Webhooks** tab:

  - Click **Add an endpoint**. Add the URL and description.
  - The webhook URL will be **`<URL>/api/webhook`**
  - **Select events to listen to** ➡️ **Checkout** ➡️ **checkout.session.completed**

## Run the app

```sh
npm run dev
```

The app runs on  <http://localhost:3000>.

To view database entries, while the app is running, run the following command in another shell:

```sh
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
