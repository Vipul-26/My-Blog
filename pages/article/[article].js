import React from 'react';
import { formatDate } from '../../utils';
import Head from 'next/head';
import axios from 'axios';
import classnames from 'classnames';

const Article = ({ article }) => {

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
            <div className="my-3 md:my-4 lg:my-6 xl:my-8 grid lg:grid-cols-3 gap-4 lg:gap-10 xl:gap-12 single-article">
                <div className="col-span-2">
                    <h1 className="text-xl font-bold py-1">
                        {article.attributes.title}
                    </h1>
                    <div className="flex items-center my-2">
                        <div className="rounded-lg overflow-hidden flex items-center justify-center mr-2">
                            <img
                                src='https://res.cloudinary.com/dtv9j4t89/image/upload/v1661516788/Vipul_Kumar_Singh_zzvido.jpg'
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
                            src={`https://venturebeat.com/wp-content/uploads/2018/01/javascript-e1656424565930.jpg?fit=750%2C376&strip=all`}
                            alt={article.attributes.title}
                        />
                        <div>
                            <p className="bodyTxt" dangerouslySetInnerHTML={{ __html: article.attributes.body }} />
                        </div>
                    </div>
                </div>
                <div className="sticky top-0 subscribeDiv">
                    <h2 className="font-bold text-gray-600 text-lg">
                        Signup to our newsletter
                    </h2>
                    <p className="mt-4 text-gray-500">
                        Get the latest article on all topics delivered to your inbox
                    </p>
                    <input
                        className="border w-full p-2 pl-3 my-6 outline-primary"
                        type="email"
                        placeholder="Your work email"
                    />
                    <button className="border-2 border-primary rounded py-1 px-6 text-primary font-bold">
                        Subscribe
                    </button>
                    <hr className="mt-4 mb-0 md:my-6 border-gray-200" />
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <span className="text-gray-500 mr-2">
                            Share on
                        </span>
                        <a className="text-gray-500 hover:text-blue-700">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500 hover:text-blue-500">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500 hover:text-pink-400">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24">
                                <rect
                                    width="20"
                                    height="20"
                                    x="2"
                                    y="2"
                                    rx="5"
                                    ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500 hover:text-purple-700">
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="0"
                                className="w-5 h-5"
                                viewBox="0 0 24 24">
                                <path
                                    stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle
                                    cx="4"
                                    cy="4"
                                    r="2"
                                    stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                    <hr className="mt-3 mb-0 md:my-6 border-gray-200" />
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ query }) => {

    const api = axios.create({
        baseURL: process.env.API_BASE_URL,
    });

    const fetchArticleBySlug = async (query) => api.get(`/api/article/${query.article}`);

    const { data: articles } = await fetchArticleBySlug(query);

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