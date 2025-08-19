# Crochet Musings by Hema - Website

A beautiful, responsive website for Crochet Musings by Hema, showcasing handmade festive gift hampers and crochet items.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components
- **Smooth Scrolling**: Interactive navigation with smooth scrolling effects
- **Professional Layout**: Clean, festive design matching the brand aesthetic
- **Contact Integration**: Direct links to Instagram and WhatsApp for easy ordering
- **Keycloak Authentication**: Secure user authentication with Keycloak SSO
- **Multi-Environment Support**: Automatic configuration for development, GitHub Pages, and custom domains

## Website Sections

1. **Header**: Brand name with festive styling, "Limited Offer" badge, and authentication
2. **Hero Section**: Eye-catching introduction with the promotional image
3. **About Section**: Three key features (Handmade with Love, Festive & Beautiful, Customizable)
4. **Packages Section**: Three hamper options with detailed contents and pricing
5. **Contact Section**: Instagram and WhatsApp contact buttons
6. **Footer**: Brand information and copyright

## Authentication Features

- **Keycloak Integration**: Secure SSO authentication with your existing Keycloak instance
- **User Profile**: Displays user information in the header after login
- **Automatic Logout**: Secure logout with Keycloak session termination
- **Environment Detection**: Automatically configures redirect URIs for different deployment environments
- **PKCE Security**: Implements PKCE flow for enhanced security in public clients

## Package Options

- **Budget Festive Hamper (₹400)**: 2 Earthen Diyas, 1 Crochet Diya Magnet, 2 Resin Crochet Coasters, 40g Assorted Dry Fruits
- **Premium Festive Hamper (₹650)**: 2 Tealight Candles, 2 Crochet Tealight Holders, 2 Crochet Diya Magnets, 2 Resin Crochet Coasters, 40g Assorted Dry Fruits
- **Exclusive Festive Hamper (₹1000)**: Resin Crochet Tray + Matching 4 Resin Crochet Coasters, 5 Crochet Flowers, 2 Diya Magnets, Assorted Dry Fruits (40gm) in Crochet Potli, 4 Tea Candle Lights with Crochet Holder

## Technology Stack

- **React 18**: Modern JavaScript framework
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Lucide React**: Beautiful icons
- **React Router**: Client-side routing for authentication callbacks
- **Keycloak**: Enterprise-grade authentication and authorization
- **Framer Motion**: Smooth animations (available for future enhancements)

## Authentication Setup

For detailed instructions on configuring Keycloak authentication, see [KEYCLOAK_SETUP.md](./KEYCLOAK_SETUP.md).

**Quick Setup:**
1. Your website will be deployed to: `https://hema.prabodh.in`
2. Configure Keycloak client with redirect URI: `https://hema.prabodh.in/auth/callback`
3. Ensure valid redirect URIs and web origins are set in Keycloak

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deploying to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Create a new repository on GitHub**
2. **Push your code to the repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

3. **Create GitHub Actions workflow**:
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
       - name: Checkout
         uses: actions/checkout@v3

       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           cache: 'npm'

       - name: Install dependencies
         run: npm ci

       - name: Build
         run: npm run build

       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         if: github.ref == 'refs/heads/main'
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

4. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click "Save"

### Method 2: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Create a new repository on GitHub**

3. **Upload the contents of the `dist/` folder to your repository**

4. **Enable GitHub Pages**:
   - Go to repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Click "Save"

## Customization

### Updating Content
- Edit `src/App.jsx` to modify text, packages, or contact information
- Replace `src/assets/promo-image.png` with your own promotional image
- Update colors in `src/App.css` if needed

### Adding New Packages
To add or modify packages, update the `packages` array in `src/App.jsx`:

```javascript
const packages = [
  {
    id: 'new-package',
    name: 'New Package Name',
    price: '₹XXX',
    items: [
      'Item 1',
      'Item 2',
      // ... more items
    ],
    popular: false // Set to true for "Most Popular" badge
  }
]
```

### Contact Information
Update the contact buttons in the contact section:
- Instagram: Change the URL in the Instagram button click handler
- WhatsApp: Update the phone number in the WhatsApp button click handler

## File Structure

```
crochet-musings-website/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── promo-image.png
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── badge.jsx
│   │       └── ... (other UI components)
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── dist/ (generated after build)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Support

For any issues or questions about the website, please contact:
- Instagram: [@crochetmusingsbyhema](https://instagram.com/crochetmusingsbyhema)
- WhatsApp: [+91-99492 11170](https://wa.me/919949211170)

## License

This project is created for Crochet Musings by Hema. All rights reserved.

