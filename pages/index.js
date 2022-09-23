import Head from 'next/head';
import ArticleList from '../components/ArticleList';
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
        <link rel="shortcut icon" href="/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon.png"
        />
        <link rel="canonical" href="https://blog-gules-one.vercel.app/" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0"
        />
        <meta name="description" content="This is a blog website created using next js, tailwind css & strapi content management system." />
        <meta name="author" content="Vipul Singh" />
        <meta name="keywords" content="blog page, blog website, vipul blog, blog using nextjs" />
        <meta name="theme-color" content="#fff" />
        <meta property="og:title" content="My Blog Page" />
        <meta property="og:description" content="This is a blog website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog-vipul-26.vercel.app/" />
        <meta property="og:image" content="/V-BlogNewest.png" />
        <meta name="twitter:image" content="/V-BlogNewest.png" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Tabs
        categories={categories.items}
        handleOnSearch={debounce(handleSearch, 500)}
      />
      {articles.items.length === 0 ?
        <h2 className='h2-style'>
          No Results found
        </h2>
        :
        <>
          <ArticleList articles={articles.items} isArtByCategory={query.search ? true : false} />
          {!(query.search) && <Pagination page={page} pageCount={pageCount} />}
        </>
      }
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {

  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  const fetchArticles = async () => api.post(`/api/article`,
    {
      pageNo: query.page ? +query.page : 1,
      searchQuery: query.search ? query.search : '',
    });

  const fetchCategories = async () => api.get('/api/category');

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