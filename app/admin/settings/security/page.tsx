"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Save, Key, Lock, AlertTriangle, Eye, EyeOff, Users, Activity, CheckCircle, XCircle } from "lucide-react"

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false)

  const securityLogs = [
    { id: 1, action: "Login", user: "admin", ip: "192.168.1.1", location: "Marrakech, Morocco", time: "2024-01-15 10:30", status: "success" },
    { id: 2, action: "Password Change", user: "admin", ip: "192.168.1.1", location: "Marrakech, Morocco", time: "2024-01-14 15:45", status: "success" },
    { id: 3, action: "Failed Login", user: "unknown", ip: "45.67.89.10", location: "Unknown", time: "2024-01-14 08:22", status: "failed" },
    { id: 4, action: "Settings Update", user: "admin", ip: "192.168.1.1", location: "Marrakech, Morocco", time: "2024-01-13 11:00", status: "success" },
    { id: 5, action: "Failed Login", user: "admin", ip: "123.45.67.89", location: "Paris, France", time: "2024-01-12 22:15", status: "failed" },
  ]

  const blockedIPs = [
    { ip: "45.67.89.10", reason: "Multiple failed logins", blocked: "2024-01-14" },
    { ip: "98.76.54.32", reason: "Suspicious activity", blocked: "2024-01-10" },
    { ip: "12.34.56.78", reason: "Brute force attempt", blocked: "2024-01-05" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security & Anti-Fraud</h1>
          <p className="text-muted-foreground">Manage security settings and monitor threats</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">Secure</p>
                <p className="text-sm text-muted-foreground">System Status</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Blocked IPs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <XCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Failed Logins (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Admin Password
            </CardTitle>
            <CardDescription>Update your admin account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Password Requirements:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• At least 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One number</li>
                <li>• One special character</li>
              </ul>
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Add an extra layer of security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">Require code on every login</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="space-y-2">
                <Label>2FA Method</Label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="email">Email OTP</option>
                  <option value="sms">SMS OTP</option>
                  <option value="authenticator">Authenticator App</option>
                </select>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout</Label>
              <div className="flex gap-2">
                <Input id="sessionTimeout" type="number" defaultValue="60" className="w-24" />
                <span className="flex items-center text-muted-foreground">minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Logs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Security Activity Log
            </CardTitle>
            <CardDescription>Recent security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Action</th>
                    <th className="text-left p-3 font-medium">User</th>
                    <th className="text-left p-3 font-medium">IP Address</th>
                    <th className="text-left p-3 font-medium">Location</th>
                    <th className="text-left p-3 font-medium">Time</th>
                    <th className="text-left p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 text-sm">{log.action}</td>
                      <td className="p-3 text-sm">{log.user}</td>
                      <td className="p-3 text-sm font-mono">{log.ip}</td>
                      <td className="p-3 text-sm">{log.location}</td>
                      <td className="p-3 text-sm">{log.time}</td>
                      <td className="p-3">
                        <span className={`flex items-center gap-1 text-sm ${
                          log.status === "success" ? "text-green-600" : "text-red-600"
                        }`}>
                          {log.status === "success" 
                            ? <CheckCircle className="h-4 w-4" />
                            : <XCircle className="h-4 w-4" />
                          }
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Blocked IPs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Blocked IP Addresses
            </CardTitle>
            <CardDescription>IPs blocked for suspicious activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blockedIPs.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-mono text-sm">{item.ip}</p>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                    <p className="text-xs text-muted-foreground">Blocked: {item.blocked}</p>
                  </div>
                  <Button variant="outline" size="sm">Unblock</Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Label htmlFor="blockIp">Block New IP</Label>
              <div className="flex gap-2 mt-2">
                <Input id="blockIp" placeholder="Enter IP address" />
                <Button>Block</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Anti-Fraud Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Anti-Fraud Settings
            </CardTitle>
            <CardDescription>Configure fraud prevention rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Block VPN/Proxy</p>
                  <p className="text-sm text-muted-foreground">Block bookings from VPNs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Card Verification</p>
                  <p className="text-sm text-muted-foreground">Require CVV for all cards</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Address Verification</p>
                  <p className="text-sm text-muted-foreground">Match billing address</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxBookings">Max Bookings Per Day (Per User)</Label>
              <Input id="maxBookings" type="number" defaultValue="5" className="w-24" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAmount">Max Booking Amount (Review Required)</Label>
              <div className="flex gap-2">
                <Input id="maxAmount" type="number" defaultValue="5000" className="w-32" />
                <span className="flex items-center text-muted-foreground">MAD</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
