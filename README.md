# Laravel Breeze Nuxt3

## Introduction

This repository is an implementation of the [Laravel Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [Nuxt3](https://nuxt.com/docs/getting-started/introduction). All of the authentication boilerplate is already written for you - powered by [Laravel Sanctum](https://laravel.com/docs/sanctum), allowing you to quickly begin pairing your beautiful Nuxt3 frontend with a powerful Laravel backend.

## Installation (Backend)

```bash
# Create the Laravel application...
laravel new nuxt-backend
# Or with sail
curl -s https://laravel.build/nuxt-backend | bash

cd new nuxt-backend

# Install Breeze and dependencies...
composer require laravel/breeze --dev

php artisan breeze:install api
```

Next, ensure that your application's `APP_URL` and `FRONTEND_URL` in `.env` file

```dotenv
# App url
APP_URL=http://localhost:8000
# Or with sail
APP_URL=http://localhost

FRONTEND_URL=http://localhost:3000
```

After defining the appropriate environment variables, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
# Or with sail
sail up
```

## Setup Frontend

Clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env` and supply the URL of your backend:

```dotenv
NUXT_PUBLIC_BACKEND_URL=http://localhost:8000
# Or with sail
NUXT_PUBLIC_BACKEND_URL=http://localhost
```

Finally, run the application via `yarn dev` or `npm run dev`. The application will be available at `http://localhost:3000`:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

### Authentication Composable

This Nuxt.js application contains a custom `useAuth` Vue composable, designed to abstract all authentication logic away from your pages. In addition, the composable can be used to access the currently authenticated user:

```vue
<script setup>
    const { logout, user } = useAuth({ middleware: 'auth' })
</script>

<template>
  <p>{{ user?.name }}</p>
  <button @click="logout">Sign out</button>
</template>
```

### Named Routes
For convenience, [Ziggy](https://github.com/tighten/ziggy#spas-or-separate-repos) may be used to reference your Laravel application's named route URLs from your React application.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## License
Laravel Breeze Nuxt is open-sourced software licensed under the [MIT license](LICENSE.md).
