import { useEffect, useRef } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { usePostHog } from "@posthog/react"

const PostHogIdentify = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const posthog = usePostHog()
  const wasAuthenticated = useRef(false)

  useEffect(() => {
    if (!posthog || isLoading) return

    if (isAuthenticated && user) {
      posthog.identify(user.sub, { email: user.email, name: user.name })
      wasAuthenticated.current = true
    } else if (wasAuthenticated.current) {
      posthog.reset()
      wasAuthenticated.current = false
    }
  }, [isAuthenticated, isLoading, user, posthog])

  return null
}

export default PostHogIdentify
