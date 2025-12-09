"use client"

import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function SupportPage() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: Phone,
      title: t.users.support.phone,
      value: "+212 524 375 251",
      subValue: "+212 661 044 503",
      action: "tel:+212524375251",
      actionLabel: t.users.support.callNow,
    },
    {
      icon: Mail,
      title: t.users.support.email,
      value: "contact@marrakeshtravelservices.com",
      action: "mailto:contact@marrakeshtravelservices.com",
      actionLabel: t.users.support.sendEmail,
    },
    {
      icon: MapPin,
      title: t.users.support.address,
      value: "Rue Bani marine, Appt N°5",
      subValue: "Medina, Marrakech, Morocco",
      action: "https://maps.google.com/?q=Rue+Bani+marine+Medina+Marrakech",
      actionLabel: t.users.support.viewMap,
    },
    {
      icon: Clock,
      title: t.users.support.workingHours,
      value: t.users.support.workingDays,
      subValue: t.users.support.workingTime,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.users.support.pageTitle}</h1>
        <p className="text-muted-foreground mt-1">
          {t.users.support.pageDescription}
        </p>
      </div>

      {/* Response Time Notice */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        <p className="text-sm text-green-700 dark:text-green-400">
          {t.users.support.responseNotice} <span className="font-semibold">{t.users.support.under2Hours}</span>
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="bg-background rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <info.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{info.title}</p>
                <p className="text-sm font-medium text-foreground">{info.value}</p>
                {info.subValue && (
                  <p className="text-sm text-muted-foreground mt-0.5">{info.subValue}</p>
                )}
                {info.action && (
                  <a
                    href={info.action}
                    target={info.action.startsWith("http") ? "_blank" : undefined}
                    rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium mt-2 transition-colors"
                  >
                    {info.actionLabel}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Quick Contact */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/40 dark:to-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <WhatsAppIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{t.users.support.whatsappTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {t.users.support.whatsappDescription}
            </p>
          </div>
          <a
            href="https://wa.me/212661044503"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t.users.support.startChat}
          </a>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-muted/50 rounded-xl p-5 border border-border">
        <h3 className="font-semibold text-foreground mb-3">{t.users.support.faqTitle}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {t.users.support.faqDescription}
        </p>
        <ul className="space-y-2">
          {[
            t.contact.whyChooseUsItems.localExpertise,
            t.contact.whyChooseUsItems.personalizedExperiences,
            t.contact.whyChooseUsItems.support247,
            t.contact.whyChooseUsItems.bestPrice,
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
