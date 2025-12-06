"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const schedules = [
  { date: "2024-12-15", tours: [{ name: "Sahara Desert Tour", time: "06:00", slots: 8, booked: 5 }] },
  { date: "2024-12-16", tours: [{ name: "Marrakech City Tour", time: "09:00", slots: 15, booked: 12 }, { name: "Atlas Mountains", time: "07:00", slots: 10, booked: 4 }] },
  { date: "2024-12-17", tours: [{ name: "Essaouira Day Trip", time: "08:00", slots: 12, booked: 8 }] },
  { date: "2024-12-18", tours: [] },
  { date: "2024-12-19", tours: [{ name: "Fes Cultural Tour", time: "06:30", slots: 10, booked: 10 }] },
  { date: "2024-12-20", tours: [{ name: "Sahara Desert Tour", time: "06:00", slots: 8, booked: 2 }] },
  { date: "2024-12-21", tours: [{ name: "Marrakech City Tour", time: "09:00", slots: 15, booked: 7 }] },
]

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function TourSchedulesPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11, 1))

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay }
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tour Schedules</h1>
          <p className="text-muted-foreground">Manage tour availability and schedules</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Availability Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-[150px] text-center">{monthName}</span>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: startingDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[100px] bg-muted/30 rounded-lg" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              const schedule = schedules.find((s) => s.date === dateStr)

              return (
                <div
                  key={day}
                  className="min-h-[100px] border border-border rounded-lg p-2 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="text-sm font-medium mb-1">{day}</div>
                  {schedule?.tours.map((tour, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-1 rounded mb-1 ${
                        tour.booked === tour.slots
                          ? "bg-red-100 text-red-800"
                          : tour.booked > tour.slots / 2
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      <div className="font-medium truncate">{tour.name}</div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tour.time} • {tour.booked}/{tour.slots}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
              <span className="text-sm">Available (&gt;50% slots)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300" />
              <span className="text-sm">Filling up (&lt;50% slots)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
              <span className="text-sm">Fully booked</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Schedules */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedules</CardTitle>
          <CardDescription>Next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.filter((s) => s.tours.length > 0).map((schedule) => (
              <div key={schedule.date} className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="text-center min-w-[60px]">
                  <div className="text-2xl font-bold">{new Date(schedule.date).getDate()}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(schedule.date).toLocaleString("default", { month: "short" })}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  {schedule.tours.map((tour, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{tour.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Departure: {tour.time}
                        </p>
                      </div>
                      <Badge variant={tour.booked === tour.slots ? "destructive" : "secondary"}>
                        {tour.booked}/{tour.slots} booked
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
