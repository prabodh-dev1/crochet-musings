# GitHub Pages Deployment Guide

This guide will help you deploy your Crochet Musings website to GitHub Pages for free hosting.

## Prerequisites

- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Git installed on your computer (download from [git-scm.com](https://git-scm.com))

## Step-by-Step Deployment

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., `crochet-musings-website`)
4. Make sure it's set to "Public" (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (we already have these files)
6. Click "Create repository"

### Step 2: Upload Your Website Files

#### Option A: Using Git Command Line (Recommended)

1. Open terminal/command prompt in your website folder
2. Initialize Git repository:
   ```bash
   git init
   ```

3. Add all files:
   ```bash
   git add .
   ```

4. Make your first commit:
   ```bash
   git commit -m "Initial commit - Crochet Musings website"
   ```

5. Add your GitHub repository as remote (replace YOUR_USERNAME and YOUR_REPOSITORY):
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   ```

6. Push to GitHub:
   ```bash
   git push -u origin main
   ```

#### Option B: Using GitHub Web Interface

1. Download all the website files to your computer
2. Go to your new repository on GitHub
3. Click "uploading an existing file"
4. Drag and drop all the website files (except node_modules folder)
5. Write a commit message like "Initial commit - Crochet Musings website"
6. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab (near the top of the page)
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch (this will be created automatically by GitHub Actions)
6. Click "Save"

### Step 4: Wait for Deployment

1. Go to the "Actions" tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your website will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

## Important Notes

### Automatic Updates
- Every time you push changes to the main branch, your website will automatically update
- The GitHub Actions workflow handles building and deploying automatically

### Custom Domain (Optional)
If you want to use your own domain name:
1. Go to repository Settings > Pages
2. Under "Custom domain", enter your domain name
3. Create a CNAME file in your repository root with your domain name
4. Configure your domain's DNS to point to GitHub Pages

### Troubleshooting

**Website not loading?**
- Check the Actions tab for any failed deployments
- Make sure the repository is public
- Verify that GitHub Pages is enabled in settings

**Images not showing?**
- Ensure all image files are in the correct location
- Check that file names match exactly (case-sensitive)

**Contact buttons not working?**
- The Instagram and WhatsApp links should work automatically
- Make sure the social media accounts are active

## Updating Your Website

### To update content:
1. Edit the files in your local copy
2. Test changes locally with `npm run dev`
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update website content"
   git push
   ```

### To update packages or pricing:
1. Edit the `packages` array in `src/App.jsx`
2. Update any text or descriptions as needed
3. Follow the update process above

## Support

If you need help with deployment:
1. Check the GitHub Pages documentation: [docs.github.com/pages](https://docs.github.com/pages)
2. Contact GitHub Support if you encounter technical issues
3. For website customization help, refer to the main README.md file

## Your Website URL

Once deployed, your website will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

Replace YOUR_USERNAME with your GitHub username and YOUR_REPOSITORY with your repository name.

## Security Note

- Never commit sensitive information like API keys or passwords
- The website is public, so all code will be visible to others
- This is perfect for a business website as it increases visibility

