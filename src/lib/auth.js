// Keycloak authentication utilities

const KEYCLOAK_CONFIG = {
  realm: 'prabodh-in',
  clientId: 'crochet-musings',
  baseUrl: 'https://kc.prabodh.in',
  redirectUri: getRedirectUri()
}

// Get the appropriate redirect URI based on environment
function getRedirectUri() {
  // For production deployment
  if (window.location.hostname === 'hema.prabodh.in') {
    return 'https://hema.prabodh.in/auth/callback'
  }
  
  // For GitHub Pages deployment (if using github.io domain)
  if (window.location.hostname.includes('github.io')) {
    // Get the current base path (e.g., /crochet-musings)
    const basePath = window.location.pathname.split('/')[1]
    if (basePath && basePath !== 'auth') {
      return `${window.location.origin}/${basePath}/auth/callback`
    }
    return window.location.origin + '/auth/callback'
  }
  
  // For local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return window.location.origin + '/auth/callback'
  }
  
  // Default fallback
  return window.location.origin + '/auth/callback'
}

// Generate a random state parameter for security
function generateState() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Generate PKCE code verifier and challenge
function generateCodeVerifier() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode.apply(null, array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

// Build Keycloak authorization URL
export async function buildAuthUrl() {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  
  // Store state and code verifier in sessionStorage for later verification
  sessionStorage.setItem('auth_state', state)
  sessionStorage.setItem('code_verifier', codeVerifier)
  
  const params = new URLSearchParams({
    client_id: KEYCLOAK_CONFIG.clientId,
    redirect_uri: KEYCLOAK_CONFIG.redirectUri,
    response_type: 'code',
    scope: 'openid profile email',
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  })
  
  return `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth?${params.toString()}`
}

// Handle the callback from Keycloak
export async function handleAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const error = urlParams.get('error')
  
  if (error) {
    throw new Error(`Authentication error: ${error}`)
  }
  
  if (!code || !state) {
    throw new Error('Missing authorization code or state parameter')
  }
  
  // Verify state parameter
  const storedState = sessionStorage.getItem('auth_state')
  if (state !== storedState) {
    throw new Error('Invalid state parameter')
  }
  
  // Exchange authorization code for tokens
  const codeVerifier = sessionStorage.getItem('code_verifier')
  const tokenResponse = await fetch(`${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KEYCLOAK_CONFIG.clientId,
      code: code,
      redirect_uri: KEYCLOAK_CONFIG.redirectUri,
      code_verifier: codeVerifier
    })
  })
  
  if (!tokenResponse.ok) {
    throw new Error('Failed to exchange authorization code for tokens')
  }
  
  const tokens = await tokenResponse.json()
  
  // Store tokens securely
  localStorage.setItem('access_token', tokens.access_token)
  localStorage.setItem('refresh_token', tokens.refresh_token)
  localStorage.setItem('id_token', tokens.id_token)
  
  // Clean up session storage
  sessionStorage.removeItem('auth_state')
  sessionStorage.removeItem('code_verifier')
  
  return tokens
}

// Get user info from token
export function getUserInfo() {
  const idToken = localStorage.getItem('id_token')
  if (!idToken) return null
  
  try {
    // Decode JWT token (simple base64 decode - in production, verify signature)
    const payload = JSON.parse(atob(idToken.split('.')[1]))
    return {
      sub: payload.sub,
      name: payload.name || payload.preferred_username,
      email: payload.email,
      given_name: payload.given_name,
      family_name: payload.family_name
    }
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) return false
  
  try {
    // Check if token is expired (simple check - in production, verify signature)
    const payload = JSON.parse(atob(accessToken.split('.')[1]))
    const now = Date.now() / 1000
    return payload.exp > now
  } catch (error) {
    return false
  }
}

// Logout function
export async function logout() {
  const idToken = localStorage.getItem('id_token')
  
  // Clear local storage
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('id_token')
  
  // Get the correct post-logout redirect URI
  function getPostLogoutRedirectUri() {
    // For production deployment
    if (window.location.hostname === 'hema.prabodh.in') {
      return 'https://hema.prabodh.in'
    }
    
    // For GitHub Pages deployment
    if (window.location.hostname.includes('github.io')) {
      const basePath = window.location.pathname.split('/')[1]
      if (basePath && basePath !== 'auth') {
        return `${window.location.origin}/${basePath}/`
      }
      return window.location.origin
    }
    
    // For local development
    return window.location.origin
  }
  
  // Redirect to Keycloak logout
  if (idToken) {
    const postLogoutRedirectUri = getPostLogoutRedirectUri()
    const logoutUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`
    window.location.href = logoutUrl
  } else {
    // Fallback redirect
    const basePath = window.location.pathname.includes('/crochet-musings/') 
      ? '/crochet-musings/' 
      : '/'
    window.location.href = basePath
  }
}

// Refresh access token
export async function refreshToken() {
  const refreshTokenValue = localStorage.getItem('refresh_token')
  if (!refreshTokenValue) {
    throw new Error('No refresh token available')
  }
  
  const response = await fetch(`${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: KEYCLOAK_CONFIG.clientId,
      refresh_token: refreshTokenValue
    })
  })
  
  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }
  
  const tokens = await response.json()
  
  // Update stored tokens
  localStorage.setItem('access_token', tokens.access_token)
  if (tokens.refresh_token) {
    localStorage.setItem('refresh_token', tokens.refresh_token)
  }
  if (tokens.id_token) {
    localStorage.setItem('id_token', tokens.id_token)
  }
  
  return tokens
}

