import Head from 'next/head';
import ArticleList from '../components/ArticleList';
import qs from 'qs';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';
import Tabs from '../components/Tabs';
import { debounce } from '../utils';
import axios from 'axios';

const Home = ({ articles, categories }) => {

  const router = useRouter();

  const handleSearch = (query) => {
    router.push(`/?search=${query}`);
  };

  const { page, pageCount } = articles.pagination;

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
      <ArticleList articles={articles.items} />
      <Pagination page={page} pageCount={pageCount} />
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {

  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
    },
  });

  const fetchArticles = async (queryString) => api.get(`/api/articles?${queryString}`);

  const fetchCategories = async () => api.get('/api/categories');

  const options = {
    populate: ['author.avatar'],
    sort: ['id:desc'],
    pagination: {
      page: query.page ? +query.page : 1,
      pageSize: 4,
    }
  };

  if (query.search) {
    options.filters = {
      title: {
        $containsi: query.search,
      },
    };
  };

  const queryString = qs.stringify(options);

  const { data: articles } = await fetchArticles(queryString);

  const { data: categories } = await fetchCategories();

  return {
    props: {
      categories: {
        items: categories.data,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination,
      }
    }
  };
};

export default Home;