import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import Tabs from '../../components/Tabs';
import qs from 'qs';
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
            <ArticleList articles={articles.items} isArtByCategory={true} />
            <Pagination
                page={page}
                pageCount={pageCount}
                redirectUrl={`/category/${categorySlug}`}
            />
        </>
    );
};

export const getServerSideProps = async ({ query }) => {

    const api = axios.create({
        baseURL: process.env.API_BASE_URL,
    });

    const fetchArticlesByCategory = async (query) => api.get(`/api/category/${query}`);

    const fetchCategories = async () => api.get('/api/category');

    const { data: articles } = await fetchArticlesByCategory(query.category);

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