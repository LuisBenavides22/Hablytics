import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Jump to the top of the page on every route change so each page opens at its
 * start rather than wherever the previous page was scrolled to. A hash in the
 * URL scrolls to that element instead.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
