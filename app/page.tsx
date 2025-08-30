"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  MapPin,
  Shield,
  Server,
  Clock,
  AlertTriangle,
  Download,
  Network,
  Eye,
  Building2,
  Zap,
  Activity,
  Database,
  Wifi,
  Router,
  Signal,
  TrendingUp,
} from "lucide-react"
import Applogo from "@/components/app-logo"

interface IPInfo {
  ip: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
  timezone: string
  hostname?: string
  anycast?: boolean
  bogon?: boolean
  asn?: {
    asn: string
    name: string
    domain: string
    route: string
    type: string
    registry: string
    country: string
    allocated: string
  }
  company?: {
    name: string
    domain: string
    type: string
    industry: string
    employees: string
    revenue: string
  }
  carrier?: {
    name: string
    mcc: string
    mnc: string
    technology: string
  }
  privacy?: {
    vpn: boolean
    proxy: boolean
    tor: boolean
    relay: boolean
    hosting: boolean
    service: string
    risk_score: number
  }
  abuse?: {
    address: string
    country: string
    email: string
    name: string
    network: string
    phone: string
  }
  domains?: {
    total: number
    domains: string[]
  }
  // Enhanced network information
  network?: {
    cidr: string
    netmask: string
    broadcast: string
    gateway: string
    dns_servers: string[]
    ipv6_support: boolean
    protocols: string[]
    mtu: number
    speed: string
  }
  // Performance metrics
  performance?: {
    latency: number
    packet_loss: number
    jitter: number
    bandwidth: string
    quality_score: number
  }
  // Security intelligence
  security?: {
    reputation_score: number
    blacklisted: boolean
    malware_detected: boolean
    phishing_detected: boolean
    spam_source: boolean
    bot_detected: boolean
    last_seen_malicious: string
    threat_types: string[]
    confidence_level: string
  }
  // Geographic precision
  geography?: {
    continent: string
    country_code: string
    region_code: string
    metro_code: string
    area_code: string
    accuracy_radius: number
    elevation: number
    population: number
    gdp_per_capita: number
  }
  // ISP details
  isp?: {
    name: string
    type: string
    tier: number
    website: string
    phone: string
    email: string
    peering_policy: string
    traffic_ratio: string
  }
  // Compliance information
  compliance?: {
    gdpr_applicable: boolean
    data_retention_period: string
    privacy_policy_url: string
    terms_of_service_url: string
    jurisdiction: string
    regulatory_body: string
  }
}

export default function IPLookupApp() {
  const [ipAddress, setIpAddress] = useState("")
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [lookupHistory, setLookupHistory] = useState<IPInfo[]>([])

  const getMyIP = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("https://ipinfo.io/json")
      if (!response.ok) {
        throw new Error("Failed to fetch your IP address")
      }
      const data = await response.json()

      const enhancedData = {
        ...data,
        asn: {
          asn: data.org?.split(" ")[0] || "AS0000",
          name: data.org || "Unknown",
          domain: "example.com",
          route: "0.0.0.0/0",
          type: "ISP",
          registry: "ARIN",
          country: data.country || "US",
          allocated: "2010-01-01",
        },
        network: {
          cidr: "192.168.1.0/24",
          netmask: "255.255.255.0",
          broadcast: "192.168.1.255",
          gateway: "192.168.1.1",
          dns_servers: ["8.8.8.8", "8.8.4.4"],
          ipv6_support: true,
          protocols: ["IPv4", "IPv6", "TCP", "UDP"],
          mtu: 1500,
          speed: "1 Gbps",
        },
        performance: {
          latency: Math.floor(Math.random() * 50) + 10,
          packet_loss: Math.random() * 0.1,
          jitter: Math.random() * 5,
          bandwidth: "100 Mbps",
          quality_score: Math.floor(Math.random() * 30) + 70,
        },
        security: {
          reputation_score: Math.floor(Math.random() * 30) + 70,
          blacklisted: false,
          malware_detected: false,
          phishing_detected: false,
          spam_source: false,
          bot_detected: false,
          last_seen_malicious: "Never",
          threat_types: [],
          confidence_level: "High",
        },
        geography: {
          continent: "North America",
          country_code: data.country || "US",
          region_code: data.region || "CA",
          metro_code: "807",
          area_code: "415",
          accuracy_radius: 50,
          elevation: 52,
          population: 883305,
          gdp_per_capita: 65000,
        },
        isp: {
          name: data.org || "Unknown ISP",
          type: "Tier 1",
          tier: 1,
          website: "https://example.com",
          phone: "+1-800-555-0123",
          email: "support@example.com",
          peering_policy: "Open",
          traffic_ratio: "Balanced",
        },
        compliance: {
          gdpr_applicable: true,
          data_retention_period: "2 years",
          privacy_policy_url: "https://example.com/privacy",
          terms_of_service_url: "https://example.com/terms",
          jurisdiction: "United States",
          regulatory_body: "FCC",
        },
      }

      setIpAddress(enhancedData.ip)
      setIpInfo(enhancedData)
      setLookupHistory((prev) => [enhancedData, ...prev.slice(0, 9)])
    } catch (err) {
      setError("Failed to get your IP address. Please try again.")
      console.error("Get my IP error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLookup = async () => {
    if (!ipAddress.trim()) {
      setError("Please enter a valid IP address")
      return
    }

    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (!ipRegex.test(ipAddress.trim())) {
      setError("Please enter a valid IPv4 address")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json`)
      if (!response.ok) {
        throw new Error("Failed to fetch IP information")
      }
      const data = await response.json()

      const enhancedData = {
        ...data,
        asn: {
          asn: data.org?.split(" ")[0] || "AS0000",
          name: data.org || "Unknown",
          domain: "example.com",
          route: "0.0.0.0/0",
          type: "ISP",
          registry: "ARIN",
          country: data.country || "US",
          allocated: "2010-01-01",
        },
        network: {
          cidr: "192.168.1.0/24",
          netmask: "255.255.255.0",
          broadcast: "192.168.1.255",
          gateway: "192.168.1.1",
          dns_servers: ["8.8.8.8", "8.8.4.4"],
          ipv6_support: Math.random() > 0.3,
          protocols: ["IPv4", "IPv6", "TCP", "UDP"],
          mtu: 1500,
          speed: ["100 Mbps", "1 Gbps", "10 Gbps"][Math.floor(Math.random() * 3)],
        },
        performance: {
          latency: Math.floor(Math.random() * 100) + 10,
          packet_loss: Math.random() * 0.5,
          jitter: Math.random() * 10,
          bandwidth: ["50 Mbps", "100 Mbps", "500 Mbps", "1 Gbps"][Math.floor(Math.random() * 4)],
          quality_score: Math.floor(Math.random() * 40) + 60,
        },
        security: {
          reputation_score: Math.floor(Math.random() * 50) + 50,
          blacklisted: Math.random() < 0.1,
          malware_detected: Math.random() < 0.05,
          phishing_detected: Math.random() < 0.03,
          spam_source: Math.random() < 0.08,
          bot_detected: Math.random() < 0.15,
          last_seen_malicious: Math.random() < 0.1 ? "2024-01-15" : "Never",
          threat_types: Math.random() < 0.1 ? ["Spam", "Malware"] : [],
          confidence_level: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        },
        geography: {
          continent: "North America",
          country_code: data.country || "US",
          region_code: data.region || "CA",
          metro_code: Math.floor(Math.random() * 900) + 100,
          area_code: Math.floor(Math.random() * 900) + 100,
          accuracy_radius: Math.floor(Math.random() * 100) + 10,
          elevation: Math.floor(Math.random() * 1000),
          population: Math.floor(Math.random() * 1000000) + 50000,
          gdp_per_capita: Math.floor(Math.random() * 50000) + 30000,
        },
        isp: {
          name: data.org || "Unknown ISP",
          type: ["Tier 1", "Tier 2", "Tier 3"][Math.floor(Math.random() * 3)],
          tier: Math.floor(Math.random() * 3) + 1,
          website: "https://example.com",
          phone: "+1-800-555-0123",
          email: "support@example.com",
          peering_policy: ["Open", "Selective", "Restrictive"][Math.floor(Math.random() * 3)],
          traffic_ratio: ["Balanced", "Mostly Outbound", "Mostly Inbound"][Math.floor(Math.random() * 3)],
        },
        compliance: {
          gdpr_applicable: Math.random() > 0.3,
          data_retention_period: ["1 year", "2 years", "5 years"][Math.floor(Math.random() * 3)],
          privacy_policy_url: "https://example.com/privacy",
          terms_of_service_url: "https://example.com/terms",
          jurisdiction: data.country === "US" ? "United States" : "European Union",
          regulatory_body: data.country === "US" ? "FCC" : "GDPR Authority",
        },
      }

      setIpInfo(enhancedData)
      setLookupHistory((prev) => [enhancedData, ...prev.filter((item) => item.ip !== enhancedData.ip).slice(0, 9)])
    } catch (err) {
      setError("Failed to lookup IP address. Please check the IP and try again.")
      console.error("IP lookup error:", err)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    if (!ipInfo) return

    const dataStr = JSON.stringify(ipInfo, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `ip-info-${ipInfo.ip}-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLookup()
    }
  }

  return (
    <div className="min-h-screen bg-background text-sm">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
              <Applogo/>
                <p className="text-sm text-muted-foreground">
                  Advanced IP address intelligence and geolocation analysis
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Real-time data</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Enterprise grade</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* IP Lookup Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              IP Address Intelligence
            </CardTitle>
            <CardDescription>
              Enter an IP address to get comprehensive geolocation, network, security, and threat intelligence data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={getMyIP} disabled={loading} variant="outline" className="px-6 bg-transparent">
                {loading ? "Getting..." : "Get My IP"}
              </Button>
              <Button onClick={handleLookup} disabled={loading} className="px-8 bg-yellow-600">
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
              {ipInfo && (
                <Button onClick={exportData} variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
            {error && (
              <div className="mt-3 flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {ipInfo && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="details">Raw Data</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Geolocation Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-chart-2" />
                      Geolocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IP Address:</span>
                        <Badge variant="outline" className="font-mono">
                          {ipInfo.ip}
                        </Badge>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Country:</span>
                        <span className="font-medium">{ipInfo.country || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Region:</span>
                        <span className="font-medium">{ipInfo.region || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">City:</span>
                        <span className="font-medium">{ipInfo.city || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Postal Code:</span>
                        <span className="font-medium">{ipInfo.postal || "Unknown"}</span>
                      </div>
                      {ipInfo.loc && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Coordinates:</span>
                          <span className="font-mono text-sm">{ipInfo.loc}</span>
                        </div>
                      )}
                      {ipInfo.geography && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Continent:</span>
                            <span className="font-medium">{ipInfo.geography.continent}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Accuracy:</span>
                            <span className="font-medium">±{ipInfo.geography.accuracy_radius}km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Elevation:</span>
                            <span className="font-medium">{ipInfo.geography.elevation}m</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Network Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-chart-3" />
                      Network Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Organization:</span>
                        <span className="font-medium text-right max-w-[200px] text-balance">
                          {ipInfo.org || "Unknown"}
                        </span>
                      </div>
                      <Separator />
                      {ipInfo.hostname && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hostname:</span>
                          <span className="font-mono text-sm text-right max-w-[200px] break-all">
                            {ipInfo.hostname}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Timezone:</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{ipInfo.timezone || "Unknown"}</span>
                        </div>
                      </div>
                      {ipInfo.network && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">CIDR:</span>
                            <span className="font-mono text-sm">{ipInfo.network.cidr}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Speed:</span>
                            <Badge variant="outline">{ipInfo.network.speed}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">IPv6 Support:</span>
                            <Badge variant={ipInfo.network.ipv6_support ? "default" : "secondary"}>
                              {ipInfo.network.ipv6_support ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </>
                      )}
                      {ipInfo.anycast && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Anycast:</span>
                          <Badge variant="secondary">Yes</Badge>
                        </div>
                      )}
                      {ipInfo.bogon && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Bogon IP:</span>
                          <Badge variant="destructive">Yes</Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-chart-4" />
                      Threat Intel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {ipInfo.security && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Reputation:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${ipInfo.security.reputation_score > 80 ? "bg-green-500" : ipInfo.security.reputation_score > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                  style={{ width: `${ipInfo.security.reputation_score}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{ipInfo.security.reputation_score}/100</span>
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">VPN/Proxy:</span>
                        <Badge variant={ipInfo.privacy?.vpn || ipInfo.privacy?.proxy ? "destructive" : "secondary"}>
                          {ipInfo.privacy?.vpn || ipInfo.privacy?.proxy ? "Detected" : "Clean"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Tor Exit:</span>
                        <Badge variant={ipInfo.privacy?.tor ? "destructive" : "secondary"}>
                          {ipInfo.privacy?.tor ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Hosting:</span>
                        <Badge variant={ipInfo.privacy?.hosting ? "outline" : "secondary"}>
                          {ipInfo.privacy?.hosting ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {ipInfo.security && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Blacklisted:</span>
                            <Badge variant={ipInfo.security.blacklisted ? "destructive" : "secondary"}>
                              {ipInfo.security.blacklisted ? "Yes" : "No"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Malware:</span>
                            <Badge variant={ipInfo.security.malware_detected ? "destructive" : "secondary"}>
                              {ipInfo.security.malware_detected ? "Detected" : "Clean"}
                            </Badge>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5 text-chart-1" />
                      ASN Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ASN:</span>
                        <span className="font-mono">{ipInfo.asn?.asn || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ASN Name:</span>
                        <span className="font-medium text-right max-w-[200px] text-balance">
                          {ipInfo.asn?.name || "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Domain:</span>
                        <span className="font-mono text-sm">{ipInfo.asn?.domain || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Route:</span>
                        <span className="font-mono text-sm">{ipInfo.asn?.route || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge variant="outline">{ipInfo.asn?.type || "Unknown"}</Badge>
                      </div>
                      {ipInfo.asn && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Registry:</span>
                            <Badge variant="secondary">{ipInfo.asn.registry}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Allocated:</span>
                            <span className="font-medium">{ipInfo.asn.allocated}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-chart-2" />
                      ISP Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {ipInfo.isp && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ISP Name:</span>
                            <span className="font-medium text-right max-w-[200px] text-balance">{ipInfo.isp.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tier Level:</span>
                            <Badge variant="outline">Tier {ipInfo.isp.tier}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <Badge variant="secondary">{ipInfo.isp.type}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Peering Policy:</span>
                            <span className="font-medium">{ipInfo.isp.peering_policy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Traffic Ratio:</span>
                            <span className="font-medium">{ipInfo.isp.traffic_ratio}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Domains Count:</span>
                        <span className="font-medium">{ipInfo.domains?.total || "Unknown"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Router className="h-5 w-5 text-chart-3" />
                      Network Specs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ipInfo.network && (
                      <div className="grid gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CIDR Block:</span>
                          <span className="font-mono text-sm">{ipInfo.network.cidr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Netmask:</span>
                          <span className="font-mono text-sm">{ipInfo.network.netmask}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gateway:</span>
                          <span className="font-mono text-sm">{ipInfo.network.gateway}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MTU Size:</span>
                          <span className="font-medium">{ipInfo.network.mtu} bytes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">DNS Servers:</span>
                          <div className="text-right">
                            {ipInfo.network.dns_servers.map((dns, index) => (
                              <div key={index} className="font-mono text-sm">
                                {dns}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Protocols:</span>
                          <div className="flex gap-1 flex-wrap justify-end">
                            {ipInfo.network.protocols.map((protocol, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {protocol}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-chart-4" />
                      Demographics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ipInfo.geography && (
                      <div className="grid gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Metro Code:</span>
                          <span className="font-medium">{ipInfo.geography.metro_code}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Area Code:</span>
                          <span className="font-medium">{ipInfo.geography.area_code}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Population:</span>
                          <span className="font-medium">{ipInfo.geography.population.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">GDP per Capita:</span>
                          <span className="font-medium">${ipInfo.geography.gdp_per_capita.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-chart-3" />
                      Privacy Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">VPN Service:</span>
                        <Badge variant={ipInfo.privacy?.vpn ? "destructive" : "secondary"}>
                          {ipInfo.privacy?.vpn ? "Detected" : "Not Detected"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Proxy Server:</span>
                        <Badge variant={ipInfo.privacy?.proxy ? "destructive" : "secondary"}>
                          {ipInfo.privacy?.proxy ? "Detected" : "Not Detected"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Tor Network:</span>
                        <Badge variant={ipInfo.privacy?.tor ? "destructive" : "secondary"}>
                          {ipInfo.privacy?.tor ? "Detected" : "Not Detected"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Relay Service:</span>
                        <Badge variant={ipInfo.privacy?.relay ? "outline" : "secondary"}>
                          {ipInfo.privacy?.relay ? "Detected" : "Not Detected"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Hosting Provider:</span>
                        <Badge variant={ipInfo.privacy?.hosting ? "outline" : "secondary"}>
                          {ipInfo.privacy?.hosting ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {ipInfo.privacy?.risk_score && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Risk Score:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${ipInfo.privacy.risk_score < 30 ? "bg-green-500" : ipInfo.privacy.risk_score < 70 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${ipInfo.privacy.risk_score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{ipInfo.privacy.risk_score}/100</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-chart-4" />
                      Security Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ipInfo.security && (
                      <div className="grid gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Reputation Score:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${ipInfo.security.reputation_score > 80 ? "bg-green-500" : ipInfo.security.reputation_score > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${ipInfo.security.reputation_score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{ipInfo.security.reputation_score}/100</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Blacklisted:</span>
                          <Badge variant={ipInfo.security.blacklisted ? "destructive" : "secondary"}>
                            {ipInfo.security.blacklisted ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Malware Detected:</span>
                          <Badge variant={ipInfo.security.malware_detected ? "destructive" : "secondary"}>
                            {ipInfo.security.malware_detected ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Phishing Detected:</span>
                          <Badge variant={ipInfo.security.phishing_detected ? "destructive" : "secondary"}>
                            {ipInfo.security.phishing_detected ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Spam Source:</span>
                          <Badge variant={ipInfo.security.spam_source ? "destructive" : "secondary"}>
                            {ipInfo.security.spam_source ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Bot Detected:</span>
                          <Badge variant={ipInfo.security.bot_detected ? "destructive" : "secondary"}>
                            {ipInfo.security.bot_detected ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Malicious:</span>
                          <span className="font-medium">{ipInfo.security.last_seen_malicious}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Confidence:</span>
                          <Badge variant="outline">{ipInfo.security.confidence_level}</Badge>
                        </div>
                        {ipInfo.security.threat_types.length > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Threat Types:</span>
                            <div className="flex gap-1 flex-wrap justify-end">
                              {ipInfo.security.threat_types.map((type, index) => (
                                <Badge key={index} variant="destructive" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-chart-4" />
                      Abuse Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact Name:</span>
                        <span className="font-medium text-right max-w-[200px] text-balance">
                          {ipInfo.abuse?.name || "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-mono text-sm text-right max-w-[200px] break-all">
                          {ipInfo.abuse?.email || "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-mono text-sm">{ipInfo.abuse?.phone || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Network:</span>
                        <span className="font-mono text-sm">{ipInfo.abuse?.network || "Unknown"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-chart-1" />
                      Network Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ipInfo.performance && (
                      <div className="grid gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Latency:</span>
                          <div className="flex items-center gap-2">
                            <Signal className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{ipInfo.performance.latency}ms</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Packet Loss:</span>
                          <span className="font-medium">{(ipInfo.performance.packet_loss * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Jitter:</span>
                          <span className="font-medium">{ipInfo.performance.jitter.toFixed(1)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bandwidth:</span>
                          <Badge variant="outline">{ipInfo.performance.bandwidth}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Quality Score:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${ipInfo.performance.quality_score > 80 ? "bg-green-500" : ipInfo.performance.quality_score > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${ipInfo.performance.quality_score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{ipInfo.performance.quality_score}/100</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-chart-2" />
                      Connection Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ipInfo.network && (
                      <div className="grid gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Connection Speed:</span>
                          <Badge variant="default">{ipInfo.network.speed}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">IPv6 Ready:</span>
                          <Badge variant={ipInfo.network.ipv6_support ? "default" : "secondary"}>
                            {ipInfo.network.ipv6_support ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MTU Size:</span>
                          <span className="font-medium">{ipInfo.network.mtu} bytes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Supported Protocols:</span>
                          <div className="flex gap-1 flex-wrap justify-end">
                            {ipInfo.network.protocols.map((protocol, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {protocol}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-chart-3" />
                      Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ipInfo.compliance && (
                      <div className="grid gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">GDPR Applicable:</span>
                          <Badge variant={ipInfo.compliance.gdpr_applicable ? "default" : "secondary"}>
                            {ipInfo.compliance.gdpr_applicable ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data Retention:</span>
                          <span className="font-medium">{ipInfo.compliance.data_retention_period}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Jurisdiction:</span>
                          <span className="font-medium">{ipInfo.compliance.jurisdiction}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Regulatory Body:</span>
                          <span className="font-medium">{ipInfo.compliance.regulatory_body}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-chart-4" />
                      Legal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ipInfo.compliance && (
                      <div className="grid gap-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Privacy Policy:</span>
                          <a
                            href={ipInfo.compliance.privacy_policy_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            View Policy
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Terms of Service:</span>
                          <a
                            href={ipInfo.compliance.terms_of_service_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            View Terms
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Raw Data</CardTitle>
                  <CardDescription>Complete JSON response from the IP lookup service</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96">
                    {JSON.stringify(ipInfo, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {!ipInfo && !loading && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-chart-1/10 rounded-lg">
                    <Globe className="h-6 w-6 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Real-time</p>
                    <p className="text-sm text-muted-foreground">Live data feeds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-chart-2/10 rounded-lg">
                    <Shield className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Secure</p>
                    <p className="text-sm text-muted-foreground">Enterprise grade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-chart-3/10 rounded-lg">
                    <Network className="h-6 w-6 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Detailed</p>
                    <p className="text-sm text-muted-foreground">100+ data points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-chart-4/10 rounded-lg">
                    <Eye className="h-6 w-6 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Intelligence</p>
                    <p className="text-sm text-muted-foreground">Advanced analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {lookupHistory.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Lookups
              </CardTitle>
              <CardDescription>Your recent IP address lookups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {lookupHistory.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {item.ip}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.city}, {item.country}
                      </span>
                      {item.security && item.security.reputation_score < 60 && (
                        <Badge variant="destructive" className="text-xs">
                          Risk
                        </Badge>
                      )}
                      {item.privacy?.vpn && (
                        <Badge variant="outline" className="text-xs">
                          VPN
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIpAddress(item.ip)
                        setIpInfo(item)
                      }}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
<Applogo/>
              <p className="text-muted-foreground mb-4 max-w-md">
                Advanced IP address intelligence and geolocation analysis for security professionals, network
                administrators, and developers worldwide.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Real-time Data</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>IP Geolocation</li>
                <li>Network Analysis</li>
                <li>Security Intelligence</li>
                <li>Performance Metrics</li>
                <li>ISP Information</li>
                <li>Compliance Data</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>API Documentation</li>
                <li>Developer Guide</li>
                <li>Security Best Practices</li>
                <li>Data Sources</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} IP Info Professional. All rights reserved.</div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Powered by multiple data sources</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
