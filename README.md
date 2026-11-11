# Ram Mohan Reddy — Portfolio

A personal portfolio featuring selected full-stack and applied AI projects, an introduction, and a GitHub contributions view.

## About

I’m Ram Mohan Reddy, a Python backend and applied AI engineer based in Bangalore, Karnataka, India. I build full-stack applications and tools that make answers easier to verify.

## Featured projects

- **TAL** — A career workspace for job applications and career conversations.
- **CVLens** — Compares a résumé with a job description and connects matches to supporting evidence.
- **PeerMock** — A mock interview practice and booking experience.
- **OrbitDesk** — A support documentation search experience focused on grounded answers.

## Built with

- React 19 and Vite
- JavaScript and Tailwind CSS
- Framer Motion and Lenis
- Python, FastAPI, and Uvicorn for the optional GitHub contributions API

## Run locally

### Frontend

Requirements: Node.js and npm.

```bash
cd frontend
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

### Optional API

The FastAPI service provides the GitHub contributions endpoint. Run it in a separate terminal:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API is available at `http://127.0.0.1:8000`. The contributions endpoint uses the GitHub CLI (`gh`) to query GitHub; install it and authenticate with `gh auth login` if you want to use that endpoint.

## Production build

```bash
cd frontend
npm run build
npm run preview
```

## Repository structure

```text
backend/   FastAPI application
frontend/  React and Vite application
```

## Links

- [GitHub](https://github.com/rammohanreddiee)
- [X](https://x.com/lone_warrior_49)
- [Email](mailto:krammohan8845@gmail.com)
