"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

const VALID_USERNAME = "affiliate"
const VALID_PASSWORD = "affiliate2025"

type AuthMode = "login" | "register"

export default function AffiliateLoginPage() {
  const { language } = useLanguage()
  const [mode, setMode] = useState<AuthMode>("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (mode === "register") {
        // Registration validation
        if (!name.trim()) {
          throw new Error(
            language === "fr"
              ? "Veuillez entrer votre nom"
              : language === "es"
              ? "Por favor ingrese su nombre"
              : "Please enter your name"
          )
        }
        if (!email.trim()) {
          throw new Error(
            language === "fr"
              ? "Veuillez entrer votre email"
              : language === "es"
              ? "Por favor ingrese su correo electrónico"
              : "Please enter your email"
          )
        }
        if (password.length < 6) {
          throw new Error(
            language === "fr"
              ? "Le mot de passe doit contenir au moins 6 caractères"
              : language === "es"
              ? "La contraseña debe tener al menos 6 caracteres"
              : "Password must be at least 6 characters"
          )
        }
        if (password !== confirmPassword) {
          throw new Error(
            language === "fr"
              ? "Les mots de passe ne correspondent pas"
              : language === "es"
              ? "Las contraseñas no coinciden"
              : "Passwords do not match"
          )
        }

        // Simulate registration
        await new Promise((resolve) => setTimeout(resolve, 800))
        
        // Store registration data (in a real app, this would be sent to a server)
        localStorage.setItem("affiliate_registered", "true")
        localStorage.setItem("affiliate_name", name)
        localStorage.setItem("affiliate_email", email)
        
        // After registration, switch to login mode
        setMode("login")
        setError("")
        setPassword("")
        setConfirmPassword("")
        setShowPassword(false)
        setShowConfirmPassword(false)
        
        // Show success message
        alert(
          language === "fr"
            ? "Inscription réussie! Veuillez vous connecter."
            : language === "es"
            ? "¡Registro exitoso! Por favor inicie sesión."
            : "Registration successful! Please log in."
        )
        setIsLoading(false)
        return
      } else {
        // Login validation
        if (!username || !password) {
          throw new Error(
            language === "fr"
              ? "Veuillez remplir tous les champs"
              : language === "es"
              ? "Por favor complete todos los campos"
              : "Please fill in all fields"
          )
        }

        await new Promise((resolve) => setTimeout(resolve, 400))

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
          localStorage.setItem("affiliate_authenticated", "true")
          window.dispatchEvent(new Event("affiliate-auth-change"))
          router.replace("/affiliate/dashboard")
        } else {
          throw new Error(
            language === "fr"
              ? "Nom d'utilisateur ou mot de passe invalide"
              : language === "es"
              ? "Nombre de usuario o contraseña inválidos"
              : "Invalid username or password"
          )
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2574')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-card/95 backdrop-blur-sm rounded-sm shadow-2xl p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/blacklogo.png"
                alt="Marrakesh Travel"
                width={120}
                height={48}
                className="mb-4"
              />
              <h2 className="text-2xl font-semibold tracking-tight">
                {mode === "login"
                  ? language === "fr"
                    ? "Bienvenue"
                    : language === "es"
                    ? "Bienvenido"
                    : "Welcome back"
                  : language === "fr"
                  ? "Créer un compte"
                  : language === "es"
                  ? "Crear cuenta"
                  : "Create Account"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === "login"
                  ? language === "fr"
                    ? "Connectez-vous pour accéder au panneau d'affiliation"
                    : language === "es"
                    ? "Inicia sesión para acceder al panel de afiliados"
                    : "Sign in to access the affiliate panel"
                  : language === "fr"
                  ? "Inscrivez-vous pour devenir affilié"
                  : language === "es"
                  ? "Regístrate para convertirte en afiliado"
                  : "Sign up to become an affiliate"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (Register only) */}
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    {language === "fr"
                      ? "Nom complet"
                      : language === "es"
                      ? "Nombre completo"
                      : "Full Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={
                        language === "fr"
                          ? "Entrez votre nom complet"
                          : language === "es"
                          ? "Ingrese su nombre completo"
                          : "Enter your full name"
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-9 h-10"
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              {/* Email field (Register only) */}
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    {language === "fr"
                      ? "Email"
                      : language === "es"
                      ? "Correo electrónico"
                      : "Email"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={
                        language === "fr"
                          ? "Entrez votre email"
                          : language === "es"
                          ? "Ingrese su correo electrónico"
                          : "Enter your email"
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 h-10"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
              )}

              {/* Username field (Login only) */}
              {mode === "login" && (
                <div className="space-y-1.5">
                  <label htmlFor="username" className="text-sm font-medium">
                    {language === "fr"
                      ? "Nom d'utilisateur"
                      : language === "es"
                      ? "Nombre de usuario"
                      : "Username"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder={
                        language === "fr"
                          ? "Entrez votre nom d'utilisateur"
                          : language === "es"
                          ? "Ingrese su nombre de usuario"
                          : "Enter your username"
                      }
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-9 h-10"
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium">
                  {language === "fr"
                    ? "Mot de passe"
                    : language === "es"
                    ? "Contraseña"
                    : "Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      language === "fr"
                        ? "Entrez votre mot de passe"
                        : language === "es"
                        ? "Ingrese su contraseña"
                        : "Enter your password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9 h-10"
                    required
                    autoComplete={mode === "register" ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password field (Register only) */}
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    {language === "fr"
                      ? "Confirmer le mot de passe"
                      : language === "es"
                      ? "Confirmar contraseña"
                      : "Confirm Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={
                        language === "fr"
                          ? "Confirmez votre mot de passe"
                          : language === "es"
                          ? "Confirme su contraseña"
                          : "Confirm your password"
                      }
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-9 pr-9 h-10"
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-10" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                    {mode === "login"
                      ? language === "fr"
                        ? "Connexion..."
                        : language === "es"
                        ? "Iniciando sesión..."
                        : "Signing in..."
                      : language === "fr"
                      ? "Inscription..."
                      : language === "es"
                      ? "Registrando..."
                      : "Signing up..."}
                  </span>
                ) : (
                  mode === "login"
                    ? language === "fr"
                      ? "Se connecter"
                      : language === "es"
                      ? "Iniciar sesión"
                      : "Sign In"
                    : language === "fr"
                    ? "S'inscrire"
                    : language === "es"
                    ? "Registrarse"
                    : "Sign Up"
                )}
              </Button>
            </form>

            {/* Toggle between Login and Register */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === "login" ? (
                  <>
                    {language === "fr"
                      ? "Vous n'avez pas de compte? "
                      : language === "es"
                      ? "¿No tienes una cuenta? "
                      : "Don't have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register")
                        setError("")
                        setUsername("")
                        setPassword("")
                        setShowPassword(false)
                      }}
                      className="text-primary hover:underline font-medium"
                    >
                      {language === "fr"
                        ? "S'inscrire"
                        : language === "es"
                        ? "Registrarse"
                        : "Sign up"}
                    </button>
                  </>
                ) : (
                  <>
                    {language === "fr"
                      ? "Vous avez déjà un compte? "
                      : language === "es"
                      ? "¿Ya tienes una cuenta? "
                      : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login")
                        setError("")
                        setName("")
                        setEmail("")
                        setPassword("")
                        setConfirmPassword("")
                        setShowPassword(false)
                        setShowConfirmPassword(false)
                      }}
                      className="text-primary hover:underline font-medium"
                    >
                      {language === "fr"
                        ? "Se connecter"
                        : language === "es"
                        ? "Iniciar sesión"
                        : "Sign in"}
                    </button>
                  </>
                )}
              </p>
            </div>

            {mode === "login" && (
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {language === "fr"
                  ? "Contactez le support IT si vous avez besoin d'accès"
                  : language === "es"
                  ? "Contacte al soporte técnico si necesitas acceso"
                  : "Contact IT support if you need access"}
              </p>
            )}
          </div>
        </div>
    </div>
  )
}

