import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    };

    render() {
        return (
            <Html lang="en">
                <Head>
                    <title>
                        My Blog
                    </title>
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/favicon.ico"
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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    };
};

export default MyDocument;