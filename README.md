# Chat-App

This is a real-time messaging application built with [Next.js](https://nextjs.org/), Prisma, and Pusher. It allows users to register, log in, and chat with each other in real-time.

Deployed using Vercel [link](https://chat-app-swart-psi.vercel.app/)


## Technologies Used

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Pusher**: A service for adding real-time functionality to web and mobile apps.
- **MongoDB**: A NoSQL database for storing application data.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)
- MongoDB (for the database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JaiSwarup/chat-app
cd chat-app
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Set up the environment variables:

Create a  `.env` file in the root directory and add the following variables:

```env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"

GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"

NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-app-key"
PUSHER_APP_ID="your-pusher=app-id"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSER="your-pusher-cluster"
```

4. Generate the Prisma client:

```bash
npx prisma generate
```

5. Run the Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs) - learn about Prisma ORM.
- [Pusher Documentation](https://pusher.com/docs) - learn about Pusher for real-time communication.
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction) - learn about authentication in Next.js.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

