// Mock data for admin pages

export interface Booking {
  id: string
  offerId: string
  offerType: "tours" | "excursions" | "activities" | "transfers" | "packages"
  offerTitle: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  adults: number
  children: number
  totalPrice: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
}

export interface AdminUser {
  id: string
  name: string
  email?: string
  phone?: string
  createdAt: string
  bookingsCount: number
}

export interface Review {
  id: string
  offerId: string
  offerType: "tours" | "excursions" | "activities" | "transfers" | "packages"
  offerTitle: string
  userName: string
  userEmail: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: string
  status: "pending" | "approved" | "rejected"
}

// Mock Bookings Data
export const bookings: Booking[] = [
  {
    id: "book-001",
    offerId: "tour-001",
    offerType: "tours",
    offerTitle: "Medina Guided Walking Tour",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    customerPhone: "+1 555-0123",
    date: "2025-12-20",
    adults: 2,
    children: 1,
    totalPrice: 115,
    status: "confirmed",
    createdAt: "2025-12-15T10:30:00Z",
  },
  {
    id: "book-002",
    offerId: "excur-001",
    offerType: "excursions",
    offerTitle: "Sahara Desert 3-Day Adventure",
    customerName: "Marie Dupont",
    customerEmail: "marie.dupont@email.com",
    customerPhone: "+33 6 12 34 56 78",
    date: "2025-12-22",
    adults: 2,
    children: 0,
    totalPrice: 650,
    status: "pending",
    createdAt: "2025-12-16T14:45:00Z",
  },
  {
    id: "book-003",
    offerId: "act-001",
    offerType: "activities",
    offerTitle: "Traditional Cooking Class",
    customerName: "Carlos Garcia",
    customerEmail: "carlos.g@email.com",
    customerPhone: "+34 612 345 678",
    date: "2025-12-18",
    adults: 4,
    children: 0,
    totalPrice: 280,
    status: "completed",
    createdAt: "2025-12-10T09:15:00Z",
  },
  {
    id: "book-004",
    offerId: "tour-002",
    offerType: "tours",
    offerTitle: "Palaces & Gardens Evening Tour",
    customerName: "Emma Wilson",
    customerEmail: "emma.w@email.com",
    customerPhone: "+44 7700 900123",
    date: "2025-12-25",
    adults: 2,
    children: 2,
    totalPrice: 210,
    status: "confirmed",
    createdAt: "2025-12-17T16:20:00Z",
  },
  {
    id: "book-005",
    offerId: "trans-001",
    offerType: "transfers",
    offerTitle: "Airport Transfer - Marrakech",
    customerName: "Ahmed Hassan",
    customerEmail: "ahmed.h@email.com",
    customerPhone: "+212 6 12 34 56 78",
    date: "2025-12-19",
    adults: 3,
    children: 1,
    totalPrice: 45,
    status: "confirmed",
    createdAt: "2025-12-14T11:00:00Z",
  },
  {
    id: "book-006",
    offerId: "pack-001",
    offerType: "packages",
    offerTitle: "Marrakech Complete Experience",
    customerName: "Lisa Anderson",
    customerEmail: "lisa.a@email.com",
    customerPhone: "+1 555-0456",
    date: "2025-12-28",
    adults: 2,
    children: 0,
    totalPrice: 890,
    status: "pending",
    createdAt: "2025-12-17T08:30:00Z",
  },
  {
    id: "book-007",
    offerId: "tour-003",
    offerType: "tours",
    offerTitle: "Atlas Mountains Day Excursion",
    customerName: "Thomas Mueller",
    customerEmail: "t.mueller@email.com",
    customerPhone: "+49 170 1234567",
    date: "2025-12-21",
    adults: 2,
    children: 1,
    totalPrice: 225,
    status: "cancelled",
    createdAt: "2025-12-12T13:45:00Z",
  },
  {
    id: "book-008",
    offerId: "excur-001",
    offerType: "excursions",
    offerTitle: "Sahara Desert 3-Day Adventure",
    customerName: "Sophie Martin",
    customerEmail: "sophie.m@email.com",
    customerPhone: "+33 7 89 01 23 45",
    date: "2025-12-30",
    adults: 1,
    children: 0,
    totalPrice: 325,
    status: "pending",
    createdAt: "2025-12-18T07:00:00Z",
  },
  // Historical bookings for chart data
  {
    id: "book-009",
    offerId: "tour-001",
    offerType: "tours",
    offerTitle: "Medina Guided Walking Tour",
    customerName: "James Brown",
    customerEmail: "james.b@email.com",
    customerPhone: "+1 555-0789",
    date: "2025-11-15",
    adults: 2,
    children: 0,
    totalPrice: 90,
    status: "completed",
    createdAt: "2025-11-10T10:00:00Z",
  },
  {
    id: "book-010",
    offerId: "act-001",
    offerType: "activities",
    offerTitle: "Traditional Cooking Class",
    customerName: "Anna Schmidt",
    customerEmail: "anna.s@email.com",
    customerPhone: "+49 171 2345678",
    date: "2025-11-20",
    adults: 3,
    children: 0,
    totalPrice: 210,
    status: "completed",
    createdAt: "2025-11-15T14:30:00Z",
  },
  {
    id: "book-011",
    offerId: "tour-002",
    offerType: "tours",
    offerTitle: "Palaces & Gardens Evening Tour",
    customerName: "Michael Johnson",
    customerEmail: "m.johnson@email.com",
    customerPhone: "+1 555-0321",
    date: "2025-10-25",
    adults: 2,
    children: 1,
    totalPrice: 170,
    status: "completed",
    createdAt: "2025-10-20T09:45:00Z",
  },
  {
    id: "book-012",
    offerId: "excur-001",
    offerType: "excursions",
    offerTitle: "Sahara Desert 3-Day Adventure",
    customerName: "Laura White",
    customerEmail: "laura.w@email.com",
    customerPhone: "+44 7700 900456",
    date: "2025-10-10",
    adults: 2,
    children: 0,
    totalPrice: 650,
    status: "completed",
    createdAt: "2025-10-05T16:00:00Z",
  },
  {
    id: "book-013",
    offerId: "trans-001",
    offerType: "transfers",
    offerTitle: "Airport Transfer - Marrakech",
    customerName: "David Lee",
    customerEmail: "david.l@email.com",
    customerPhone: "+1 555-0654",
    date: "2025-09-15",
    adults: 2,
    children: 2,
    totalPrice: 45,
    status: "completed",
    createdAt: "2025-09-10T11:30:00Z",
  },
  {
    id: "book-014",
    offerId: "pack-001",
    offerType: "packages",
    offerTitle: "Marrakech Complete Experience",
    customerName: "Emily Davis",
    customerEmail: "emily.d@email.com",
    customerPhone: "+1 555-0987",
    date: "2025-09-20",
    adults: 2,
    children: 0,
    totalPrice: 890,
    status: "completed",
    createdAt: "2025-09-12T08:15:00Z",
  },
  {
    id: "book-015",
    offerId: "tour-001",
    offerType: "tours",
    offerTitle: "Medina Guided Walking Tour",
    customerName: "Robert Wilson",
    customerEmail: "robert.w@email.com",
    customerPhone: "+44 7700 900789",
    date: "2025-08-05",
    adults: 2,
    children: 0,
    totalPrice: 90,
    status: "completed",
    createdAt: "2025-08-01T10:00:00Z",
  },
  {
    id: "book-016",
    offerId: "act-001",
    offerType: "activities",
    offerTitle: "Traditional Cooking Class",
    customerName: "Jennifer Taylor",
    customerEmail: "jennifer.t@email.com",
    customerPhone: "+1 555-0147",
    date: "2025-08-12",
    adults: 2,
    children: 1,
    totalPrice: 175,
    status: "completed",
    createdAt: "2025-08-08T14:00:00Z",
  },
  {
    id: "book-017",
    offerId: "tour-003",
    offerType: "tours",
    offerTitle: "Atlas Mountains Day Excursion",
    customerName: "Christopher Moore",
    customerEmail: "chris.m@email.com",
    customerPhone: "+49 172 3456789",
    date: "2025-07-20",
    adults: 4,
    children: 0,
    totalPrice: 340,
    status: "completed",
    createdAt: "2025-07-15T09:30:00Z",
  },
]

// Mock Users Data
export const users: AdminUser[] = [
  {
    id: "user-001",
    name: "John Smith",
    email: "john.smith@email.com",
    createdAt: "2025-12-15T10:30:00Z",
    bookingsCount: 1,
  },
  {
    id: "user-002",
    name: "Marie Dupont",
    email: "marie.dupont@email.com",
    createdAt: "2025-12-14T14:45:00Z",
    bookingsCount: 2,
  },
  {
    id: "user-003",
    name: "Carlos Garcia",
    email: "carlos.g@email.com",
    phone: "+34 612 345 678",
    createdAt: "2025-12-10T09:15:00Z",
    bookingsCount: 1,
  },
  {
    id: "user-004",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    createdAt: "2025-12-08T16:20:00Z",
    bookingsCount: 3,
  },
  {
    id: "user-005",
    name: "Ahmed Hassan",
    phone: "+212 6 12 34 56 78",
    createdAt: "2025-12-05T11:00:00Z",
    bookingsCount: 2,
  },
  {
    id: "user-006",
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    createdAt: "2025-12-01T08:30:00Z",
    bookingsCount: 1,
  },
  {
    id: "user-007",
    name: "Thomas Mueller",
    email: "t.mueller@email.com",
    phone: "+49 170 1234567",
    createdAt: "2025-11-28T13:45:00Z",
    bookingsCount: 4,
  },
  {
    id: "user-008",
    name: "Sophie Martin",
    email: "sophie.m@email.com",
    createdAt: "2025-11-25T07:00:00Z",
    bookingsCount: 2,
  },
  {
    id: "user-009",
    name: "James Brown",
    email: "james.b@email.com",
    createdAt: "2025-11-20T10:00:00Z",
    bookingsCount: 1,
  },
  {
    id: "user-010",
    name: "Anna Schmidt",
    email: "anna.s@email.com",
    phone: "+49 171 2345678",
    createdAt: "2025-11-15T14:30:00Z",
    bookingsCount: 2,
  },
]

// Mock Reviews Data
export const reviews: Review[] = [
  {
    id: "rev-001",
    offerId: "tour-001",
    offerType: "tours",
    offerTitle: "Medina Guided Walking Tour",
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    rating: 5,
    comment: "Absolutely amazing experience! Our guide was incredibly knowledgeable about the history and culture of the medina. The hidden spots we discovered were breathtaking. Highly recommend this tour to anyone visiting Marrakech!",
    createdAt: "2025-12-16T10:30:00Z",
    status: "approved",
  },
  {
    id: "rev-002",
    offerId: "excur-001",
    offerType: "excursions",
    offerTitle: "Sahara Desert 3-Day Adventure",
    userName: "Laura White",
    userEmail: "laura.w@email.com",
    rating: 5,
    comment: "The desert trip was the highlight of our Morocco vacation. Sleeping under the stars in the Sahara, camel trekking at sunset, and the hospitality of the Berber guides made this unforgettable.",
    createdAt: "2025-12-12T14:45:00Z",
    status: "approved",
  },
  {
    id: "rev-003",
    offerId: "act-001",
    offerType: "activities",
    offerTitle: "Traditional Cooking Class",
    userName: "Carlos Garcia",
    userEmail: "carlos.g@email.com",
    rating: 4,
    comment: "Great cooking class! Learned how to make authentic tagine and couscous. The chef was patient and fun. Only minor issue was the class started a bit late.",
    createdAt: "2025-12-11T09:15:00Z",
    status: "approved",
  },
  {
    id: "rev-004",
    offerId: "tour-002",
    offerType: "tours",
    offerTitle: "Palaces & Gardens Evening Tour",
    userName: "Emma Wilson",
    userEmail: "emma.w@email.com",
    rating: 5,
    comment: "The golden hour lighting at Bahia Palace was magical. Our guide knew all the best photo spots. Majorelle Gardens at sunset was absolutely stunning!",
    createdAt: "2025-12-10T16:20:00Z",
    status: "approved",
  },
  {
    id: "rev-005",
    offerId: "trans-001",
    offerType: "transfers",
    offerTitle: "Airport Transfer - Marrakech",
    userName: "Ahmed Hassan",
    userEmail: "ahmed.h@email.com",
    rating: 5,
    comment: "Smooth and professional airport transfer. Driver was waiting for us with a sign, car was clean and comfortable. Great start to our vacation!",
    createdAt: "2025-12-08T11:00:00Z",
    status: "approved",
  },
  {
    id: "rev-006",
    offerId: "tour-003",
    offerType: "tours",
    offerTitle: "Atlas Mountains Day Excursion",
    userName: "Thomas Mueller",
    userEmail: "t.mueller@email.com",
    rating: 3,
    comment: "The mountain views were beautiful but the drive was quite long. The Berber village visit was authentic though the lunch could have been better.",
    createdAt: "2025-12-05T13:45:00Z",
    status: "approved",
  },
  {
    id: "rev-007",
    offerId: "pack-001",
    offerType: "packages",
    offerTitle: "Marrakech Complete Experience",
    userName: "Lisa Anderson",
    userEmail: "lisa.a@email.com",
    rating: 5,
    comment: "This package had everything we wanted and more. From the medina tour to the cooking class, every detail was perfectly organized. Best value for money!",
    createdAt: "2025-12-03T08:30:00Z",
    status: "pending",
  },
  {
    id: "rev-008",
    offerId: "tour-001",
    offerType: "tours",
    offerTitle: "Medina Guided Walking Tour",
    userName: "Sophie Martin",
    userEmail: "sophie.m@email.com",
    rating: 4,
    comment: "Very informative tour with a friendly guide. Got to see parts of the medina I would never have found on my own. The mint tea break was a nice touch.",
    createdAt: "2025-12-01T07:00:00Z",
    status: "pending",
  },
]

// Helper function to get booking by ID
export function getBookingById(id: string): Booking | undefined {
  return bookings.find((booking) => booking.id === id)
}

// Helper function to get user by ID
export function getUserById(id: string): AdminUser | undefined {
  return users.find((user) => user.id === id)
}

// Helper function to get review by ID
export function getReviewById(id: string): Review | undefined {
  return reviews.find((review) => review.id === id)
}

// Helper function to get monthly booking stats (last 6 months)
export function getMonthlyBookingStats(): { month: string; bookings: number; revenue: number }[] {
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentYear = 2025
  
  return months.map((month, index) => {
    const monthIndex = 6 + index // July is 6, December is 11
    const monthBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt)
      return bookingDate.getMonth() === monthIndex && bookingDate.getFullYear() === currentYear
    })
    
    return {
      month,
      bookings: monthBookings.length,
      revenue: monthBookings.reduce((sum, b) => sum + b.totalPrice, 0),
    }
  })
}

// Helper function to get stats summary
export function getStatsSummary() {
  return {
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
    totalUsers: users.length,
    totalReviews: reviews.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    pendingReviews: reviews.filter((r) => r.status === "pending").length,
  }
}
