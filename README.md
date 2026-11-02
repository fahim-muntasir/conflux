# Conflux

**An AI-powered voice generation platform built around self-hosted Chatterbox TTS.**

Conflux is a web-based platform for generating speech, managing voice profiles, and working with AI-generated audio. It combines a Next.js application with a dedicated self-hosted Chatterbox inference service, giving the platform control over its speech-generation infrastructure rather than relying entirely on third-party TTS APIs.

## Overview

The project focuses on building a complete voice-generation workflow, from selecting a voice and configuring speech parameters to generating, previewing, and managing audio.

Conflux supports both predefined system voices and organization-specific custom voices. Users can generate speech with adjustable model parameters and revisit their previous generations through a dedicated history interface.

The frontend and model-serving API operate independently, keeping application logic separate from speech inference.

## Features

### Voice Management

- **System Voices** — Browse a collection of predefined voices with descriptions, language information, and categories.
- **Custom Voices** — Create organization-specific voice profiles by uploading or recording audio samples.
- **Voice Categories** — Organize voices by use case, including audiobooks, conversational speech, customer service, narration, podcasts, and more.
- **Voice Preview** — Listen to available voice samples before selecting a voice.

### Text to Speech

- Convert written text into generated speech.
- Select from available system and custom voices.
- Adjust generation parameters to influence speech output:
  - Temperature
  - Top P
  - Top K
  - Repetition Penalty
- Preview generated audio with waveform visualization.
- Play, pause, seek, and download generated audio.
- Revisit previous generations through generation history.

### Custom Voice Creation

- Upload or Record audio samples to create custom voice profiles.
- Add voice names, descriptions, categories, and language information.
- Validate uploaded audio before storing it.
- Associate custom voices with their respective organizations.

### Dashboard

- Centralized workspace for voice-generation activities.
- Quick actions for starting common workflows.
- Organization switching and account management.
- Dedicated navigation for voice discovery and speech generation.

### Application Infrastructure

- Organization-based authentication and route protection.
- Persistent voice and generation records.
- Private audio storage with signed URL access.
- Type-safe API communication between frontend and backend services.

## Architecture

Conflux uses a separated application and inference architecture. The Next.js application handles authentication, business logic, voice management, and generation records, while a separately hosted Chatterbox service handles speech inference.

```text
                         User
                           |
                           v
                  Next.js Application
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
         Clerk Auth     tRPC API     Dashboard UI
                           |
                  +--------+--------+
                  |                 |
                  v                 v
              PostgreSQL       Chatterbox API
               (Prisma)        (Self-Hosted)
                  |                 |
                  |                 v
                  |           Chatterbox TTS
                  |                 |
                  |                 v
                  |           Generated Audio
                  |                 |
                  +--------+--------+
                           |
                           v
                    Object Storage
                           |
                           v
                 Audio Playback / Download
```

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Radix UI |
| Authentication | Clerk |
| API Layer | tRPC |
| Data Fetching | TanStack Query |
| Form Management | TanStack Form, Zod |
| Database | PostgreSQL |
| ORM | Prisma |
| Audio Storage | Supabase Storage |
| TTS Engine | Self-hosted Chatterbox |
| Audio Visualization | WaveSurfer.js |
| Audio Recording | RecordRTC |
| Validation | Zod |

## Chatterbox TTS Integration

Conflux uses [Chatterbox](https://github.com/resemble-ai/chatterbox), an open-source text-to-speech model developed by Resemble AI.

Instead of depending on a managed speech-generation provider, I set up a separate Python API service to host and serve the Chatterbox model.

The Next.js application communicates with this service through its API, keeping model inference independent from the main application.

This integration provides:

- Control over the model-serving environment.
- A dedicated inference service separate from the frontend.
- Configurable speech-generation parameters.
- The flexibility to maintain and extend the TTS infrastructure independently.

Conflux also includes an API type synchronization script that generates TypeScript definitions from the Chatterbox service's OpenAPI specification.

## Project Structure

The application follows a feature-oriented architecture to keep related components, views, hooks, and business logic organized.

```text
conflux/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── scripts/
│   ├── seed-system-voices.ts
│   └── sync-api.ts
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── text-to-speech/
│   │   │   ├── voices/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── org-selection/
│   ├── components/
│   │   └── ui/
│   ├── features/
│   │   ├── billing/
│   │   ├── dashboard/
│   │   ├── text-to-speech/
│   │   └── voices/
│   ├── generated/
│   ├── hooks/
│   ├── lib/
│   ├── trpc/
│   └── types/
└── package.json
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Python 3.12 for the Chatterbox API service
- PostgreSQL database
- Supabase project with a storage bucket
- Clerk application
- A running Chatterbox TTS API instance

### 1. Clone the Repository

```bash
git clone <repository-url>
cd conflux
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the required services.

The application uses environment variables for:

- PostgreSQL database connection.
- Clerk authentication.
- Supabase project and storage configuration.
- Chatterbox API endpoint.

Example variable names:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_BUCKET=

CHATTERBOX_API_URL=
CHATTERBOX_API_KEY=
```

Additional variables may be required depending on your service configuration. Never commit real credentials or secret keys.

### 4. Set Up the Database

Generate the Prisma client and apply database migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run sync-api` | Generate TypeScript types from the Chatterbox OpenAPI specification |
| `npm run postinstall` | Generate the Prisma client after installation |

## Database Design

Conflux currently uses two primary Prisma models:

**Voice**

Stores system and custom voice information, including organization ownership, name, description, category, language, and audio storage reference.

**Generation**

Stores generated speech records, including the input text, selected voice, generation parameters, organization ownership, and audio storage reference.

The database uses PostgreSQL with Prisma as its ORM.

## Authentication and Organizations

Conflux uses Clerk for authentication and organization management.

Protected application routes require an authenticated user and a selected organization. Organization context is also used to scope custom voices and generated audio records.

System voices are shared, while custom voices are associated with their owning organization.

## Future Improvements

Potential areas for further development:

- Expanded voice customization workflows.
- Additional audio input options.
- More advanced speech-generation controls.
- Improved generation management and audio organization.
- Additional model integrations.
- Inference performance and infrastructure optimization.

## Project Motivation

Conflux is an exploration of building an AI-powered voice product with control over both the application and the underlying model infrastructure.

The interesting part is not simply connecting a text-to-speech API. It is building the surrounding system: voice management, organization-based access, audio storage, configurable inference, generation history, and a user-facing workspace.

**Built with Next.js, TypeScript, PostgreSQL, FastAPI-powered Chatterbox infrastructure, and a focus on practical AI product engineering.**