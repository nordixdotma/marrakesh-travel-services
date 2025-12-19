"use client"

import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t } = useLanguage()
  
  const quickLinks = [
    { href: "/", label: t.header.home },
    { href: "/tours", label: t.header.tours },
    { href: "/excursions", label: t.header.excursions },
    { href: "/activities", label: t.header.activities },
    { href: "/packages", label: t.header.packages },
    { href: "/transfers", label: t.header.transfers },
    { href: "/blog", label: "Blog" },
    { href: "/affiliate", label: "Affiliate" },
  ]

  return (
    <footer className="w-full bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <a href="/" className="inline-block">
              <img src="/logo.png" alt="Marrakesh Travel Services" className="h-14 w-auto object-contain" />
            </a>
            <p className="text-sm text-white/80 leading-relaxed">
              {t.footer.brandDescription}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/marrakeshtravelservices/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-amber-400 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/marrakeshtravelservice/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-amber-400 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.tripadvisor.com/Attraction_Review-g293734-d8514036-Reviews-Marrakesh_Travel_Services-Marrakech_Marrakech_Safi.html"
                aria-label="TripAdvisor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-amber-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 120 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M99,33 C99.495,33.495 99.495,33.495 100,34 C101.48638992,34.15655027 102.97949127,34.25066943 104.47265625,34.31640625 C105.37177734,34.35830078 106.27089844,34.40019531 107.19726562,34.44335938 C108.61555664,34.50233398 108.61555664,34.50233398 110.0625,34.5625 C111.01189453,34.60568359 111.96128906,34.64886719 112.93945312,34.69335938 C115.29281353,34.79979276 117.64628354,34.90181008 120,35 C119.140625,40.7421875 119.140625,40.7421875 117.875,43.0625 C116.66265051,45.74698816 117.18253075,47.20698005 118,50 C118.50660156,50.99773438 118.50660156,50.99773438 119.0234375,52.015625 C120.46911125,56.43360399 120.36855252,60.69288406 120.375,65.3125 C120.39949219,66.22451172 120.42398438,67.13652344 120.44921875,68.07617188 C120.48074358,75.4056947 118.76031911,80.34586327 114.359375,86.171875 C107.64256151,92.75826492 100.7609409,96.10178916 91.3125,96.25 C80.93124267,96.11141525 74.78231684,92.71523794 67,86 C65.35,88.64 63.7,91.28 62,94 C57.61364256,91.80682128 56.48743095,90.08649371 54,86 C52.6078125,87.36125 52.6078125,87.36125 51.1875,88.75 C44.72357106,94.24955244 36.86216337,96.71309958 28.4140625,96.32421875 C18.73348323,95.02407623 11.74619541,90.50206205 5.54296875,83.06640625 C0.74009987,76.63420969 -0.55985051,69.2101576 0.28515625,61.34765625 C0.98992994,57.40921503 1.86155743,54.27175764 3.6875,50.6875 C5.21192924,48.11366704 5.21192924,48.11366704 4.875,45.4375 C3.89688944,42.71276343 2.49569813,40.47115343 1,38 C1,37.01 1,36.02 1,35 C2.83111328,34.99613281 2.83111328,34.99613281 4.69921875,34.9921875 C14.22029158,34.82341543 21.50430538,34.04065478 30.0703125,29.49609375 C51.0725261,18.77096334 78.75215454,22.96620121 99,33 Z M35,35 C35.7734375,35.27972656 36.546875,35.55945313 37.34375,35.84765625 C45.95801698,39.16329614 53.095097,42.73705426 57.375,51.25 C57.78878906,52.21679688 57.78878906,52.21679688 58.2109375,53.203125 C59.06018232,55.27806327 59.06018232,55.27806327 61,58 C61.31453125,57.33613281 61.6290625,56.67226563 61.953125,55.98828125 C66.85408167,45.87636764 71.87887843,40.19866825 82.5,36.1875 C83.655,35.795625 84.81,35.40375 86,35 C73.91173111,26.94115407 47.16293096,26.89137936 35,35 Z M11.15625,52.15625 C7.21760926,58.43678523 7.31020939,64.78775898 8,72 C9.6858045,78.23848611 13.66544693,82.51244087 19,86 C24.84979883,89.10660659 30.56629915,90.02119789 37.03515625,88.53125 C43.88978304,86.31241127 49.10959455,82.32062739 52.4375,75.875 C54.8449178,69.69491881 55.14901023,63.05892963 53.33984375,56.66796875 C50.51158369,50.26459208 45.65490021,46.5027737 39.6875,43.125 C28.40471485,39.68279436 18.57944368,43.00673221 11.15625,52.15625 Z M71.375,51.90234375 C67.22070442,58.2400049 67.29517148,64.63052716 68,72 C69.69896301,78.28718049 73.7037384,82.4057083 79,86 C85.00972326,89.33873514 90.44936932,90.01312742 97.10546875,88.53125 C103.66480565,86.39978269 108.87294616,82.36591585 112.4375,76.4375 C115.16304812,70.29026809 115.10436751,63.01885218 113.33984375,56.59765625 C110.50762967,50.20984874 105.44306604,45.82013104 99.0625,43.125 C88.14125532,39.62433232 78.52651185,43.25520322 71.375,51.90234375 Z"/>
                  <path d="M38.3125,51.1875 C42.2448173,53.83952795 44.49898186,56.49694559 46,61 C46.3684431,66.61875724 46.19190228,70.15711379 43,75 C37.82726835,79.6680749 34.60359473,80.36791117 27.76171875,80.26953125 C23.78467609,79.88138989 21.85343136,78.78383547 19,76 C16.0264435,71.98388558 14.65267537,68.39850008 15,63.375 C15.73527069,59.15265347 17.13274391,56.25472313 20,53 C25.751251,48.96715047 31.85892747,48.85395513 38.3125,51.1875 Z M24,58 C22.0868091,60.96874449 21,62.99966228 21,66.5625 C22.41483456,70.01115924 24.03406882,71.74331324 27,74 C30.5,74.83333333 30.5,74.83333333 34,74 C37.2856634,71.57146618 38.70758271,69.87725186 40,66 C40,62.35039425 39.27633948,60.82580073 37,58 C32.87108012,55.10975608 28.09453363,54.99734201 24,58 Z"/>
                  <path d="M95,50 C99.71878688,51.69164058 102.20582817,53.86048618 105,58 C106.78983568,63.36950705 106.88431724,68.19735333 104.375,73.3125 C101.05193885,77.07280603 98.51064546,79.63331855 93.37890625,80.3828125 C88.77154789,80.57035762 85.69409169,80.33465135 81.5,78.3125 C76.86322911,74.02348693 75.32733552,70.3284868 75,64 C75.81568111,58.18827209 77.91932137,55.66985976 82.34375,52.1640625 C86.37049987,49.33394113 90.21657044,49.55634296 95,50 Z M82,61 C81.18886645,63.85334922 81.23863866,66.13912707 82,69 C83.89649551,72.14658666 83.89649551,72.14658666 87,74 C91.12848931,74.66350721 93.19933618,74.43514338 96.875,72.4375 C99.66605308,69.23599794 100,67.21894271 100,63 C98.41161066,59.42612398 97.28365642,58.18910428 94,56 C88.40323409,55.12939197 85.67867171,56.79580376 82,61 Z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-amber-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-2.5v-8.99h2.5v8.99zm-1.25-10.25c-.8 0-1.45-.65-1.45-1.45 0-.8.65-1.45 1.45-1.45s1.45.65 1.45 1.45c0 .8-.65 1.45-1.45 1.45zm13 10.25h-2.5v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.38v4.57h-2.5v-8.99h2.4v1.23h.03c.33-.63 1.14-1.3 2.36-1.3 2.52 0 2.99 1.66 2.99 3.82v5.24z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">{t.footer.explore}</h4>
            <nav className="space-y-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">{t.footer.contactTitle}</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">{t.footer.phone}</span>
                </div>
                <div className="pl-6 space-y-1">
                  <a href="tel:+212524375251" className="block text-sm text-white/70 hover:text-white transition-colors">
                    +212 (0) 524 375 251
                  </a>
                  <a href="tel:+212661044503" className="block text-sm text-white/70 hover:text-white transition-colors">
                    +212 (0) 661 044 503
                  </a>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">{t.footer.email}</span>
                </div>
                <a href="mailto:contact@marrakeshtravelservices.com" className="pl-6 block text-sm text-white/70 hover:text-white transition-colors break-all">
                  contact@marrakeshtravelservices.com
                </a>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">{t.footer.address}</span>
                </div>
                <p className="pl-6 text-sm text-white/70 leading-relaxed">
                  {t.footer.addressLine1}<br />
                  {t.footer.addressLine2}<br />
                  {t.footer.addressLine3}
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Security */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">{t.footer.paySafely}</h4>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              {t.footer.paymentSecure}
            </p>
            <div className="relative h-12 w-full">
              <img src="/payment.png" alt="Secure Payment" className="object-cover object-left rounded-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/60">
            <p>{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <a href="/terms" className="hover:text-white transition-colors">
                {t.footer.terms}
              </a>
              <span className="text-white/30">|</span>
              <span>
                {t.footer.madeBy}{" "}
                <a
                  href="https://la360.ma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  LA360
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
