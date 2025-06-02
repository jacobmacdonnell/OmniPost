# OmniPost.ai: Dev Workflow (Docker & GitHub UI)

Docker commands are for a command-line terminal. GitHub UI for Git.

**Prerequisites:**
1. `omnipost-mvp` project code present locally.
2. Docker Desktop installed & running.

---

## 1. Initial Setup (Once Per Machine)

**(Ensure you are in the `omnipost-mvp` project root for the following Docker command)**

**1.1 Create n8n Data Volume**
* Run in your terminal:
    ```bash
    docker volume create n8n_data # Persists n8n data
    ```
* Verify: `docker volume ls` (should list `n8n_data`).

---

## 2. Daily Workflow

**(Ensure you are in the `omnipost-mvp` project root for the following Docker commands)**

**2.1 Sync & Run n8n**
1. **Sync Code:** Use GitHub UI to ensure local code is up-to-date.
2. **Run n8n (Choose A or B):**
    * **A) Interactive (Logs in terminal, stops with `Ctrl+C`):**
        ```bash
        docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
        ```
    * **B) Detached (Background mode, terminal free):**
        ```bash
        docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
        ```
        * Logs: `docker logs n8n -f` | Stop: `docker stop n8n` | Start: `docker start n8n`
3. **Verify n8n:** Wait for `n8n ready on port 5678` (check terminal/logs).

**2.2 Access n8n UI**
* Browser: `http://localhost:5678`.
* First run? Complete n8n owner setup.

---

## 3. Syncing n8n Workflows & Credentials

**3.1 n8n Workflows (via GitHub UI)**
* **Exporting (Machine A):**
    1. n8n UI: `File > Download` (saves workflow JSON).
    2. Save JSON to local project (e.g., `n8n-workflows/json_exports/`).
    3. GitHub UI: Commit & push the JSON file.
* **Importing (Machine B):**
    1. GitHub UI: Pull/sync repo to get latest JSON file(s).
    2. n8n UI: `File > Import from File...`, select the JSON file.

**3.2 n8n Credentials**
* **Critical: NEVER push secrets to GitHub.**
* **Setup:** Manually in n8n UI on *each* machine. (Stored in local `n8n_data` volume).

**3.3 Frontend Code (`frontend/`)**
* **Sync:** Use GitHub UI for all `frontend/` code changes.
* **Deps:** If `package.json` changes, run `npm install` or `yarn install` in `frontend/` (terminal).