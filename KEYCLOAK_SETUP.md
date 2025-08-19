# Keycloak Authentication Setup Guide

This guide explains how to configure Keycloak authentication for your Crochet Musings website.

## Current Configuration

The website is configured to work with:
- **Keycloak Server**: `https://kc.prabodh.in`
- **Realm**: `prabodh-in`
- **Client ID**: `crochet-musings`
- **Production Domain**: `https://hema.prabodh.in`

## Redirect URI Configuration

The authentication system automatically detects the environment and uses the appropriate redirect URI:

### Production (Recommended)
- **Domain**: `https://hema.prabodh.in`
- **Redirect URI**: `https://hema.prabodh.in/auth/callback`

### GitHub Pages (Alternative)
- **Domain**: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY`
- **Redirect URI**: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/auth/callback`

### Local Development
- **Domain**: `http://localhost:5173`
- **Redirect URI**: `http://localhost:5173/auth/callback`

## Keycloak Client Configuration

In your Keycloak admin console, ensure the `crochet-musings` client has these settings:

### Basic Settings
- **Client ID**: `crochet-musings`
- **Client Protocol**: `openid-connect`
- **Access Type**: `public` (for frontend applications)
- **Standard Flow Enabled**: `ON`
- **Direct Access Grants Enabled**: `OFF`
- **Service Accounts Enabled**: `OFF`

### Valid Redirect URIs
Add all the redirect URIs you plan to use:
```
https://hema.prabodh.in/auth/callback
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/auth/callback
http://localhost:5173/auth/callback
```

### Web Origins
Add the domains that will host your application:
```
https://hema.prabodh.in
https://YOUR_USERNAME.github.io
http://localhost:5173
```

## Deployment Options

### Option 1: Custom Domain (Recommended)

1. **Deploy to GitHub Pages** following the main deployment guide
2. **Configure Custom Domain**:
   - In your repository settings, go to Pages
   - Under "Custom domain", enter: `hema.prabodh.in`
   - Create a CNAME file in your repository root with content: `hema.prabodh.in`

3. **DNS Configuration**:
   - Create a CNAME record pointing `hema.prabodh.in` to `YOUR_USERNAME.github.io`
   - Or use A records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

### Option 2: GitHub Pages Domain

1. Deploy to GitHub Pages normally
2. Update Keycloak client configuration to include your GitHub Pages URL
3. The authentication will work with the github.io domain

## Testing Authentication

### Local Testing
1. Start the development server: `npm run dev`
2. Add `http://localhost:5173/auth/callback` to Keycloak valid redirect URIs
3. Click the Login button to test the flow

### Production Testing
1. Deploy the website to your chosen domain
2. Ensure the domain is configured in Keycloak
3. Test the complete authentication flow

## Authentication Flow

1. **User clicks Login** → Redirects to Keycloak login page
2. **User enters credentials** → Keycloak validates and redirects back
3. **Callback processing** → Website exchanges code for tokens
4. **User logged in** → Profile information displayed in header

## Security Features

- **PKCE (Proof Key for Code Exchange)**: Protects against authorization code interception
- **State Parameter**: Prevents CSRF attacks
- **Secure Token Storage**: Tokens stored in localStorage with expiration checks
- **Automatic Token Refresh**: Refreshes expired access tokens using refresh tokens

## Troubleshooting

### "Invalid parameter: redirect_uri"
- Check that the redirect URI is exactly configured in Keycloak
- Ensure no trailing slashes or extra parameters
- Verify the domain matches exactly

### "Access Denied" or "Unauthorized Client"
- Check that the client ID matches exactly
- Verify the client is enabled in Keycloak
- Ensure the realm name is correct

### Authentication Works but User Info Missing
- Check that the `openid profile email` scopes are requested
- Verify the ID token contains the expected claims
- Check browser console for token decoding errors

## Environment Variables (Optional)

For more flexibility, you can create environment-specific configurations:

```javascript
// In src/lib/auth.js
const KEYCLOAK_CONFIG = {
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'prabodh-in',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'crochet-musings',
  baseUrl: import.meta.env.VITE_KEYCLOAK_URL || 'https://kc.prabodh.in',
  redirectUri: getRedirectUri()
}
```

Then create `.env` files for different environments:
```bash
# .env.production
VITE_KEYCLOAK_REALM=prabodh-in
VITE_KEYCLOAK_CLIENT_ID=crochet-musings
VITE_KEYCLOAK_URL=https://kc.prabodh.in
```

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify Keycloak client configuration
3. Test with a simple redirect URI first
4. Contact your Keycloak administrator for client configuration help

