# LudoLex 🎮

A modern video game database application built with Next.js 14, TypeScript, and Prisma.

## 🚀 Features

- 🎮 **Comprehensive Game Database**: Browse and search through an extensive collection of video games
- 🔐 **User Authentication**: Secure login and registration powered by NextAuth.js
- 🎨 **Modern UI Components**: Beautiful, accessible interface built with Tailwind CSS and Radix UI
- 📱 **Responsive Design**: Fluid layouts with interactive carousels using Embla Carousel
- 🔍 **Type-Safe Operations**: Enhanced reliability with TypeScript and Prisma ORM
- ⚡ **Real-time Updates**: Efficient data fetching with TanStack Query
- 🔄 **State Management**: Seamless state handling with Zustand

## 🛠️ Tech Stack

### Frontend

- 🔧 **Framework**: Next.js 14
- 📝 **Language**: TypeScript
- 🎨 **Styling**: Tailwind CSS with animations
- 🧩 **UI Components**: Radix UI primitives
- 🎠 **Carousel**: Embla Carousel
- 📊 **Data Fetching**: TanStack Query
- 💾 **State Management**: Zustand

### Backend

- 🗄️ **Database**: PostgreSQL
- 🔌 **ORM**: Prisma
- 🔑 **Authentication**: NextAuth.js with Prisma Adapter
- 🌐 **API**: Next.js API Routes

### Development Tools

- ⚙️ **Type Checking**: TypeScript
- 🔍 **Linting**: ESLint
- ✨ **Code Formatting**: Prettier
- 📦 **Package Manager**: npm/yarn

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ludolex.git
   cd ludolex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Set up PostgreSQL database:
   ```bash
   # Start PostgreSQL service
   sudo service postgresql start

   # Switch to PostgreSQL user account
   sudo -i -u postgres

   # Create a new database user (follow interactive prompts)
   createuser --interactive --pwprompt

   # Create the database
   createdb ludolex

   # Exit PostgreSQL user account
   exit

   # Test the connection
   psql -h localhost -U yourusername -d ludolex
   ```

5. Update your `.env.local` with the required environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://ludoadmin:ludopass@localhost:5432/ludolex_db?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET=""

   # IGDB API Credentials
   IGDB_CLIENT_ID=""
   IGDB_CLIENT_SECRET=""

   # RAWG API Credentials
   RAWG_API_KEY=""
   RAWG_BASE_URL="https://api.rawg.io/api"

   # Development Settings
   NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

   > Note: You'll need to obtain API keys from [IGDB](https://api-docs.igdb.com/) and [RAWG](https://api.rawg.io/docs/) to use their services.

6. Run the Prisma migration:
   ```bash
   npx prisma migrate dev --name init
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```
