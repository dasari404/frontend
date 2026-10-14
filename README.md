# TravelSphere Frontend (React + TypeScript + Vite)

Modern React frontend for TravelSphere travel guide booking platform, converted from static HTML/CSS to React with TypeScript, matching CampusPulse architecture patterns.

## Tech Stack

- **React 19.0** with hooks
- **TypeScript 6.0**
- **Vite 8.3** for fast development and optimized builds
- **Tailwind CSS 4.3** for styling
- **React Router DOM 7.18** for navigation
- **Axios 1.20** for API calls

## Prerequisites

- Node.js 18+ (recommended: Node.js 20 LTS)
- npm 9+ or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Environment Configuration

Create `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

For production:
```env
VITE_API_BASE_URL=https://api.travelsphere.com/api
```

## Development

```bash
# Start dev server
npm run dev
```

The application will open at `http://localhost:5173`

Features:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- Tailwind CSS with JIT compilation

## Build

```bash
# Build for production
npm run build
```

Output directory: `dist/`

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── api/              # API client and endpoint functions
│   └── axios.ts      # Axios instance with interceptors
├── assets/           # Static assets (images, icons)
├── components/       # Reusable UI components
├── context/          # React Context providers
│   └── AuthContext.tsx  # Authentication state management
├── pages/            # Route components
│   ├── admin/        # Admin dashboard pages
│   ├── auth/         # Login, register pages
│   ├── customer/     # Customer-specific pages
│   └── guide/        # Guide-specific pages
├── types/            # TypeScript type definitions
├── App.tsx           # Main app component with routing
├── main.tsx          # Application entry point
└── index.css         # Global styles and Tailwind imports
```

## Pages & Routes

### Public Routes (23 pages total)
- `/` - Home/Landing
- `/login` - User login
- `/register/customer` - Customer registration
- `/register/guide` - Guide registration

### Customer Routes (Requires AUTH + customer role)
- `/customer/dashboard` - Customer dashboard
- `/customer/onboarding` - Customer profile setup
- `/customer/browse` - Browse available guides
- `/customer/guides/:id` - Guide detail page
- `/customer/bookings` - Booking history
- `/customer/review/:bookingId` - Write review

### Guide Routes (Requires AUTH + guide role)
- `/guide/dashboard` - Guide dashboard
- `/guide/onboarding` - Guide profile setup
- `/guide/profile` - View/edit guide profile
- `/guide/bookings` - Booking requests

### Admin Routes (Requires AUTH + admin role)
- `/admin/dashboard` - System overview
- `/admin/customers` - Customer management
- `/admin/guides` - Guide verification and management
- `/admin/bookings` - Booking oversight

## API Integration

API client (`src/api/axios.ts`) handles:
- Base URL configuration from environment
- JWT token injection in headers
- Automatic token refresh (logout on 401)
- Request/response interceptors

Example API call:
```typescript
import api from './api/axios';

// GET request
const guides = await api.get('/guide/public');

// POST with auth (token auto-injected)
const booking = await api.post('/bookings', bookingData);
```

## Authentication

JWT-based authentication managed via `AuthContext`:

```typescript
const { user, login, logout, isAuthenticated } = useAuth();

// Login
await login(email, password);

// Access user info
console.log(user.role, user.email);

// Logout
logout();
```

Token is stored in `localStorage` and automatically included in API requests.

## Routing & Protected Routes

- Public routes accessible to all
- Protected routes check authentication and role
- Automatic redirect to `/login` if not authenticated
- Role-based redirects (customer/guide/admin dashboards)

## Styling

Tailwind CSS with custom configuration:
- Utility-first CSS framework
- Responsive design breakpoints
- Custom color palette
- Dark mode support (configurable)

## Type Safety

TypeScript interfaces in `src/types/`:
- API request/response types
- Entity models (User, Guide, Booking, etc.)
- Component prop types
- Enum definitions for roles, statuses

## Development Tips

### TypeScript Errors
```bash
# Type check without running dev server
npx tsc --noEmit
```

### Linting (if configured)
```bash
npm run lint
```

### Format Code (if Prettier configured)
```bash
npm run format
```

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Test production build
npm run preview
```

Build optimizations:
- Code splitting by route
- Tree shaking unused code
- Minification and compression
- Asset optimization

## Deployment

### Static Hosting (Netlify, Vercel, etc.)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Configure rewrites for SPA routing

Example `_redirects` for Netlify:
```
/*    /index.html   200
```

Example `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Docker
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables

All environment variables must be prefixed with `VITE_`:

- `VITE_API_BASE_URL` - Backend API base URL (required)
- `VITE_APP_NAME` - Application name (optional)
- `VITE_ENABLE_ANALYTICS` - Enable analytics (optional)

## Common Issues

### API Connection Error
- Check backend is running on correct port
- Verify `VITE_API_BASE_URL` in `.env`
- Check CORS configuration in backend

### Login Not Working
- Verify JWT token storage in localStorage
- Check browser console for API errors
- Ensure backend JWT_SECRET is stable

### Hot Reload Not Working
- Restart dev server: `npm run dev`
- Clear node_modules: `rm -rf node_modules && npm install`

### Build Errors
- Clear Vite cache: `rm -rf node_modules/.vite`
- Update dependencies: `npm update`

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Modern mobile browsers

## Performance

- Initial bundle size: ~150KB (gzipped)
- Code splitting by route reduces initial load
- Lazy loading for heavy components
- Image optimization recommended

## Next Steps

1. **Testing**: Add Vitest for unit tests, React Testing Library
2. **E2E Tests**: Add Playwright or Cypress
3. **Analytics**: Integrate Google Analytics or similar
4. **Error Tracking**: Add Sentry or similar
5. **PWA**: Add service worker for offline support

## License

Proprietary - TravelSphere Platform
