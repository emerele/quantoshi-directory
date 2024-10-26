import Layout from "../components/Layout";
import CategoryCard from "../components/CategoryCard";

// Import icons for each category
import {
  ChartBarIcon,
  CogIcon,
  ChartPieIcon,
  AcademicCapIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const categories = [
    {
      title: "Market Data & Analytics",
      description:
        "Gain a deep understanding of market dynamics with real-time data and advanced analytics.",
      slug: "market-data",
      icon: <ChartBarIcon className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Trading Tools & Automation",
      description:
        "Streamline trade execution across exchanges and markets with advanced tools.",
      slug: "trading-tools",
      icon: <CogIcon className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Portfolio Management",
      description:
        "Track and manage your crypto portfolio with comprehensive tools and insights.",
      slug: "portfolio",
      icon: <ChartPieIcon className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Research & Education",
      description:
        "Access educational resources and research tools for informed trading decisions.",
      slug: "research",
      icon: <AcademicCapIcon className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Infrastructure & Development",
      description:
        "Build and maintain robust crypto trading infrastructure with developer tools.",
      slug: "infrastructure",
      icon: <CubeIcon className="w-6 h-6 text-orange-600" />,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your ever-evolving edge in crypto
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our curated directory and equip yourself with state-of-the-art
          crypto and quantitative trading tools and services.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} {...category} />
        ))}
      </section>
    </Layout>
  );
}
