# DKM Pharma Web App

Next.js 16 + React 19 project for the DKM Pharma website and admin panel.

## Requirements

- Node.js 20+
- npm 10+

## Setup

1. Install dependencies:

```bash
npm ci
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Update values in `.env.local` as needed.

## Environment Variables

Available variables (see `.env.example`):

- `NEXT_PUBLIC_API_BASE`:
	- Keep empty to use this Next.js app's own API routes (recommended for local run).
	- Set to backend base URL if you want to call another API host.
- `NEXT_PUBLIC_BACKEND_BASE`: optional backend base fallback.
- `NEXT_PUBLIC_CV_BACKEND_BASE`: optional dedicated base URL for CV download endpoints.
- `ADMIN_TOKEN`: optional bearer token validated by `/api/admin/*` routes.

## Run

Start local development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Notes

- Uploaded images are stored under `public/assets/*`.
- Application CV files are stored under `storage/cvs`.
