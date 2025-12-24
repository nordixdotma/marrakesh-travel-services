/**
 * Utility functions for tracking affiliate referrals from URL parameters
 */

/**
 * Get affiliate code from URL search params and store it in localStorage
 * This should be called on page load to track affiliate referrals
 */
export function trackAffiliateFromUrl(): string | null {
  if (typeof window === 'undefined') return null

  const urlParams = new URLSearchParams(window.location.search)
  const affiliateCode = urlParams.get('ref')

  if (affiliateCode) {
    // Store in localStorage with expiration (30 days)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30)
    
    localStorage.setItem('affiliate_ref', affiliateCode)
    localStorage.setItem('affiliate_ref_expires', expirationDate.toISOString())
    
    return affiliateCode
  }

  // Check if we have a stored affiliate code that hasn't expired
  const storedCode = localStorage.getItem('affiliate_ref')
  const expirationStr = localStorage.getItem('affiliate_ref_expires')
  
  if (storedCode && expirationStr) {
    const expiration = new Date(expirationStr)
    if (expiration > new Date()) {
      return storedCode
    } else {
      // Expired, remove it
      localStorage.removeItem('affiliate_ref')
      localStorage.removeItem('affiliate_ref_expires')
    }
  }

  return null
}

/**
 * Get the current affiliate code from localStorage (if valid)
 */
export function getAffiliateCode(): string | null {
  if (typeof window === 'undefined') return null

  const storedCode = localStorage.getItem('affiliate_ref')
  const expirationStr = localStorage.getItem('affiliate_ref_expires')
  
  if (storedCode && expirationStr) {
    const expiration = new Date(expirationStr)
    if (expiration > new Date()) {
      return storedCode
    } else {
      // Expired, remove it
      localStorage.removeItem('affiliate_ref')
      localStorage.removeItem('affiliate_ref_expires')
    }
  }

  return null
}

/**
 * Clear the stored affiliate code
 */
export function clearAffiliateCode(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('affiliate_ref')
  localStorage.removeItem('affiliate_ref_expires')
}

