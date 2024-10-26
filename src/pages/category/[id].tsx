import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import TableView from '../../components/TableView';
import { getAllCategorySlugs, getCategoryData } from '../../utils/dataUtils';

interface CategoryProps {
  categoryData: any[];
  categoryId: string;
}

export default function Category({ categoryData, categoryId }: CategoryProps) {
  const titles = {
    'market-data': 'Market Data & Analytics',
    'trading-tools': 'Trading Tools & Automation',
    'portfolio': 'Portfolio Management',
    'research': 'Research & Education',
    'infrastructure': 'Infrastructure & Development'
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {titles[categoryId as keyof typeof titles] || 'Category'}
        </h1>
        <p className="text-gray-600">
          Explore the available tools and features in this category
        </p>
      </div>

      {categoryData && categoryData.length > 0 ? (
        <TableView data={categoryData} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No data available for this category yet.</p>
        </div>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCategorySlugs();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.id as string;
  const categoryData = getCategoryData(categoryId);

  return {
    props: {
      categoryData,
      categoryId
    }
  };
};
