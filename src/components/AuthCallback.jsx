import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { handleAuthCallback } from '@/lib/auth.js'

export function AuthCallback() {
  const [status, setStatus] = useState('processing') // 'processing', 'success', 'error'
  const [error, setError] = useState(null)

  useEffect(() => {
    processCallback()
  }, [])

  const processCallback = async () => {
    try {
      await handleAuthCallback()
      setStatus('success')
      
      // Redirect to home page after successful authentication
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } catch (error) {
      console.error('Authentication callback error:', error)
      setError(error.message)
      setStatus('error')
    }
  }

  const handleRetry = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === 'processing' && (
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-12 w-12 text-green-600" />
            )}
            {status === 'error' && (
              <XCircle className="h-12 w-12 text-red-600" />
            )}
          </div>
          
          <CardTitle>
            {status === 'processing' && 'Processing Authentication...'}
            {status === 'success' && 'Authentication Successful!'}
            {status === 'error' && 'Authentication Failed'}
          </CardTitle>
          
          <CardDescription>
            {status === 'processing' && 'Please wait while we complete your login.'}
            {status === 'success' && 'You will be redirected to the home page shortly.'}
            {status === 'error' && 'There was an error during authentication.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </p>
              <Button onClick={handleRetry} className="w-full">
                Return to Home
              </Button>
            </div>
          )}
          
          {status === 'success' && (
            <p className="text-sm text-green-600">
              Redirecting you to the home page...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

