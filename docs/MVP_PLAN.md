## **OmniPost.ai: MVP Development Plan (AI UI Builder & Polished Frontend)**

**Goal:** Create a tool to transform long-form text into tailored social media posts for Twitter, LinkedIn, and **Threads** using n8n, OpenAI, and an AI-generated, polished frontend.

**Prerequisite:** Local environment setup with n8n running.

---

### **Phase 1: OpenAI Configuration (Completed)**

*   ✅ **1.1 Obtain OpenAI API Key**
*   ✅ **1.2 Add OpenAI Credentials to n8n**

---

### **Phase 2: n8n Workflow Creation & Version Control (Completed)**

*   ✅ **2.1 New Workflow**
*   ✅ **2.2 Webhook Trigger**
    *   Named "IncomingContentWebhook" (or similar).
    *   Params: `HTTP Method: POST`, `Response Mode: Last Node`.
*   ✅ **2.3 Prepare Input (Set Node)** (Named "Prepare Input")
    *   Mode: `JSON`. JSON: `{ "longFormContent": "{{ $json.body.content }}" }`
*   ✅ **2.4 Test Webhook & "Prepare Input" Node**
*   ✅ **2.5 Twitter Post Branch:**
    *   ✅ **2.5.1 OpenAI Node (Twitter)** (Auth: OpenAI Cred, Model: `gpt-4o`, Prompts: System & User `{{ $('Prepare Input').item.json.longFormContent }}`)
    *   ✅ **2.5.2 Format Twitter Output (Set Node)** (Named "FormatTwitterSet", Mode: `Manual Mapping`, Field: `twitterPost` = `{{ $json.choices.message.content }}`)
*   ✅ **2.6 LinkedIn Post Branch:**
    *   ✅ **2.6.1 OpenAI Node (LinkedIn)** (Parallel from "Prepare Input", same Auth/Model/User Content logic)
    *   ✅ **2.6.2 Format LinkedIn Output (Set Node)** (Named "FormatLinkedInSet", Mode: `Manual Mapping`, Field: `linkedinPost` = `{{ $json.choices.message.content }}`)
*   ✅ **2.7 Threads Post Branch:** *(Formerly Instagram)*
    *   ✅ **2.7.1 OpenAI Node (Threads):** (Parallel from "Prepare Input", same Auth/Model/User Content logic, System Prompt updated for Threads)
    *   ✅ **2.7.2 Format Threads Output (Set Node):** (Named "FormatThreadsSet", Mode: `Manual Mapping`, Field: `threadsPost` = `{{ $json.choices.message.content }}`)
*   ✅ **2.8 Merge Posts (Single Merge Node)**
    *   Named "Merge Posts".
    *   **Inputs:** "FormatTwitterSet", "FormatLinkedInSet", "FormatThreadsSet".
    *   **Mode:** `Combine`. **Combine By:** `Position`.
    *   Output: `{ "twitterPost": "...", "linkedinPost": "...", "threadsPost": "..." }` confirmed.
*   ✅ **2.9 Final Output Structure (Set Node)**
    *   Named "FinalOutputSet". Connected from "Merge Posts".
    *   **Mode:** `JSON`. **JSON Editor:** `{ "output": {{ $json }} }`.
    *   Output: `{ "output": { "twitterPost": "...", "linkedinPost": "...", "threadsPost": "..." } }` confirmed.
*   [ ] **2.10 Activate Workflow:**
    *   Toggle "Active" switch (top right of workflow editor) to `On`.
    *   Copy the "Production Webhook URL" from your "IncomingContentWebhook" node (2.2).
*   [ ] **2.11 Save & Commit Workflow:**
    *   Download workflow `.json` (e.g., `omnipost_ai_generator.json`) into `omnipost-mvp/n8n-workflows/`.
    *   `git add n8n-workflows/your_workflow_name.json`
    *   `git commit -m "Finalize n8n workflow for Twitter, LinkedIn, Threads generation"`
    *   `git push origin main`

---

### **Phase 3: Frontend Development (Using AI UI Builder for a Polished UI - e.g., Loveable, v0.dev)**

*   [ ] **3.1 Choose and Access AI UI Builder:**
    *   Select your preferred tool (Loveable.ai, v0.dev, or other).
    *   Sign up/log in. Familiarize yourself with its capabilities for styling, layout, and component generation.

*   [ ] **3.2 Design and Prompt for a Polished UI Generation:**
    *   **Define UI Requirements (with enhanced aesthetics in mind):**
        *   App Title: "OmniPost.ai - AI Content Repurposer" (or similar).
        *   Input Area: Large, clear textarea for "Long-Form Content Input" with a placeholder.
        *   Action Button: Visually distinct "Generate Social Media Posts" button (primary style).
        *   Feedback Areas: Dedicated spots for loading indicators (e.g., spinner) and error messages.
        *   Output Display: Three well-structured "cards" or sections for Twitter, LinkedIn, and Threads. Each card should include:
            *   Platform title/icon (e.g., 🐦 Twitter, 🔗 LinkedIn, 🧵 Threads).
            *   Readable area for the generated post content (preserving line breaks).
            *   A "Copy Post" button (perhaps with an icon).
    *   **Craft Prompts for AI Builder:** Use descriptive text prompts to guide the AI. Include keywords for modern design, good UX, desired components, and layout.
        *   *Example: "Create a modern, responsive web application page for 'OmniPost.ai'. It needs a large textarea input, a primary 'Generate Posts' button. When generating, show a loading indicator. Below, display results in three distinct cards for Twitter, LinkedIn, and Threads, each with a title, content area, and a 'Copy' button. Use a clean, professional theme."*
        *   Iterate on prompts as needed to achieve the desired look and feel.

*   [ ] **3.3 Generate and Refine UI:**
    *   Utilize the AI tool to generate the UI code (e.g., React, Next.js with Tailwind CSS, or HTML/CSS/JS).
    *   Use the tool's built-in features or re-prompting to refine:
        *   Layout (spacing, alignment, responsiveness).
        *   Typography.
        *   Color scheme.
        *   Component styling (buttons, cards, inputs).

*   [ ] **3.4 Integrate JavaScript Logic (or Adapt to Component-Based Logic):**
    *   **Export Code / Work in Environment:** Decide whether to work directly in the AI tool's environment or export the code (e.g., to `omnipost-mvp/frontend/`).
    *   **Identify Elements/State:**
        *   If HTML/JS: Identify the IDs or selectors of the AI-generated elements for input, button, output areas, copy buttons, loading/error displays.
        *   If React/Component-based: Identify how state will manage input text, API responses (`twitterPost`, `linkedinPost`, `threadsPost`), loading status, and error messages.
    *   **Adapt & Embed Core Functionality:**
        *   Port or adapt your existing JavaScript logic for:
            *   Making the `fetch` API call to the n8n webhook.
            *   Handling the `onClick` event for the generate button.
            *   Updating the UI with the `twitterPost`, `linkedinPost`, and `threadsPost` from the API response.
            *   Displaying loading states.
            *   Showing error messages.
            *   Implementing copy-to-clipboard for each post.
        *   Ensure variable names and element selectors/state bindings in your JS/React code match the AI-generated structure.
    *   **Webhook URL:** Prepare the `N8N_WEBHOOK_URL` constant in your frontend code.

*   [ ] **3.5 Test Frontend Interactivity and Appearance:**
    *   Thoroughly test all user flows: inputting text, clicking generate, seeing loading states, viewing results, copying text, seeing errors.
    *   Verify visual appeal and basic responsiveness.

*   [ ] **3.6 Commit and Push Frontend Changes to GitHub:**
    *   Add all new/modified frontend files to your `omnipost-mvp/frontend/` directory (or appropriate structure if using a framework).
    *   `git add frontend/*` (or specific files)
    *   `git commit -m "Generate polished frontend with AI UI builder and integrate core logic"`
    *   `git push origin main`

---

### **Phase 4: MVP Testing (End-to-End)**

*   [ ] **4.1 Finalize Webhook URL in Frontend Code:**
    *   Once the n8n workflow is active (step 2.10 completed), paste the "Production Webhook URL" into your frontend JavaScript/React code where `N8N_WEBHOOK_URL` is defined.
    *   Rebuild/redeploy frontend if necessary.
*   [ ] **4.2 Full System Test:**
    *   [ ] Ensure n8n Docker container is running.
    *   [ ] Confirm n8n workflow is "Active" in the n8n UI.
    *   [ ] Open/serve your AI-generated frontend in a web browser.
    *   [ ] Input long-form text.
    *   [ ] Click the "Generate Social Media Posts" button.
    *   [ ] **Verify:**
        *   Loading indicator appears as expected.
        *   The n8n workflow executes successfully (can be monitored in n8n "Executions" list).
        *   Generated posts for Twitter, LinkedIn, and Threads are displayed correctly in their respective sections on the frontend.
        *   "Copy Post" buttons function correctly for each platform.
        *   Error messages (e.g., if n8n is down or API key is invalid) are handled gracefully and displayed to the user.
        *   Basic responsiveness of the UI.