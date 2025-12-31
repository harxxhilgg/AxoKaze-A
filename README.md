# AxoKaze

<div align="center">

**A modern, feature-rich dashboard application built with React, TypeScript, and Vite**

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

## Overview

AxoKaze is a comprehensive web application that provides users with a unified dashboard to access multiple services and information in one place. From tracking Formula 1 races to exploring Pokémon data, and checking weather forecasts – all within a beautifully designed, responsive interface.

<!-- Add screenshot here -->
<!-- ![Dashboard Preview](./docs/images/dashboard-preview.png) -->

## Features

### Dashboard Pages

- **Overview** - Get a quick glance at all your important information
- **Pokédex** - Browse and search through the complete Pokémon database with detailed stats
- **Formula 1** - Track race schedules, results, driver standings, and constructor championships
- **Weather** - Check real-time weather conditions and forecasts for any location
- **Profile** - Manage your account settings and preferences

### Authentication & Security

- Email/Password authentication with secure OTP verification
- Google OAuth 2.0 integration for quick sign-in
- Password reset functionality via email
- JWT-based authentication with auto-refresh
- Protected routes with role-based access

### User Experience

- Dark/Light mode support with system preference detection
- Fully responsive design that works on all devices
- Smooth animations and transitions
- Context menus and interactive popups
- Loading skeletons for better perceived performance
- Toast notifications for user feedback

### Developer Features

- Type-safe development with TypeScript
- Comprehensive test suite with Vitest
- ESLint and Prettier for code quality
- Hot Module Replacement (HMR) for fast development
- Modular architecture with clean separation of concerns

## Demo

<!-- Add your demo images here after pushing them to the repo -->
<!--
### Landing Page
![Landing Page](./docs/images/landing.png)

### Dashboard
![Dashboard](./docs/images/dashboard.png)

### F1 Tracker
![F1 Tracker](./docs/images/f1-tracker.png)

### Pokédex
![Pokédex](./docs/images/pokedex.png)
-->

> **Note:** This is the frontend repository. The backend API is maintained separately.

## Tech Stack

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Icons** - Additional icon library

### State Management

- **Zustand** - Lightweight state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Data Fetching

- **Axios** - HTTP client
- **axios-auth-refresh** - Automatic token refresh

### UI Components & Libraries

- **React Hot Toast** - Toast notifications
- **Recharts** - Data visualization
- **React Loading Skeleton** - Loading states
- **@floating-ui/react-dom** - Tooltips and popovers
- **ldrs** - Loading indicators

### Testing

- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **MSW** - API mocking for tests

### Code Quality

- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

### Deployment

- **Vercel** - Hosting platform

## Project Structure

```
AxoKaze-A/
├── src/
│   ├── components/          # Reusable components
│   │   ├── private/        # Protected/authenticated components
│   │   │   ├── Dashboard/  # Dashboard layout components
│   │   │   └── Popups/     # Modal components
│   │   ├── public/         # Public components
│   │   └── ProtectedRoute.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries and helpers
│   ├── pages/              # Page components
│   │   ├── protected/      # Protected pages (require auth)
│   │   └── public/         # Public pages
│   ├── stores/             # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   ├── assets/             # Static assets (fonts, images)
│   ├── __tests__/          # Test files
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Public static files
├── coverage/               # Test coverage reports
├── dist/                   # Production build output
└── config files           # Various configuration files
```

### Key Directories

- **components/private** - Components only accessible to authenticated users
- **components/public** - Components available to all users
- **stores** - Global state management (auth, UI, F1, Pokemon, Weather)
- **hooks** - Reusable React hooks like `useApiCall`, `useDocumentTitle`, `usePopupClose`
- **lib** - API client configuration and utility functions
- **types** - TypeScript interfaces and types for type safety

## Available Scripts

| Command                 | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Build for production      |
| `npm run preview`       | Preview production build  |
| `npm run lint`          | Run ESLint                |
| `npm run format`        | Format code with Prettier |
| `npm run format:check`  | Check code formatting     |
| `npm run test`          | Run tests in watch mode   |
| `npm run test:ui`       | Run tests with UI         |
| `npm run test:run`      | Run tests once            |
| `npm run test:coverage` | Generate coverage report  |

## Related Repositories

- **Backend API**: [AxoKaze-B](https://github.com/harxxhilgg/AxoKaze-B) - Node.js/Express backend

## License

This project is private and proprietary.

## Author

**harxxhilgg**

- GitHub: [@harxxhilgg](https://github.com/harxxhilgg)

## Acknowledgments

- Formula 1 data provided by [Ergast API](http://ergast.com/mrd/)
- Pokémon data from [PokéAPI](https://pokeapi.co/)
- Weather data from [WeatherAPI.com](https://www.weatherapi.com/)
- Icons by [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)

---

<div align="center">
Made with ❤️ by harxxhilgg
</div>
