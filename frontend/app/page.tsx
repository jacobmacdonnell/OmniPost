import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  ChevronDown,
  Star,
  FileText,
  Share2,
} from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Marketing Manager",
    company: "GrowthLabs",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "OmniPost.ai has completely transformed our content strategy. We're now able to repurpose our blog content across all social platforms in minutes instead of hours. The engagement rates have increased by 45% since we started using it.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Digital Marketing Director",
    company: "TechFusion",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The platform-specific optimization is what sets OmniPost apart. Our LinkedIn posts now feel native to the platform while maintaining our brand voice. It's like having a social media expert for each platform.",
    rating: 5,
  },
  {
    name: "Jessica Williams",
    role: "Content Creator",
    company: "Independent",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As a solo content creator, OmniPost.ai has been a game-changer. I can focus on creating in-depth content while the AI handles distribution across platforms. It's saved me at least 10 hours every week.",
    rating: 4,
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
    question: "Can I edit the generated posts?",
    answer:
      "While our AI creates highly optimized posts, you have full control to edit, refine, or adjust any generated content before sharing it on your social platforms.",
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
    icon: <Sparkles className="h-6 w-6 text-blue-400" />,
    title: "AI-Powered Optimization",
    description:
      "Our advanced AI analyzes your content and optimizes it specifically for each platform's unique audience and algorithm.",
  },
  {
    icon: <Repeat className="h-6 w-6 text-green-400" />,
    title: "Multi-Platform Support",
    description:
      "Transform your content for Twitter, LinkedIn, and Threads with platform-specific formatting and optimization.",
  },
  {
    icon: <Clock className="h-6 w-6 text-purple-400" />,
    title: "Time-Saving Automation",
    description: "Reduce content repurposing time from hours to seconds with our intelligent automation system.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
    title: "Smart Hashtag Generation",
    description:
      "Automatically generate relevant, trending hashtags for each platform to maximize your content's reach and engagement.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-red-400" />,
    title: "Engagement Analytics",
    description:
      "Track how your transformed content performs across platforms with our integrated analytics dashboard.",
  },
  {
    icon: <Users className="h-6 w-6 text-cyan-400" />,
    title: "Brand Voice Preservation",
    description:
      "Our AI maintains your unique brand voice while optimizing content for each platform's specific requirements.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-blue-500/20">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  OmniPost.ai
                </h1>
                <p className="text-xs text-slate-500 font-medium">AI-Powered Content Transformation</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-6">
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
                <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </nav>

              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Log In
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white">
                  Sign Up Free
                </Button>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden text-slate-300">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

        {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <Badge
                className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 py-1.5 px-4 text-sm"
                variant="outline"
              >
                AI-Powered Content Transformation
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Transform One Piece of Content Into
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Multiple Social Posts
            </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                OmniPost.ai uses advanced AI to transform your long-form content into platform-optimized social media
                posts for Twitter, LinkedIn, and Threads in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 w-full sm:w-auto"
                  >
                    Try For Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg w-full sm:w-auto"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden"
                    >
                      <img src={`/placeholder.svg?height=32&width=32&text=${i}`} alt="User avatar" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-slate-400">Trusted by</span>{" "}
                  <span className="text-white font-semibold">10,000+</span>{" "}
                  <span className="text-slate-400">content creators</span>
                </div>
              </div>
        </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-slate-700/50 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-sm text-slate-400">OmniPost.ai</div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-3">
                        <Twitter className="h-5 w-5 text-sky-400" />
                        <span className="text-sky-400 font-medium">Twitter</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        🚀 Just discovered something game-changing about AI-powered content creation! The future of
                        social media is here and it's transforming how we share ideas across platforms. Thread below 👇
                        #AI #ContentCreation
                      </p>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-3">
                        <Linkedin className="h-5 w-5 text-blue-400" />
                        <span className="text-blue-400 font-medium">LinkedIn</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        In today's rapidly evolving digital landscape, the ability to efficiently repurpose long-form
                        content across multiple platforms has become a critical competitive advantage...
                      </p>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-3">
                        <MessageCircle className="h-5 w-5 text-purple-400" />
                        <span className="text-purple-400 font-medium">Threads</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Can we talk about how AI is revolutionizing content creation? 🤯 The possibilities are endless
                        when you can transform one piece of long-form content into multiple engaging posts...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50M+</div>
              <div className="text-sm text-slate-400">Posts Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-sm text-slate-400">Platforms Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-slate-400">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20 py-1.5 px-4 text-sm"
              variant="outline"
            >
              Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Content Repurposing
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our AI-powered platform offers all the tools you need to transform your long-form content into engaging
              social media posts tailored for each platform.
            </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 hover:border-slate-700/60 transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="p-3 bg-slate-800/50 rounded-xl w-fit mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20 py-1.5 px-4 text-sm"
              variant="outline"
            >
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Transform Your Content in
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Three Simple Steps
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our streamlined process makes it easy to repurpose your content across multiple platforms in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 -translate-y-1/2"></div>

            {[
              {
                step: "01",
                title: "Paste Your Content",
                description:
                  "Simply paste your blog post, article, or any long-form content into our editor. Our AI will analyze it.",
                icon: <FileText className="h-8 w-8 text-blue-400" />,
              },
              {
                step: "02",
                title: "Generate Posts",
                description:
                  "Click the generate button and watch as our AI transforms your content into platform-specific posts.",
                icon: <Sparkles className="h-8 w-8 text-purple-400" />,
              },
              {
                step: "03",
                title: "Copy & Share",
                description:
                  "Copy the generated posts with a single click and paste them directly into your social media platforms.",
                icon: <Share2 className="h-8 w-8 text-green-400" />,
              },
            ].map((item, index) => (
              <div key={index} className="relative z-10">
                <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800/60 rounded-xl p-8 h-full">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-6 text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
              </div>

          <div className="text-center mt-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg font-semibold"
              >
                Try It Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
            </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-green-500/10 text-green-400 border-green-500/20 py-1.5 px-4 text-sm"
              variant="outline"
            >
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Pricing
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features with different usage limits.
            </p>
            </div>

          <Tabs defaultValue="monthly" className="w-full max-w-3xl mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-1">
              <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-500 rounded-md">
                Monthly Billing
              </TabsTrigger>
              <TabsTrigger value="yearly" className="data-[state=active]:bg-blue-500 rounded-md">
                Yearly Billing
                <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    name: "Free",
                    description: "Perfect for trying out OmniPost.ai",
                    price: "$0",
                    period: "forever",
                    features: [
                      "5 content transformations per month",
                      "3 platforms supported",
                      "Basic analytics",
                      "Standard support",
                    ],
                    cta: "Get Started",
                    popular: false,
                  },
                  {
                    name: "Pro",
                    description: "Ideal for content creators and small businesses",
                    price: "$29",
                    period: "per month",
                    features: [
                      "50 content transformations per month",
                      "3 platforms supported",
                      "Advanced analytics",
                      "Priority support",
                      "Custom hashtag sets",
                      "Content scheduling",
                    ],
                    cta: "Start 7-Day Free Trial",
                    popular: true,
                  },
                  {
                    name: "Business",
                    description: "For teams and agencies with higher volume needs",
                    price: "$99",
                    period: "per month",
                    features: [
                      "Unlimited content transformations",
                      "All current and future platforms",
                      "Team collaboration features",
                      "White-label options",
                      "API access",
                      "Dedicated account manager",
                    ],
                    cta: "Contact Sales",
                    popular: false,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`bg-slate-900/50 backdrop-blur-sm border ${
                      plan.popular
                        ? "border-blue-500/50 ring-2 ring-blue-500/20"
                        : "border-slate-800/60 hover:border-slate-700/60"
                    } transition-all duration-300 hover:shadow-xl relative`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <Badge className="bg-blue-500 text-white border-none py-1 px-3">Most Popular</Badge>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-slate-400 mb-6">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400 ml-2">{plan.period}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-300">
                            <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full py-6 ${
                          plan.popular
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-white"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="yearly">
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    name: "Free",
                    description: "Perfect for trying out OmniPost.ai",
                    price: "$0",
                    period: "forever",
                    features: [
                      "5 content transformations per month",
                      "3 platforms supported",
                      "Basic analytics",
                      "Standard support",
                    ],
                    cta: "Get Started",
                    popular: false,
                  },
                  {
                    name: "Pro",
                    description: "Ideal for content creators and small businesses",
                    price: "$23",
                    period: "per month, billed annually",
                    features: [
                      "50 content transformations per month",
                      "3 platforms supported",
                      "Advanced analytics",
                      "Priority support",
                      "Custom hashtag sets",
                      "Content scheduling",
                    ],
                    cta: "Start 7-Day Free Trial",
                    popular: true,
                  },
                  {
                    name: "Business",
                    description: "For teams and agencies with higher volume needs",
                    price: "$79",
                    period: "per month, billed annually",
                    features: [
                      "Unlimited content transformations",
                      "All current and future platforms",
                      "Team collaboration features",
                      "White-label options",
                      "API access",
                      "Dedicated account manager",
                    ],
                    cta: "Contact Sales",
                    popular: false,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`bg-slate-900/50 backdrop-blur-sm border ${
                      plan.popular
                        ? "border-blue-500/50 ring-2 ring-blue-500/20"
                        : "border-slate-800/60 hover:border-slate-700/60"
                    } transition-all duration-300 hover:shadow-xl relative`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <Badge className="bg-blue-500 text-white border-none py-1 px-3">Most Popular</Badge>
                          </div>
                    )}
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-slate-400 mb-6">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-slate-400 ml-2">{plan.period}</span>
                        </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-300">
                            <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                        <Button
                        className={`w-full py-6 ${
                          plan.popular
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-white"
                        }`}
                      >
                        {plan.cta}
                        </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Enterprise Solutions</h3>
            <p className="text-slate-400 mb-6">
              Need a custom solution for your enterprise? We offer tailored packages with custom integrations, dedicated
              support, and volume pricing.
            </p>
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">Contact Enterprise Sales</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 py-1.5 px-4 text-sm"
              variant="outline"
            >
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Loved by
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                {" "}
                Content Creators
                                </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              See what our users are saying about how OmniPost.ai has transformed their content strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 hover:border-slate-700/60 transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
                          }`}
                        />
                              ))}
                            </div>
                  <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">
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
      <section id="faq" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20 py-1.5 px-4 text-sm"
              variant="outline"
            >
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Questions
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Find answers to common questions about OmniPost.ai and how it can help with your content strategy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 rounded-xl p-6 hover:border-slate-700/60 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
            </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-gradient-to-br from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Content Strategy?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of content creators who are saving time and increasing engagement with OmniPost.ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 w-full sm:w-auto"
                >
                  Try For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-500 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg w-full sm:w-auto"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-xl py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  OmniPost.ai
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Transform your long-form content into platform-optimized social media posts with the power of AI.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-slate-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">© 2024 OmniPost.ai. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
