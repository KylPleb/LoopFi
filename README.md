# LoopFi

Monorepo for the LoopFi project. This repository uses pnpm workspaces to manage
smart contracts, frontend, and backend packages.

## Packages

- `contracts` – Hardhat based smart contract development for LoopFi's DeFi protocol. It includes comprehensive tests and deployment scripts.
- `frontend` – Next.js application with Tailwind CSS and shadcn/ui.
- `backend` – Express server with Supabase client and shared data schema.

## Development

Install dependencies:

```bash
pnpm install
```

Run the frontend:

```bash
pnpm dev
```

Compile contracts:

```bash
pnpm --filter contracts build
```

Run contract tests:

```bash
pnpm --filter contracts test
```
