import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Jump to the top of the page on every route change so each page opens at its
 * start rather than wherever the previous page was scrolled to.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
