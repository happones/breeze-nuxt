# Laravel Breeze Nuxt3 – v1.0.0

![Nuxt](https://img.shields.io/badge/nuxt%20js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white
) ![Shad](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
)

## Introduction

This project is a frontend implementation of [Laravel Breeze](https://laravel.com/docs/starter-kits) using [Nuxt 3](https://nuxt.com). It provides a solid foundation to build fullstack applications with full authentication using [Laravel Sanctum](https://laravel.com/docs/sanctum), already integrated via [nuxt-sanctum](https://github.com/sidebase/nuxt-auth).

### Features

- Laravel 12 with Breeze (API stack)
- Nuxt 3 frontend with TypeScript
- Authentication via `nuxt-sanctum`
- Middleware: `sanctum:auth` and `email-verified`
- Breadcrumb support per page
- UI built with [shadcn/ui](https://ui.shadcn.com/)
- Tailwind CSS and clean structure for scaling

---

## Backend Setup (Laravel 12)

```bash
# Create the Laravel project
laravel new nuxt-backend

# Or using Laravel Sail
curl -s https://laravel.build/nuxt-backend | bash
cd nuxt-backend

# Install Breeze API stack
composer require laravel/breeze --dev
php artisan breeze:install api

# Run migrations
php artisan migrate
```
Update your .env file:

```dotenv
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```
Start the Laravel server:

```bash
php artisan serve
# or if using Sail
./vendor/bin/sail up

```
---

## Frontend Setup (Nuxt)

1. Clone this repository.
2. Install dependencies using your preferred package manager (npm, yarn, or pnpm).
3. Copy the `.env.example` file to `.env`.
4. Set the `NUXT_PUBLIC_BACKEND_URL` pointing to your Laravel backend.
5. Start the Nuxt development server.


```
# Clone this repository
git clone https://github.com/happones/breeze-nuxt.git
cd breeze-nuxt

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

Copy the environment config and set the backend URL:

```bash
cp .env.example .env
```

.env:

```dotenv
NUXT_PUBLIC_SANCTUM_BASE_URL=http://localhost:8000
```

Run the dev server:

```bash
npm run dev
```

---

## Authentication & Middleware

This project uses [`nuxt-sanctum`](https://github.com/sidebase/nuxt-auth) for authentication.

Use the `sanctum:auth` middleware to protect pages for authenticated users.

Use the custom `email-verified` middleware for pages that require email verification.


```ts
definePageMeta({
  title: "Dashboard",
  middleware: ["sanctum:auth", "email-verified"],
});

```

- sanctum:auth: Protects pages for authenticated users only

- email-verified: Custom middleware to ensure user has a verified email

### Example Page Meta with Middleware and Breadcrumbs

```ts
definePageMeta({
  title: "Dashboard",
  middleware: ["sanctum:auth", "email-verified"]
})

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" }
]
```

## UI Components

The UI is powered by [shadcn/ui](https://ui.shadcn.com/) with Tailwind CSS.

This project uses shadcn/ui for building beautiful and accessible UI components with Tailwind CSS.

All components are tree-shakeable and customizable. You can generate components using:

```bash
npx shadcn-ui@latest add button
```

---

## Production

To prepare for production:

- Build the application.
- Preview the build locally.
- Deploy to a platform of your choice (Vercel, Netlify, or a custom VPS).

Refer to the [Nuxt deployment guide](https://nuxt.com/docs/getting-started/deployment) for more information.

---

## Useful Links

- [Laravel Breeze Documentation](https://laravel.com/docs/starter-kits#breeze)
- [Laravel Sanctum Documentation](https://laravel.com/docs/sanctum)
- [Nuxt Documentation](https://nuxt.com/docs)
- [nuxt-sanctum](https://github.com/sidebase/nuxt-auth)
- [shadcn/ui](https://ui.shadcn.com)

## License

This project is open-sourced software licensed under the [MIT license](LICENSE.md).
