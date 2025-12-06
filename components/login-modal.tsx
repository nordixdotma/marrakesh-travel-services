"use client"

import { useState, useEffect, createContext, useContext } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Phone, Lock, User, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Auth Context for global state management
interface User {
  id: string
  name: string
  email?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
  openLoginModal: (message?: string) => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState<string | undefined>()

  useEffect(() => {
    // Check localStorage for existing user on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    setIsModalOpen(false)
    setModalMessage(undefined)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const openLoginModal = (message?: string) => {
    setModalMessage(message)
    setIsModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsModalOpen(false)
    setModalMessage(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
      <LoginModal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) closeLoginModal()
        }}
        message={modalMessage}
        onLogin={login}
      />
    </AuthContext.Provider>
  )
}

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: string
  onLogin: (user: User) => void
}

type AuthMode = "login" | "register"
type ContactType = "email" | "phone"

function LoginModal({ open, onOpenChange, message, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [contactType, setContactType] = useState<ContactType>("email")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form fields
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (!open) {
      setEmail("")
      setPhone("")
      setPassword("")
      setConfirmPassword("")
      setName("")
      setError(null)
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }, [open])

  useEffect(() => {
    setError(null)
  }, [mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validation
      const contact = contactType === "email" ? email : phone
      if (!contact) {
        throw new Error(`Please enter your ${contactType === "email" ? "email address" : "phone number"}`)
      }

      if (!password) {
        throw new Error("Please enter your password")
      }

      if (mode === "register") {
        if (!name.trim()) {
          throw new Error("Please enter your name")
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters")
        }
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match")
        }
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create user object
      const userData: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: mode === "register" ? name : contact.split("@")[0] || "User",
        ...(contactType === "email" ? { email } : { phone }),
      }

      onLogin(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {message || (mode === "login"
              ? "Sign in to access your account and favorites"
              : "Join us to save your favorites and bookings")}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Type Toggle */}
          <div className="flex rounded-lg border border-border p-1 bg-muted/30">
            <button
              type="button"
              onClick={() => setContactType("email")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all cursor-pointer",
                contactType === "email"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setContactType("phone")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all cursor-pointer",
                contactType === "phone"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Phone className="h-4 w-4" />
              Phone
            </button>
          </div>

          {/* Name (Register only) */}
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
          )}

          {/* Email/Phone Input */}
          <div className="space-y-2">
            <Label htmlFor="contact">
              {contactType === "email" ? "Email Address" : "Phone Number"}
            </Label>
            <div className="relative">
              {contactType === "email" ? (
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                id="contact"
                type={contactType === "email" ? "email" : "tel"}
                placeholder={contactType === "email" ? "you@example.com" : "+212 6XX XXX XXX"}
                value={contactType === "email" ? email : phone}
                onChange={(e) =>
                  contactType === "email" ? setEmail(e.target.value) : setPhone(e.target.value)
                }
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11 bg-white"
                style={{ color: '#1c1917', WebkitTextFillColor: '#1c1917' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-white"
                  style={{ color: '#1c1917', WebkitTextFillColor: '#1c1917' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 h-11 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </span>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </Button>

          {/* Mode Toggle */}
          <div className="text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
