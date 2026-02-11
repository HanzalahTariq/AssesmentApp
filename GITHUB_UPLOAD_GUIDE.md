# Quick Guide: Push Code to GitHub (Manual Upload)

Since git push is blocked by your network, follow these steps to upload your code via GitHub's web interface:

## Step 1: Create a ZIP file of your project
1. Open File Explorer
2. Navigate to: `D:\Haris\Projects\AssementWebApp`
3. Select ALL files (except `node_modules` folders which are already gitignored)
4. Right-click → Send to → Compressed (zipped) folder
5. Name it: `AssessmentWebApp.zip`

## Step 2: Upload to GitHub
1. Open your browser and go to: https://github.com/mharis161/WebAppAssement
2. Click on **"uploading an existing file"** or **"Add file" → "Upload files"**
3. Drag and drop the **contents** (not the zip, extract it first):
   - client/
   - server/
   - DEPLOY.md
   - README.md
   - .gitignore
   - All other files
4. Add commit message: "Initial commit of Assessment Web App"
5. Click **"Commit changes"**

## Alternative: Use GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Add the repository: `D:\Haris\Projects\AssementWebApp`
4. Click **"Publish repository"**

This will get your code to GitHub despite the network block.
