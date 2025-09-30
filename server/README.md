# Python Server Setup (crewAI)

This guide sets up the Python backend in `server/` using [uv](https://docs.astral.sh/uv/) and runs the crew via project scripts.

## Prerequisites
- Python >= 3.10 and < 3.14
- pip (to install uv) or another way to install uv

## 1) Install uv (once)
```bash
pip install uv
```

## 2) Create and activate a virtual environment (Windows PowerShell)
```bash
cd server
uv venv
.venv\Scripts\activate
```

macOS/Linux:
```bash
cd server
uv venv
source .venv/bin/activate
```

## 3) Install project dependencies
Installs from `pyproject.toml`.
```bash
uv pip install -e .
```

## 4) Environment variables
Create a `.env` file in `server/` (or project root) and add keys as needed, for example:
```bash
OPENAI_API_KEY=your_key_here
```

## 5) Configure your crew
- Edit `src/server/config/agents.yaml`
- Edit `src/server/config/tasks.yaml`
- Extend logic/tools in `src/server/crew.py`
- Adjust entrypoints in `src/server/main.py`

## 6) Run
Use project scripts defined in `pyproject.toml`:
```bash
# from server/ (venv active)
uv run run_crew     # or: uv run server

# other utilities
uv run train
uv run replay
uv run test
```

Alternatively, from the project root with the venv active, you can run:
```bash
crewai run
```

## Notes
- If `uv` is unavailable in your PATH after installation, restart your shell.
- If imports fail, confirm your venv is active and rerun the install step.

## Project structure (server)
```
server/
├─ pyproject.toml          # dependencies and scripts
├─ src/server/
│  ├─ config/
│  │  ├─ agents.yaml
│  │  └─ tasks.yaml
│  ├─ crew.py
│  └─ main.py
└─ knowledge/
```
