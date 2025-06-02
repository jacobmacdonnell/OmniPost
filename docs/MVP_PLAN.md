# OmniPost.ai: MVP Development Plan

This document outlines the detailed steps to **build the OmniPost.ai Minimum Viable Product (MVP)**.

**Goal:** Repurpose long-form text content into tailored social media posts for Twitter, LinkedIn, and Instagram using n8n, OpenAI, and a simple HTML/JS frontend.

**Prerequisite:** Ensure your local development environment is set up and n8n is running by following the steps in `local env setup.md`.

---

## Phase 1: Configure OpenAI API Key

- [x] ### 1.1 Obtain an OpenAI API Key
    - [x] Go to the OpenAI API website: [https://platform.openai.com/](https://platform.openai.com/)
    - [x] Sign up or log in to your OpenAI account.
    - [x] Navigate to "API keys" (usually found under your profile icon in the top right, then select "API keys").
    - [x] Click "Create new secret key."
    - [x] **Immediately copy the generated API key** to a secure location (e.g., a temporary text file, password manager). This key will only be shown once upon creation.

- [x] ### 1.2 Add OpenAI Credentials to n8n
    - [x] In the n8n UI (`http://localhost:5678`), click on **"Credentials"** in the left sidebar.
    - [x] Click "New Credential" in the top right.
    - [x] Search for "OpenAI API" and select it from the list.
    - [x] Paste your copied OpenAI API key into the "API Key" field.
    - [x] Enter a descriptive name for your credential (e.g., "OmniPost OpenAI Key").
    - [x] Click "Save".
    - [x] **Note:** Credentials are saved within your n8n Docker volume (`n8n_data`) on the specific machine you are using. You will need to add them to your n8n instance manually on *each* machine you develop on, as they are not part of the workflow JSON and are not synced via Git.

---

## Phase 2: Create and Version Control the n8n Automation Workflow

- [x] ### 2.1 Create a New Workflow
    - [x] In the n8n UI, click on **"Workflows"** in the left sidebar.
    - [x] Click "New Workflow" in the top right.

- [x] ### 2.2 Add a Webhook Trigger Node
    - [x] Click the "+" button (or press `Spacebar`) on the workflow canvas to add a new node.
    - [x] Search for "Webhook" and select the **"Webhook"** trigger node.
    - [x] Configure Webhook Node Parameters (right panel):
        - [x] **Webhook URLs:** Locate the "Test Webhook URL" and **copy it**. Keep this URL handy for the next testing step.
        - [x] **HTTP Method:** Select `POST`.
        - [x] **Response Mode:** Select `Last Node`.
    - [x] Click the "Execute Workflow" button (the small play icon) on the Webhook node itself. This puts the webhook in "listening" mode for a test.

- [x] ### 2.3 Add a Set Node (Prepare Input)
    - [x] Connect a new node from the output handle of the Webhook node (drag a line from its right circle).
    - [x] Search for "Set" and select the **"Set"** node (found under the "Core" section).
    - [x] Configure Set Node Parameters:
        - [x] **Mode:** Select `JSON`.
        - [x] **JSON editor:** Delete any default content in the large text area.
        - [x] **Paste the following JSON structure:**
            ```json
            {
              "longFormContent": "{{ $json.body.content }}"
            }
            ```
        - [x] This step extracts the `content` from the incoming webhook body and assigns it to a variable called `longFormContent`.

- [x] ### 2.4 Test the Webhook (Optional, but Recommended for verification):
    - [x] Open a NEW `bash` terminal window (do not close the one running n8n).
    - [x] Ensure you are in your project root (`omnipost-mvp`).
    - [x] Run the following `curl` command to send a test request to your webhook:
        - [x] **Replace `YOUR_TEST_WEBHOOK_URL_HERE`** with the exact Test Webhook URL you copied from the Webhook node in step 2.2.
        ```bash
        curl -X POST YOUR_TEST_WEBHOOK_URL_HERE \\
        -H "Content-Type: application/json" \\
        -d '{ 
          "content": "This is a test long-form content that needs to be summarized and turned into social media posts for Twitter, LinkedIn, and Instagram. It contains various details about modern AI applications and their impact on daily life."
        }'
        ```
    - [x] Verify in n8n UI:
        - [x] Confirm the Webhook node shows successful execution (a green checkmark and output data).
        - [x] Confirm the Set node also shows successful execution.
        - [x] Inspect Output: Click the Set node and check its "Output" tab in the right panel to ensure `longFormContent` is populated with the test content you sent.

- [x] ### 2.5 Add OpenAI 'Message Model' Node (for Twitter)
    - [x] Connect a new node from the output of the **Set node**.
    - [x] Search for "OpenAI" and select the **"OpenAI Chat Model"** node.
    - [x] Configure OpenAI Chat Model Node Parameters:
        - [x] **Authentication:** Select your previously created OpenAI credential (e.g., "OmniPost OpenAI Key").
        - [x] **Model:** Select `gpt-4o` (or `gpt-3.5-turbo` for potentially faster/cheaper testing during development).
        - [x] **Locate the "Messages" section:** This is a direct parameter field, usually a large box, below "Model" and any "Options". It often has an "Add Item" button within it.
        - [x] Click the "Add Item" button *within the "Messages" section*.
        - [x] **Configure the first message (System role):**
            - [x] **Type:** Select `System`.
            - [x] **Content:** Paste the following prompt:
                ```
                You are a highly skilled social media manager. Your task is to transform long-form content into concise, engaging social media posts tailored for Twitter. Aim for 1-3 short, impactful tweets. Use relevant hashtags and emojis.
                ```
        - [x] Click the "Add Item" again *within the "Messages" section*.
        - [x] **Configure the second message (User role):**
            - [x] **Type:** Select `User`.
            - [x] **Content:** Click the "gear" icon next to the content field and select `Nodes` -> `Set` -> `Output Data` -> `JSON` -> `longFormContent`. This dynamically inserts the content from your Set node.
        - [ ] **Output Parameters:**
            - [ ] **Note:** The AI's response will be available in the node's output at the path `choices[0].message.content`. The Merge node later will need to reference this path.
    - [x] Click the "Execute Node" button on this OpenAI node to test its output. Verify that a Twitter-style post is generated.

- [x] ### 2.6 Add OpenAI 'Message Model' (for LinkedIn)
    - [x] Connect a new node from the output of the **original Set node** (this creates a second branch from the Set node, running in parallel with the Twitter branch).
    - [x] Search for "OpenAI" and select the **"OpenAI Chat Model"** node.
    - [x] Configure OpenAI Chat Model Node Parameters:
        -   [x] **Authentication:** Select your OpenAI credential.
        -   [x] **Model:** Select `gpt-4o`.
        -   [x] **Locate the "Messages" section.**
        -   [x] Click the "Add Item" button *within the "Messages" section*.
        -   [x] **Configure the first message (System role):**
            -   [x] **Type:** Select `System`.
            -   [x] **Content:** Paste the following prompt:
                ```
                You are a highly skilled social media manager. Your task is to transform long-form content into a professional and insightful LinkedIn post. Focus on business insights, value, and thought leadership. Include relevant hashtags.
                ```
        -   [x] Click "Add Item" again *within the "Messages" section*.
        -   [x] **Configure the second message (User role):**
            -   [x] **Type:** Select `User`.
            -   [x] **Content:** Click the "gear" icon and select `Nodes` -> `Set` -> `Output Data` -> `JSON` -> `longFormContent`.
        -   [x] **Output Parameters:**
            -   [x] **Note:** The AI's response will be available in the node's output at the path `choices[0].message.content`.
    - [x] Click the "Execute Node" button on this OpenAI node to test its output. Verify a LinkedIn-style post.

- [x] ### 2.7 Add OpenAI 'Message Model' Node (for Instagram)
    - [x] Connect a new node from the output of the **original Set node** (creating a third parallel branch).
    - [x] Search for "OpenAI" and select the **"OpenAI Chat Model"** node.
    - [x] Configure OpenAI Chat Model Node Parameters:
        -   [x] **Authentication:** Select your OpenAI credential.
        -   [x] **Model:** Select `gpt-4o`.
        -   [x] **Locate the "Messages" section.**
        -   [x] Click the "Add Item" button *within the "Messages" section*.
        -   [x] **Configure the first message (System role):**
            -   [x] **Type:** Select `System`.
            -   [x] **Content:** Paste the following prompt:
                ```
                You are a highly skilled social media manager. Your task is to transform long-form content into a compelling and concise Instagram caption. Focus on visual appeal, strong hooks, and relevant hashtags. (Note: Image generation is out of scope for MVP).
                ```
        -   [x] Click "Add Item" again *within the "Messages" section*.
        -   [x] **Configure the second message (User role):**
            -   [x] **Type:** Select `User`.
            -   [x] **Content:** Click the "gear" icon and select `Nodes` -> `Set` -> `Output Data` -> `JSON` -> `longFormContent`.
        -   [x] **Output Parameters:**
            -   [x] **Note:** The AI's response will be available in the node's output at the path `choices[0].message.content`.
    - [x] Click the "Execute Node" button on this OpenAI node to test its output. Verify an Instagram-style caption.

- [ ] ### 2.8 Add a Merge Node
    - [ ] Add a new node to your workflow.
    - [ ] Search for "Merge" and select the **"Merge"** node (under Core).
    - [ ] Connect all three OpenAI Chat Model nodes to the Merge node. Drag connections from the right side of *each* OpenAI Chat Model node to the left side of the Merge node.
    - [ ] Configure Merge Node Parameters:
        -   **Mode:** Select `Merge By Key`.
        -   **Key:** Type `output`. (This merges the results based on the key `output` which holds the generated posts from each OpenAI node).
        -   **Property Name:** You can leave this as `Combine All` or rename if desired (e.g., `generatedPosts`).
        -   **Remove Duplicate Keys:** Ensure this checkbox is selected.
    - [ ] Click the "Execute Node" button on the Merge node to test.
        -   [ ] Confirm that all three generated posts (from `choices[0].message.content` of each OpenAI node) are now merged into a single JSON object under the `output` key (or your custom `Property Name`) in the Merge node's output. This is the final JSON structure your frontend will receive.

- [ ] ### 2.9 Activate the Workflow
    - [ ] In the top right corner of the n8n workflow editor, toggle the **"Active"** switch to `On`.
    - [ ] **Important:** This makes your production webhook live and accessible for your frontend. The "Test Webhook URL" is only for testing within the n8n editor; your frontend will use the "Production Webhook URL."

- [ ] ### 2.10 Save Workflow and Commit to GitHub
    - [ ] In the n8n UI, click the three dots (`...`) next to the workflow name (or in the top right corner if it's the current workflow).
    - [ ] Select **"Download"**.
    - [ ] **Save this `.json` file directly into your `omnipost-mvp/n8n-workflows/` folder.**
        -   Name the file clearly (e.g., `omnipost_ai_generator.json`).
    - [ ] Open your `bash` terminal and navigate to your `omnipost-mvp` project root.
    - [ ] Add the workflow file to Git:
        ```bash
        git add n8n-workflows/omnipost_ai_generator.json
        ```
    - [ ] Commit your changes:
        ```bash
        git commit -m "Add OmniPost AI Generator n8n workflow"
        ```
    - [ ] Push to GitHub:
        ```bash
        git push origin main
        ```
    - [ ] **Important for syncing:** If developing on multiple machines, after pulling the latest code via `git pull origin main`, you'll need to re-import the workflow JSON (`omnipost_ai_generator.json`) into your local n8n instance on the other machine to reflect any changes.

---

## Phase 3: Build and Version Control the Simple Frontend (HTML/JavaScript)

- [ ] ### 3.1 Create `index.html` File
    - [ ] Open a plain text editor (e.g., VS Code, Sublime Text, Notepad, TextEdit).
    - [ ] Create a new empty file.
    - [ ] **Save this file as `index.html` inside the `omnipost-mvp/frontend/` directory.**

- [ ] ### 3.2 Paste HTML/CSS/JavaScript Code into `index.html`
    - [ ] Copy the entire code block below.
    - [ ] Paste the copied code into your `index.html` file.
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OmniPost.ai - AI Content Repurposer</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                background-color: #f4f7f6;
                color: #333;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background-color: #fff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #2c3e50;
                text-align: center;
                margin-bottom: 25px;
            }
            textarea {
                width: 100%;
                padding: 15px;
                margin-bottom: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-sizing: border-box; /* Include padding in width */
                font-size: 16px;
                min-height: 200px;
                resize: vertical;
            }
            button {
                display: block;
                width: 100%;
                padding: 15px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 18px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            button:hover {
                background-color: #45a049;
            }
            button:disabled {
                background-color: #cccccc;
                cursor: not-allowed;
            }
            .results {
                margin-top: 30px;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }
            .platform-section {
                background-color: #e8f5e9;
                border: 1px solid #c8e6c9;
                border-radius: 6px;
                padding: 15px;
                margin-bottom: 20px;
            }
            .platform-section h3 {
                color: #2e7d32;
                margin-top: 0;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .platform-section p {
                white-space: pre-wrap; /* Preserves whitespace and line breaks */
                font-size: 15px;
                line-height: 1.6;
                color: #555;
                background-color: #ffffff;
                padding: 10px;
                border-radius: 4px;
                border: 1px dashed #cfd8dc;
            }
            .platform-section button {
                width: auto;
                padding: 8px 15px;
                font-size: 14px;
                margin-top: 10px;
                background-color: #007bff;
            }
            .platform-section button:hover {
                background-color: #0056b3;
            }
            .error-message {
                color: #d32f2f;
                background-color: #ffebee;
                border: 1px solid #ef9a9a;
                padding: 10px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
            }
            .icon {
                font-size: 1.2em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OmniPost.ai</h1>
            <p style="text-align: center; color: #666;">Turn your long-form content into engaging social media posts instantly.</p>

            <textarea id="longFormContent" placeholder="Paste your blog post, article, or any long-form text here..."></textarea>
            <button id="generateButton">Generate Social Media Posts</button>

            <div id="errorMessage" class="error-message" style="display: none;"></div>

            <div class="results" id="results" style="display: none;">
                <h2>Generated Posts</h2>
                <div class="platform-section">
                    <h3><span class="icon">🐦</span> Twitter</h3>
                    <p id="twitterOutput"></p>
                    <button class="copy-button" data-target="twitterOutput">Copy Twitter Post</button>
                </div>
                <div class="platform-section">
                    <h3><span class="icon">🔗</span> LinkedIn</h3>
                    <p id="linkedinOutput"></p>
                    <button class="copy-button" data-target="linkedinOutput">Copy LinkedIn Post</button>
                </div>
                <div class="platform-section">
                    <h3><span class="icon">📸</span> Instagram</h3>
                    <p id="instagramOutput"></p>
                    <button class="copy-button" data-target="instagramOutput">Copy Instagram Post</button>
                </div>
            </div>
        </div>

        <script>
            // !! IMPORTANT: Replace with your actual n8n PRODUCTION Webhook URL !!
            // You can find this in your n8n Webhook node AFTER activating the workflow.
            const N8N_WEBHOOK_URL = 'YOUR_PRODUCTION_WEBHOOK_URL_HERE';

            const longFormContentInput = document.getElementById('longFormContent');
            const generateButton = document.getElementById('generateButton');
            const resultsDiv = document.getElementById('results');
            const twitterOutput = document.getElementById('twitterOutput');
            const linkedinOutput = document.getElementById('linkedinOutput');
            const instagramOutput = document.getElementById('instagramOutput');
            const errorMessageDiv = document.getElementById('errorMessage');

            generateButton.addEventListener('click', async () => {
                const content = longFormContentInput.value.trim();
                errorMessageDiv.style.display = 'none'; // Hide previous errors
                resultsDiv.style.display = 'none'; // Hide previous results

                if (!content) {
                    errorMessageDiv.textContent = 'Please paste some content to generate posts.';
                    errorMessageDiv.style.display = 'block';
                    return;
                }

                generateButton.disabled = true;
                generateButton.textContent = 'Generating... Please wait.';

                try {
                    const response = await fetch(N8N_WEBHOOK_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ content: content }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    // Assuming the n8n Merge node outputs a single JSON object with 'output' key
                    // and 'twitterPost', 'linkedinPost', 'instagramPost' inside 'output'
                    const output = data.output; // Adjust 'output' if you changed the Merge node's Property Name

                    twitterOutput.textContent = output.twitterPost || 'No Twitter post generated.';
                    linkedinOutput.textContent = output.linkedinPost || 'No LinkedIn post generated.';
                    instagramOutput.textContent = output.instagramPost || 'No Instagram post generated.';

                    resultsDiv.style.display = 'block';

                } catch (error) {
                    console.error('Error generating posts:', error);
                    errorMessageDiv.textContent = `Error: ${error.message}. Please try again or check your n8n workflow/API key.`;
                    errorMessageDiv.style.display = 'block';
                } finally {
                    generateButton.disabled = false;
                    generateButton.textContent = 'Generate Social Media Posts';
                }
            });

            // Copy to clipboard functionality
            document.querySelectorAll('.copy-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const targetId = event.target.dataset.target;
                    const textToCopy = document.getElementById(targetId).textContent;
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        event.target.textContent = 'Copied!';
                        setTimeout(() => {
                            event.target.textContent = `Copy ${targetId.replace('Output', ' Post').replace('twitter', 'Twitter').replace('linkedin', 'LinkedIn').replace('instagram', 'Instagram')}`;
                        }, 2000); // Reset button text after 2 seconds
                    }).catch(err => {
                        console.error('Failed to copy text: ', err);
                        alert('Failed to copy text. Please copy manually.'); // Fallback alert
                    });
                });
            });

        </script>
    </body>
    </html>
    ```

- [ ] ### 3.3 Update the Webhook URL in `index.html`
    - [ ] Go back to your n8n workflow in your browser.
    - [ ] Click on your Webhook trigger node (the very first node in your workflow).
    - [ ] In the "Parameters" panel on the right, under the "Webhook URLs" section, locate the **"Production" Webhook URL**.
    - [ ] Copy this "Production" Webhook URL.
    - [ ] Paste this URL into your `index.html` file, replacing `'YOUR_PRODUCTION_WEBHOOK_URL_HERE'` in the JavaScript section:
        ```javascript
        const N8N_WEBHOOK_URL = 'YOUR_PRODUCTION_WEBHOOK_URL_HERE'; // <--- PASTE IT HERE
        ```
    - [ ] **Ensure** you use the **Production URL**. The Test URL is only for manual testing *within* the n8n editor.
    - [ ] Save the `index.html` file after updating the URL.

- [ ] ### 3.4 Commit and Push Frontend Changes to GitHub
    - [ ] Open your `bash` terminal and navigate to your `omnipost-mvp` project root.
    - [ ] Add the frontend files to Git:
        ```bash
        git add frontend/index.html
        ```
    - [ ] Commit your changes:
        ```bash
        git commit -m "Add OmniPost frontend HTML/JS"
        ```
    - [ ] Push to GitHub:
        ```bash
        git push origin main
        ```

---

## Phase 4: Test Your OmniPost.ai MVP!

- [ ] ### 4.1 Test Your OmniPost.ai MVP!
    - [ ] **Ensure n8n is Running:** Verify that your n8n Docker container is still active (check the terminal where you ran the `docker run` command for n8n).
    - [ ] **Ensure n8n Workflow is Active:** In the n8n UI, confirm that your `OmniPost AI Generator` workflow is **Active** (the toggle switch in the top right of the workflow editor should be green).
    - [ ] **Open Frontend:** Open your `index.html` file in your web browser (either directly by navigating to the file path or via `http://localhost:8000` if you're using a simple local web server).
    - [ ] **Paste Content:** Paste some long-form text (e.g., a blog post, article) into the large textarea on the OmniPost.ai web page.
    - [ ] **Generate Posts:** Click the **"Generate Social Media Posts"** button.
        -   **Observe:** The button text should change to "Generating... Please wait."
        -   **Verify Output:** After a few seconds, the generated Twitter, LinkedIn, and Instagram posts should appear below the button.
    - [ ] **Test Copy Buttons:** Verify that the "Copy" buttons next to each generated post successfully copy the text to your clipboard.