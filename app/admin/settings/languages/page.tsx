"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Globe, Save, Plus, Edit, Trash2, Languages, CheckCircle, Copy } from "lucide-react"

export default function LanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [selectedSection, setSelectedSection] = useState<string>("general")

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧", status: "active", completion: 100 },
    { code: "fr", name: "French", flag: "🇫🇷", status: "active", completion: 95 },
    { code: "ar", name: "Arabic", flag: "🇲🇦", status: "active", completion: 80 },
    { code: "es", name: "Spanish", flag: "🇪🇸", status: "draft", completion: 45 },
    { code: "de", name: "German", flag: "🇩🇪", status: "draft", completion: 30 },
  ]

  const sections = [
    { id: "general", name: "General", keys: 45 },
    { id: "tours", name: "Tours", keys: 120 },
    { id: "booking", name: "Booking", keys: 85 },
    { id: "emails", name: "Emails", keys: 60 },
    { id: "errors", name: "Errors", keys: 35 },
  ]

  const translations = {
    general: [
      { key: "site.title", en: "Marrakesh Travel Services", fr: "Services de Voyage Marrakech", ar: "خدمات السفر مراكش" },
      { key: "nav.home", en: "Home", fr: "Accueil", ar: "الرئيسية" },
      { key: "nav.tours", en: "Tours", fr: "Circuits", ar: "جولات" },
      { key: "nav.about", en: "About Us", fr: "À Propos", ar: "من نحن" },
      { key: "nav.contact", en: "Contact", fr: "Contact", ar: "اتصل بنا" },
      { key: "cta.book_now", en: "Book Now", fr: "Réserver", ar: "احجز الآن" },
      { key: "cta.learn_more", en: "Learn More", fr: "En Savoir Plus", ar: "اعرف المزيد" },
    ]
  }

  const currentLanguage = languages.find(l => l.code === selectedLanguage)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Multi-Language Content</h1>
          <p className="text-muted-foreground">Manage translations for your website</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Import Translations
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Languages List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Languages
            </CardTitle>
            <CardDescription>{languages.length} languages configured</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {languages.map((lang) => (
                <div 
                  key={lang.code}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedLanguage === lang.code 
                      ? "bg-primary/10 border-l-4 border-l-primary" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedLanguage(lang.code)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <p className="font-medium text-sm">{lang.name}</p>
                        <p className="text-xs text-muted-foreground">{lang.code.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        lang.status === "active" 
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {lang.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{lang.completion}%</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          lang.completion === 100 ? "bg-green-500" :
                          lang.completion >= 80 ? "bg-blue-500" :
                          lang.completion >= 50 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${lang.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Translation Editor */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentLanguage?.flag}</span>
                <div>
                  <CardTitle>{currentLanguage?.name} Translations</CardTitle>
                  <CardDescription>{currentLanguage?.completion}% complete</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy from English
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Section Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {sections.map((section) => (
                <Button 
                  key={section.id}
                  variant={selectedSection === section.id ? "default" : "outline"}
                  onClick={() => setSelectedSection(section.id)}
                  size="sm"
                >
                  {section.name}
                  <span className="ml-2 text-xs opacity-70">({section.keys})</span>
                </Button>
              ))}
            </div>

            {/* Translation Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-sm w-1/4">Key</th>
                    <th className="text-left p-3 font-medium text-sm w-1/4">English (Source)</th>
                    <th className="text-left p-3 font-medium text-sm w-1/2">
                      {currentLanguage?.name} Translation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {translations.general.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="p-3">
                        <code className="text-xs bg-muted px-2 py-1 rounded">{item.key}</code>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {item.en}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Input 
                            defaultValue={item[selectedLanguage as keyof typeof item] || ""}
                            placeholder="Enter translation..."
                            className={selectedLanguage === "ar" ? "text-right" : ""}
                            dir={selectedLanguage === "ar" ? "rtl" : "ltr"}
                          />
                          {item[selectedLanguage as keyof typeof item] && (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing 1-7 of 45 keys
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Detection Settings
          </CardTitle>
          <CardDescription>Configure how languages are detected and displayed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="defaultLang">Default Language</Label>
              <select 
                id="defaultLang"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                {languages.filter(l => l.status === "active").map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="detection">Language Detection</Label>
              <select 
                id="detection"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="browser">Browser Preference</option>
                <option value="ip">IP Geolocation</option>
                <option value="manual">Manual Selection Only</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fallback">Fallback Language</Label>
              <select 
                id="fallback"
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
