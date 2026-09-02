import { useAuth0 } from "@auth0/auth0-react"
import React, { useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { usePostHog } from "@posthog/react"
import { POSTHOG_EVENTS } from "../analytics/posthogEvents"

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth0()
  const location = useLocation()
  const posthog = usePostHog()

  useEffect(() => {
    if (!isLoading && !user) {
      posthog?.capture(POSTHOG_EVENTS.AUTH_REQUIRED_REDIRECT, {
        attempted_path: location.pathname,
      })
    }
  }, [isLoading, user, location.pathname, posthog])

  if (isLoading) return <div>Loading...</div>
  if (!user) {
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
