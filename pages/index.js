import Head from 'next/head';
import ArticleList from '../components/ArticleList';
import qs from 'qs';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';
import Tabs from '../components/Tabs';
import { debounce } from '../utils';
import axios from 'axios';

const Home = ({ articles, categories, query }) => {

  const router = useRouter();

  const handleSearch = (query) => {
    router.push(`/?search=${query}`);
  };

  const page = query.page ? +query.page : 1;
  const pageCount = (6 / 4) % 1 === 0 ? 6 / 4 : Math.floor(6 / 4) + 1;

  return (
    <div>
      <Head>
        <title>
          My Blog
        </title>
        <meta
          name="description"
          content="This website is created using next js, tailwind css & strapi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs
        categories={categories.items}
        handleOnSearch={debounce(handleSearch, 500)}
      />
      <ArticleList articles={articles.items} isArtByCategory={false} />
      <Pagination page={page} pageCount={pageCount} />
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {

  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  const fetchArticles = async () => api.post(`/api/article`, { pageNo: query.page ? +query.page : 1 });

  const fetchCategories = async () => api.post('/api/category');

  const { data: articles } = await fetchArticles('article');

  const { data: categories } = await fetchCategories('category');

  return {
    props: {
      categories: {
        items: categories.data,
      },
      articles: {
        items: articles.data,
      },
      query: query
    }
  };
};

export default Home;