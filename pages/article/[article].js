import React from 'react';
import qs from 'qs';
import { formatDate } from '../../utils';
import Head from 'next/head';
import axios from 'axios';
import classnames from 'classnames';

const Article = ({ article }) => {
    console.log(article)
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
            <div className="col-span-2">
                <h1 className="text-xl font-bold py-1">
                    {article.attributes.title}
                </h1>
                <div className="flex items-center my-2">
                    <div className="rounded-lg overflow-hidden flex items-center justify-center mr-2">
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
                            height={35}
                            width={35}
                        />
                    </div>
                    <span className="text-xs font-bold text-gray-600">
                        {
                            article.attributes.author.data.attributes.username
                        }{' '} on &nbsp;
                        <span className="text-gray-400">
                            {formatDate(article.attributes.createdAt)}
                        </span>
                    </span>
                </div>
                <div className="text-lg text-gray-600 leading-8">
                    <img
                        className={classnames("w-full my-6 mb-4 imgDiv")}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.image.data[0].attributes.url}`}
                        alt={article.attributes.title}
                    />
                    <div>
                        <p className="text-lg">
                            {article.attributes.body}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async ({ query }) => {

    const api = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
        },
    });

    const queryString = qs.stringify({
        populate: ['image', 'author.avatar'],
        filters: {
            slug: {
                $eq: query.article,
            },
        },
    });

    const fetchArticleBySlug = async (queryString) => api.get(`/api/articles?${queryString}`);

    const { data: articles } = await fetchArticleBySlug(queryString);

    if (articles.data.length === 0) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            article: articles.data[0],
        },
    };
};

export default Article;