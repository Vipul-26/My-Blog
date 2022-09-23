import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import Tabs from '../../components/Tabs';
import ArticleList from '../../components/ArticleList';
import { debounce } from '../../utils';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';

const Category = ({ categories, articles, query }) => {

    const page = query.page ? +query.page : 1;
    // const pageCount = (articles.length / 4) % 1 === 0 ? articles.length / 4 : Math.floor(articles.length / 4) + 1;
    const pageCount = 1;

    const router = useRouter();
    const { category: categorySlug } = router.query;

    const handleSearch = (query) => {
        router.push(`/category/${categorySlug}/?search=${query}`);
    };

    return (
        <>
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
                    <ArticleList articles={articles.items} isArtByCategory={true} />
                    {!(query.search) && <Pagination page={page} pageCount={pageCount} redirectUrl={`/category/${categorySlug}`} />}
                </>
            }
        </>
    );
};

export const getServerSideProps = async ({ query }) => {

    const api = axios.create({
        baseURL: process.env.API_BASE_URL,
    });

    const fetchArticlesByCategory = async (query) => api.post(`/api/category/${query.category}`,
        { searchQuery: query.search ? query.search : '', });

    const fetchCategories = async () => api.get('/api/category');

    const { data: articles } = await fetchArticlesByCategory(query);

    const { data: categories } = await fetchCategories();

    return {
        props: {
            categories: {
                items: categories.data,
            },
            articles: {
                items: articles.data,
            },
            query: query,
        },
    };
};

export default Category;