"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  ArrowRight,
  Check,
  Twitter,
  Linkedin,
  MessageCircle,
  Clock,
  Users,
  BarChart3,
  Repeat,
  Lightbulb,
  Star,
  FileText,
  Share2,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Play,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

// Pricing plans data
const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for trying out OmniPost.ai",
    monthlyPrice: "0",
    yearlyPrice: "0",
    yearlySavings: "0",
    period: "forever",
    features: ["5 transformations/month", "3 platforms", "Basic analytics", "Email support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "Ideal for content creators",
    monthlyPrice: "29",
    yearlyPrice: "23",
    yearlySavings: "72",
    period: "/month",
    features: [
      "50 transformations/month",
      "3 platforms",
      "Advanced analytics",
      "Priority support",
      "Custom hashtags",
      "Content scheduling",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Max",
    description: "For teams and agencies",
    monthlyPrice: "99",
    yearlyPrice: "79",
    yearlySavings: "240",
    period: "/month",
    features: [
      "Unlimited transformations",
      "All platforms",
      "Team collaboration",
      "White-label options",
      "API access",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Marketing Manager",
    company: "GrowthLabs",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "OmniPost.ai has completely transformed our content strategy. We're now able to repurpose our blog content across all social platforms in minutes instead of hours.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Digital Marketing Director",
    company: "TechFusion",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "The platform-specific optimization is what sets OmniPost apart. Our LinkedIn posts now feel native to the platform while maintaining our brand voice.",
    rating: 5,
  },
  {
    name: "Jessica Williams",
    role: "Content Creator",
    company: "Independent",
    image: "/placeholder.svg?height=48&width=48",
    content:
      "As a solo content creator, OmniPost.ai has been a game-changer. I can focus on creating in-depth content while the AI handles distribution across platforms.",
    rating: 5,
  },
]

const faqs = [
  {
    question: "How does OmniPost.ai work?",
    answer:
      "OmniPost.ai uses advanced AI to analyze your long-form content and transform it into platform-optimized posts for Twitter, LinkedIn, and Threads. Simply paste your content, click generate, and get tailored posts in seconds.",
  },
  {
    question: "Do I need technical knowledge to use OmniPost.ai?",
    answer:
      "Not at all! OmniPost.ai is designed with a user-friendly interface that requires no technical knowledge. If you can copy and paste text, you can use our platform effectively.",
  },
  {
    question: "How accurate is the AI in maintaining my brand voice?",
    answer:
      "Our AI is trained to preserve your unique brand voice while optimizing for each platform. With 95% accuracy in voice preservation, your audience will recognize your content across all platforms.",
  },
  {
    question: "Which social media platforms are supported?",
    answer:
      "Currently, OmniPost.ai supports Twitter, LinkedIn, and Threads. We're actively working on adding support for Instagram, Facebook, and Pinterest in our next major update.",
  },
  {
    question: "Is there a limit to how much content I can transform?",
    answer:
      "Our pricing plans are based on monthly usage. The Free plan allows up to 5 transformations per month, while paid plans offer higher limits. Check our pricing section for more details.",
  },
]

const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI-Powered Optimization",
    description: "Advanced AI analyzes your content and optimizes it specifically for each platform's unique audience.",
  },
  {
    icon: <Repeat className="h-5 w-5" />,
    title: "Multi-Platform Support",
    description: "Transform your content for Twitter, LinkedIn, and Threads with platform-specific formatting.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Time-Saving Automation",
    description: "Reduce content repurposing time from hours to seconds with our intelligent automation system.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Smart Hashtag Generation",
    description: "Automatically generate relevant, trending hashtags for each platform to maximize your reach.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Performance Analytics",
    description: "Track how your transformed content performs across platforms with our integrated analytics.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Brand Voice Preservation",
    description: "Our AI maintains your unique brand voice while optimizing content for each platform.",
  },
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">OmniPost.ai</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-sm text-slate-300 hover:text-white transition-colors">
                Testimonials
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" className="text-sm text-slate-300 hover:text-white">
                Log In
              </Button>
              <Button className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              <nav className="flex flex-col space-y-3">
                <a href="#features" className="text-sm text-slate-300 hover:text-white px-4 py-2">
                  Features
                </a>
                <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white px-4 py-2">
                  How It Works
                </a>
                <a href="#pricing" className="text-sm text-slate-300 hover:text-white px-4 py-2">
                  Pricing
                </a>
                <a href="#testimonials" className="text-sm text-slate-300 hover:text-white px-4 py-2">
                  Testimonials
                </a>
                <div className="px-4 pt-3 border-t border-slate-800">
                  <Button variant="ghost" className="w-full mb-2 text-sm text-slate-300 hover:text-white">
                    Log In
                  </Button>
                  <Button className="w-full text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

        {/* Hero Section */}
      <section className="relative bg-slate-950 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <Badge className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
                <Zap className="h-3 w-3" />
                <span>AI-Powered Content Transformation</span>
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Transform Content Into{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Social Posts
            </span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                Use advanced AI to transform your long-form content into platform-optimized social media posts for
                Twitter, LinkedIn, and Threads in seconds.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5">
                    Try For Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-700 px-6 py-2.5">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-slate-400 shadow-md"
                    >
                      <Users className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white">10,000+ creators</div>
                  <div className="text-slate-400">trust OmniPost.ai</div>
                </div>
              </div>
        </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                {/* Browser Header */}
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-xs text-slate-400 font-medium">OmniPost.ai</div>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="p-4 space-y-3">
                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <Twitter className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-medium text-blue-400">Twitter</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      🚀 Just discovered something game-changing about AI-powered content creation! #AI #ContentCreation
                    </p>
            </div>

                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <Linkedin className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-medium text-blue-400">LinkedIn</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      In today's rapidly evolving digital landscape, the ability to efficiently repurpose long-form
                      content across multiple platforms...
                    </p>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-purple-400" />
                      <span className="text-xs font-medium text-purple-400">Threads</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Can we talk about how AI is revolutionizing content creation? 🤯 The possibilities are endless...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50M+", label: "Posts Generated" },
              { number: "3", label: "Platforms" },
              { number: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 border-purple-500/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" />
              <span>Features</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Everything You Need for{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Content Repurposing
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our AI-powered platform offers all the tools you need to transform your long-form content into engaging
              social media posts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/70 border-slate-700/60 backdrop-blur-sm hover:border-slate-600 transition-colors shadow-lg">
                <CardContent className="p-6">
                  <div className="inline-flex p-2 rounded-lg bg-blue-500/10 text-blue-400 mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="inline-flex items-center space-x-2 bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Clock className="h-3 w-3" />
              <span>How It Works</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Transform Your Content in{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Three Simple Steps
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our streamlined process makes it easy to repurpose your content across multiple platforms in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Paste Your Content",
                description: "Simply paste your blog post, article, or any long-form content into our editor.",
                icon: <FileText className="h-6 w-6" />,
              },
              {
                step: "02",
                title: "Generate Posts",
                description: "Click generate and watch as our AI transforms your content into platform-specific posts.",
                icon: <Sparkles className="h-6 w-6" />,
              },
              {
                step: "03",
                title: "Copy & Share",
                description: "Copy the generated posts with a single click and paste them into your social platforms.",
                icon: <Share2 className="h-6 w-6" />,
              },
            ].map((item, index) => (
              <Card key={index} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-400 mb-4">
                    {item.step}
                  </div>
                  <div className="inline-flex p-2 rounded-lg bg-blue-500/10 text-blue-400 mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
              <TrendingUp className="h-3 w-3" />
              <span>Pricing</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features with different usage limits.
            </p>
              </div>

          {/* Pricing Toggle - Revised Single Button Group */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center rounded-lg p-0.5 bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm shadow-sm">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 relative
                  ${
                    billingPeriod === "monthly"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-slate-300 hover:text-slate-100 hover:bg-slate-700/50"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 relative
                  ${
                    billingPeriod === "yearly"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-slate-300 hover:text-slate-100 hover:bg-slate-700/50"
                  }`}
              >
                Yearly
                {billingPeriod === 'monthly' && (
                  <Badge className="ml-2 bg-green-500/30 text-green-200 border border-green-500/40 px-1.5 py-0.5 text-xs font-semibold">
                    Save 20%
                  </Badge>
                )}
                 {billingPeriod === 'yearly' && (
                  <Badge className="ml-2 bg-green-400 text-slate-900 border border-green-500 px-1.5 py-0.5 text-xs font-semibold">
                    Save 20%
                  </Badge>
                )}
              </button>
            </div>
            </div>

          {/* Pricing Cards with Equal Heights */}
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => {
              const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice

                return (
                <div key={index} className="flex">
                  <Card
                    className={`w-full flex flex-col bg-slate-800/90 backdrop-blur-sm ${
                      plan.popular ? "border-blue-500/70" : "border-slate-700/70"
                    } hover:border-opacity-100 transition-all duration-300 shadow-lg ${
                      plan.popular ? "shadow-blue-500/10" : ""
                    }`}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Popular Badge */}
                      {plan.popular && (
                        <div className="absolute -top-3 inset-x-0 flex justify-center">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-4 py-1 rounded-full shadow-lg">
                            Most Popular
                          </div>
                        </div>
                      )}

                      {/* Header Section */}
                      <div className="text-center mb-6 pt-2">
                        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                        <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                        <div className="mb-4 h-[72px]">
                          <span className="text-3xl font-bold text-white">${price}</span>
                          <span className="text-slate-400 text-sm ml-1">
                            {billingPeriod === "yearly"
                              ? "/month billed yearly"
                              : plan.period === "forever"
                                ? plan.period
                                : "/month"}
                          </span>
                          {billingPeriod === "yearly" && plan.yearlySavings !== "0" && (
                            <div className="text-green-400 text-sm font-medium mt-1">
                              Save ${plan.yearlySavings}/year
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Features Section - Flex Grow */}
                      <div className="flex-grow mb-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                              <span className="text-slate-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button - Always at Bottom */}
                      <div className="mt-auto pt-2">
                        <Button
                          className={`w-full py-5 ${
                            plan.popular
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30"
                              : "bg-slate-700 hover:bg-slate-600 text-white"
                          } transition-all duration-300`}
                        >
                          {plan.cta}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )
              })}
            </div>

          {/* Enterprise CTA */}
          <Card className="mt-10 bg-slate-800/90 border-slate-700/70 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Enterprise Solutions</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
                Need a custom solution? We offer tailored packages with custom integrations and dedicated support.
              </p>
              <Button className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-8 py-5 shadow-md transition-all duration-300">
                Contact Enterprise Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="inline-flex items-center space-x-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Users className="h-3 w-3" />
              <span>Testimonials</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Loved by{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Content Creators
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              See what our users are saying about how OmniPost.ai has transformed their content strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-900/70 border-slate-800/60 backdrop-blur-sm hover:border-slate-700 transition-colors shadow-lg">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
                          }`}
                        />
                      ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-300 text-sm leading-relaxed mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-700"
                    />
                    <div>
                      <div className="font-medium text-white text-sm">{testimonial.name}</div>
                      <div className="text-xs text-slate-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
            </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 border-purple-500/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Globe className="h-3 w-3" />
              <span>FAQ</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Find answers to common questions about OmniPost.ai and how it can help with your content strategy.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-slate-800/70 border-slate-700/60 backdrop-blur-sm hover:border-slate-600 transition-colors shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Content Strategy?
            </span>
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Join thousands of content creators who are saving time and increasing engagement with OmniPost.ai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2.5">
                Try For Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-2.5"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="text-lg font-bold text-white">OmniPost.ai</div>
              </div>
              <p className="text-slate-400 text-sm mb-4 max-w-sm">
                Transform your long-form content into platform-optimized social media posts with the power of AI.
              </p>
              <div className="flex items-center space-x-3">
                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Threads">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-medium text-white mb-3">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-medium text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-medium text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-3 md:mb-0">© 2024 OmniPost.ai. All rights reserved.</div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
