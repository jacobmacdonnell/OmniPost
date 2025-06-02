# OmniPost.ai: Local Development Environment Setup

This document guides you through setting up your **general local development environment**. These steps are foundational and should be performed on each machine you intend to use for development, regardless of the specific project. Ensure you have Docker Desktop and Git installed.

---

## 1. Local Development Environment Setup (Code & n8n Runtime)

- [ ] ### 1.1 Update/Sync Project Code (via Git)
    - [ ] Open your `bash` terminal and navigate to your `omnipost-ai-mvp` project root (assuming your Git repository is already cloned and set up with `n8n-workflows/` and `frontend/` subdirectories).
    - [ ] To ensure your local project code is up-to-date with the latest changes from GitHub, execute:
        ```bash
        git pull origin main
        ```

- [ ] ### 1.2 Run n8n using Docker
    - [ ] Ensure you are in the *root* of your `omnipost-ai-mvp` project directory in your `bash` terminal.
    - [ ] Create a Docker volume for n8n data persistence. This ensures your n8n workflows and credentials are saved even if the container is removed. **(Do this only once per machine unless you explicitly want to reset n8n's data):**
        ```bash
        docker volume create n8n_data
        ```
        -   Confirm the volume is created (e.g., `n8n_data` should be returned in the output).
    - [ ] Run the n8n Docker container:
        ```bash
        docker run -it --rm \
        --name n8n \
        -p 5678:5678 \
        -v n8n_data:/home/node/.n8n \
        docker.n8n.io/n8nio/n8n
        ```
    - [ ] **Important:** This terminal window must remain open and active for n8n to continue running. If you close it, n8n will stop.
    - [ ] Wait for n8n to start (look for messages like `n8n ready on port 5678`).

- [ ] ### 1.3 Access n8n in your browser
    - [ ] Open your web browser.
    - [ ] Navigate to `http://localhost:5678`
    - [ ] Complete the initial n8n setup if prompted (this involves creating your first owner user account).