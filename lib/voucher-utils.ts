import { jsPDF } from "jspdf"

interface VoucherData {
  booking: any
  offer: any
  userProfile: any
  t: any
}

export const generateVoucherPDF = async (data: VoucherData) => {
  const { booking, offer, userProfile, t } = data
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const vt = t.users.bookingDetails.voucher

  // Styles
  const primaryColor = [191, 155, 48] // #BF9B30 - Gold
  const secondaryColor = [31, 41, 55] // #1F2937 - Dark Gray
  const lightGray = [243, 244, 246]
  const white = [255, 255, 255]

  // Header Background
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.rect(0, 0, 210, 45, "F")

  // Logo
  try {
    // We attempt to add the logo if it's accessible as a path or if we were to pass it as base64
    // For now, we'll use the logo.png from the public folder
    doc.addImage("/logo.png", "PNG", 15, 8, 30, 30)
  } catch (e) {
    // Fallback if logo fails
    doc.setTextColor(white[0], white[1], white[2])
    doc.setFontSize(22)
    doc.setFont("helvetica", "bold")
    doc.text("MTS", 15, 20)
  }

  // Website URL (below logo or next to it)
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("www.marrakeshtravelservices.com", 15, 40)

  // Download Date (Right side of header)
  const downloadDate = new Date().toLocaleDateString()
  doc.setFontSize(10)
  doc.text(`${t.header.downloadDate}: ${downloadDate}`, 195, 20, { align: 'right' })

  // Voucher Title
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(140, 25, 55, 12, "F")
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(vt.title, 145, 33)

  // Booking ID & Status (Under header)
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text(`${vt.bookingId}: #${booking.id.substring(0, 8).toUpperCase()}`, 150, 60)
  doc.setFont("helvetica", "normal")
  doc.text(`${vt.bookingDate}: ${new Date(booking.created_at).toLocaleDateString()}`, 150, 66)
  
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(`${vt.status}: ${booking.status.toUpperCase()}`, 15, 60)

  // Divider
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
  doc.line(15, 72, 195, 72)

  // Service Info Section
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(vt.serviceInfo, 15, 82)

  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(16)
  doc.text(offer.title || "Experience", 15, 92)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`${t.offerDetails.preferredDate}: ${new Date(booking.date).toLocaleDateString()}`, 15, 102)
  doc.text(`${vt.departure}: ${offer.depart_city || 'Marrakech'}`, 15, 108)

  // Guest Info Section
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(vt.guestInfo, 110, 82)

  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`${vt.name}: ${userProfile?.name || 'N/A'}`, 110, 92)
  doc.text(`${vt.email}: ${userProfile?.email || 'N/A'}`, 110, 98)
  doc.text(`${vt.phone}: ${userProfile?.phone || 'N/A'}`, 110, 104)

  // Divider
  doc.line(15, 115, 195, 115)

  // Group Summary
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(vt.groupSize, 15, 125)

  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`${vt.adults}: ${booking.adults}`, 15, 133)
  if (booking.children > 0) {
    doc.text(`${vt.children}: ${booking.children}`, 45, 133)
  }

  // Payment Summary Section
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(vt.paymentInfo, 15, 145)

  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  
  let currentY = 155
  if (booking.adults > 0 && offer.priceAdult) {
     doc.text(`${booking.adults} ${vt.adults} x MAD ${offer.priceAdult}`, 15, currentY)
     doc.text(`MAD ${booking.adults * parseFloat(offer.priceAdult)}`, 160, currentY, { align: 'right' })
     currentY += 8
  }
  if (booking.children > 0 && offer.priceChild) {
    doc.text(`${booking.children} ${vt.children} x MAD ${offer.priceChild}`, 15, currentY)
    doc.text(`MAD ${booking.children * parseFloat(offer.priceChild)}`, 160, currentY, { align: 'right' })
    currentY += 8
  }

  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
  doc.line(15, currentY + 2, 165, currentY + 2)
  
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(vt.totalPrice, 15, currentY + 12)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text(`MAD ${parseFloat(booking.total_price)}`, 160, currentY + 12, { align: 'right' })

  // Note Section
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text(vt.note, 15, currentY + 30)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(9)
  const noteLines = doc.splitTextToSize(t.users.bookingDetails.paymentNote, 180)
  doc.text(noteLines, 15, currentY + 36)

  // Footer
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.rect(0, 277, 210, 20, "F")
  doc.setTextColor(white[0], white[1], white[2])
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  const footerLines = doc.splitTextToSize(vt.footerText, 180)
  doc.text(footerLines, 105, 283, { align: 'center' })
  
  doc.text(`${vt.contactUs}: support@marrakeshtravelservices.com | +212 661-044503`, 105, 292, { align: 'center' })

  // Save the PDF
  doc.save(`voucher-${booking.id.substring(0, 8)}.pdf`)
}
