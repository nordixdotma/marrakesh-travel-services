"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { authApi, affiliateApi, ApiError } from "@/lib/api"

type AuthMode = "login" | "register"

export default function AffiliateLoginPage() {
  const { language } = useLanguage()
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
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

        // Step 1: Register as a user
        const userResponse = await authApi.register(
          name.trim(),
          email.trim(),
          "", // phone (empty for affiliate registration)
          password
        )

        // Store user token
        if (userResponse.token) {
          localStorage.setItem("token", userResponse.token)
          localStorage.setItem("user", JSON.stringify(userResponse.user))
        }

        // Step 2: Register as an affiliate
        try {
          await affiliateApi.register(name.trim(), email.trim())
          
          // Account is created but inactive - show success message
          setMode("login")
          setError("") // Clear any errors
          // Set success message and show modal
          setSuccessMessage(
            language === "fr"
              ? "Inscription réussie! Votre compte d'affilié est en attente d'approbation par un administrateur. Vous recevrez un email une fois votre compte activé."
              : language === "es"
              ? "¡Registro exitoso! Su cuenta de afiliado está pendiente de aprobación por un administrador. Recibirá un correo electrónico una vez que su cuenta esté activada."
              : "Registration successful! Your affiliate account is pending approval by an administrator. You will receive an email once your account is activated."
          )
          setShowSuccessModal(true)
          setPassword("")
          setConfirmPassword("")
          setName("")
          setEmail("")
          setShowPassword(false)
          setShowConfirmPassword(false)
        } catch (affiliateErr) {
          // If affiliate registration fails but user is created, still allow login
          if (affiliateErr instanceof ApiError && affiliateErr.message.includes("already an affiliate")) {
            // User is already an affiliate, just redirect
            localStorage.setItem("affiliate_authenticated", "true")
            window.dispatchEvent(new Event("affiliate-auth-change"))
            router.replace("/affiliate/dashboard")
          } else {
            // Switch to login mode so user can login
            setMode("login")
            setError(
              language === "fr"
                ? "Compte créé avec succès. Veuillez vous connecter."
                : language === "es"
                ? "Cuenta creada exitosamente. Por favor inicie sesión."
                : "Account created successfully. Please log in."
            )
            setPassword("")
            setConfirmPassword("")
            setShowPassword(false)
            setShowConfirmPassword(false)
          }
        }
        setIsLoading(false)
        return
      } else {
        // Login validation
        if (!email || !password) {
          throw new Error(
            language === "fr"
              ? "Veuillez remplir tous les champs"
              : language === "es"
              ? "Por favor complete todos los campos"
              : "Please fill in all fields"
          )
        }

        // Login using email (affiliates use email, not username)
        const loginResponse = await authApi.login(email, null, password)

        // Store token and user
        if (loginResponse.token) {
          localStorage.setItem("token", loginResponse.token)
          localStorage.setItem("user", JSON.stringify(loginResponse.user))
        }

        // Check if user is an affiliate by trying to access dashboard
        try {
          await affiliateApi.getDashboard()
          // User is an affiliate and active
          localStorage.setItem("affiliate_authenticated", "true")
          window.dispatchEvent(new Event("affiliate-auth-change"))
          router.replace("/affiliate/dashboard")
        } catch (dashboardErr) {
          if (dashboardErr instanceof ApiError) {
            // Check if account is inactive
            if (dashboardErr.message.includes("not yet active") || dashboardErr.message.includes("not active")) {
              throw new Error(
                language === "fr"
                  ? "Votre compte d'affilié est en attente d'approbation. Un administrateur activera votre compte sous peu."
                  : language === "es"
                  ? "Su cuenta de afiliado está pendiente de aprobación. Un administrador activará su cuenta pronto."
                  : "Your affiliate account is pending approval. An administrator will activate your account shortly."
              )
            }
            // User is not an affiliate yet
            throw new Error(
              language === "fr"
                ? "Ce compte n'est pas encore affilié. Veuillez vous inscrire en tant qu'affilié."
                : language === "es"
                ? "Esta cuenta aún no es afiliada. Por favor regístrese como afiliado."
                : "This account is not yet an affiliate. Please register as an affiliate."
            )
          }
          throw dashboardErr
        }
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "An error occurred")
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An error occurred")
      }
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

              {/* Email field (Login) */}
              {mode === "login" && (
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
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
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
                        setEmail("")
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

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <DialogTitle className="text-center text-xl">
                {language === "fr"
                  ? "Inscription réussie!"
                  : language === "es"
                  ? "¡Registro exitoso!"
                  : "Registration Successful!"}
              </DialogTitle>
              <DialogDescription className="text-center text-base pt-2">
                {successMessage}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="bg-primary hover:bg-primary/90"
              >
                {language === "fr"
                  ? "Compris"
                  : language === "es"
                  ? "Entendido"
                  : "Got it"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}

