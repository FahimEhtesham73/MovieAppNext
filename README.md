
# MovieAppNext 🎬

A movie application built with **Next.js** and **TypeScript** that provides information about movies, shows, and the latest releases. This project uses modern web development techniques, featuring Next.js for SSR, TypeScript for type safety, and Tailwind CSS for styling.

## 🛠 Features

- Search movies and shows
- View movie details
- Display popular movies
- Responsive design for various screen sizes
- Optimized performance with server-side rendering

## 🧰 Technologies Used

- **Next.js** - SSR for optimized performance and routing
- **TypeScript** - For strict type-checking
- **Tailwind CSS** - For styling
- **TMDb API** - To fetch movie data

## 📂 Project Structure

- **`app/`** - Main application components
- **`components/`** - Reusable UI components
- **`hooks/`** - Custom React hooks
- **`lib/`** - Helper functions and utilities

## 🚀 Getting Started

### Prerequisites

- Node.js
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FahimEhtesham73/MovieAppNext.git
   cd MovieAppNext
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your TMDb API key:
   ```bash
   NEXT_PUBLIC_API_KEY=YOUR_API_KEY
   ```

### Running the App

To start the development server, run:
```bash
npm run dev
# or
yarn dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

### Build for Production

To create an optimized production build, run:
```bash
npm run build
# or
yarn build
```

### Lint and Format

For linting and formatting code:
```bash
npm run lint
npm run format
```



