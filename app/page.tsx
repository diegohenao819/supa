import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function LandingPage() {

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
  function renderFeatures() {
    const features = [
      {
        icon: BookOpen,
        title: "Interactive Lessons",
        description:
          "Engage with dynamic content designed to enhance your English skills effectively.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: Users,
        title: "Live Sessions",
        description:
          "Participate in live classes with expert instructors and fellow learners.",
        color: "bg-green-100 text-green-600",
      },
      {
        icon: MessageCircle,
        title: "Community Support",
        description:
          "Join our vibrant community to practice and improve your English skills.",
        color: "bg-yellow-100 text-yellow-600",
      },
    ];

    return features.map(function (feature, index) {
      const Icon = feature.icon;
      return (
        <Card
          key={index}
          className={`${feature.color} border-none shadow-lg bg-white`}
        >
          <CardHeader>
            <Icon className="w-8 h-8 mb-2" />
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{feature.description}</p>
          </CardContent>
        </Card>
      );
    });
  }

  function renderCourses() {
    const levels = [
      { name: "Beginner", color: "bg-green-50 border-green-200" },
      { name: "Intermediate", color: "bg-blue-50 border-blue-200" },
      { name: "Advanced", color: "bg-purple-50 border-purple-200" },
    ];
    const skills = ["Grammar", "Vocabulary", "Speaking", "Listening"];

    return levels.map(function (level) {
      return (
        <Card
          key={level.name}
          className={`${level.color} border-2 shadow-md bg-white`}
        >
          <CardHeader>
            <CardTitle className="text-gray-800">
              {level.name} English
            </CardTitle>
            <CardDescription>
              Comprehensive {level.name.toLowerCase()} level English course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {skills.map(function (skill) {
                return (
                  <li key={skill} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {skill}
                  </li>
                );
              })}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Enroll Now
            </Button>
          </CardFooter>
        </Card>
      );
    });
  }

  function renderTestimonials() {
    const testimonials = [
      {
        name: "Sarah L.",
        quote:
          "EnglishMaster LMS has transformed my English skills. The interactive lessons and supportive community are fantastic!",
        color: "bg-blue-50 border-blue-200",
      },
      {
        name: "Michael R.",
        quote:
          "I love the flexibility of learning at my own pace. The live sessions with instructors are incredibly helpful.",
        color: "bg-green-50 border-green-200",
      },
      {
        name: "Emma T.",
        quote:
          "The course content is comprehensive and well-structured. I've seen significant improvement in my English proficiency.",
        color: "bg-yellow-50 border-yellow-200",
      },
    ];

    return testimonials.map(function (testimonial, index) {
      return (
        <Card
          key={index}
          className={`${testimonial.color} border-2 shadow-md bg-white`}
        >
          <CardHeader>
            <CardTitle className="text-gray-800">{testimonial.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic">"{testimonial.quote}"</p>
          </CardContent>
        </Card>
      );
    });
  }

  function renderPricingPlans() {
    const plans = [
      {
        name: "Basic",
        price: "$9.99",
        color: "bg-blue-50 border-blue-200",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        features: [
          "Access to all beginner courses",
          "Community forum access",
          "Monthly live Q&A session",
        ],
      },
      {
        name: "Pro",
        price: "$19.99",
        color: "bg-green-50 border-green-200",
        buttonColor: "bg-green-600 hover:bg-green-700",
        features: [
          "Access to all beginner and intermediate courses",
          "Priority community support",
          "Weekly live Q&A sessions",
          "1-on-1 monthly tutoring session",
        ],
      },
      {
        name: "Premium",
        price: "$29.99",
        color: "bg-purple-50 border-purple-200",
        buttonColor: "bg-purple-600 hover:bg-purple-700",
        features: [
          "Access to all courses (including advanced)",
          "24/7 priority support",
          "Unlimited live Q&A sessions",
          "Weekly 1-on-1 tutoring sessions",
          "Certification upon course completion",
        ],
      },
    ];

    return plans.map(function (plan) {
      return (
        <Card
          key={plan.name}
          className={`flex flex-col ${plan.color} border-2 shadow-md bg-white`}
        >
          <CardHeader>
            <CardTitle className="text-gray-800">{plan.name}</CardTitle>
            <CardDescription className="text-2xl font-bold text-gray-900">
              {plan.price}/month
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {plan.features.map(function (feature, index) {
                return (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                );
              })}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className={`w-full text-white ${plan.buttonColor}`}>
              Choose Plan
            </Button>
          </CardFooter>
        </Card>
      );
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">EnglishMaster LMS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#courses"
          >
            Courses
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master English with EnglishMaster LMS
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock your potential with our innovative Learning Management
                  System. Learn English at your own pace, anytime, anywhere.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/sign-up">Sign Up Here</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderFeatures()}
            </div>
          </div>
        </section>
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderCourses()}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderTestimonials()}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Pricing Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderPricingPlans()}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 EnglishMaster LMS. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
