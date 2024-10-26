import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import TableView from "../../components/TableView";
import { getAllCategorySlugs, getCategoryData } from "../../utils/dataUtils";

export default function Category({ categoryData, categoryId }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const titles = {
    "market-data": "Market Data & Analytics",
    "trading-tools": "Trading Tools & Automation",
    portfolio: "Portfolio Management",
    research: "Research & Education",
    infrastructure: "Infrastructure & Development",
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {titles[categoryId] || "Category"}
        </h1>
        <p className="text-gray-600">
          Explore the available tools and features in this category
        </p>
      </div>

      {categoryData && categoryData.length > 0 ? (
        <TableView data={categoryData} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">
            No data available for this category yet.
          </p>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCategorySlugs();
  return {
    paths,
    fallback: true, // Set to true to enable fallback
  };
}

export async function getStaticProps({ params }) {
  try {
    const categoryData = getCategoryData(params.id);
    return {
      props: {
        categoryData,
        categoryId: params.id,
      },
      revalidate: 60, // Regenerate page every 60 seconds if needed
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true, // Returns 404 page
    };
  }
}
