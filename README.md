# tina-nextjs-app

My attempt of a demo project using Next.js + TinaCMS + Docker.

## Development

### Prerequisites

- Create `.env` from the `.env.example` and choose your username and password
- Build app: `yarn`

### Start local

> By default TINA_PUBLIC_IS_LOCAL=true, if not, set it to true.

Run:`yarn dev`

### Start with GitHub & Mongodb Integration

- Setup mongodb (see deployment step below)
- In `.env` set `TINA_PUBLIC_IS_LOCAL=false`
- Run `yarn dev`

## Deployment

### Setup Container Network

Create tinacms-network for our containers: `docker network create tinacms-network`

### Setup mongodb

Create `.env` from the `.env.example` and choose your username and password

Run the mongodb container:

```bash
cd docker
docker compose up -d
```

### Setup the app

Create `.env` from the `.env.example`

Run the container:

```bash
docker compose up -d
```

Hopefully that would be it...
