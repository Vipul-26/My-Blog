import articlesData from '../../../data/articles.json';

export default (req, res) => {
    const query = req.query.articleSlug;
    res.statusCode = 200;
    res.json({
        data: [
            ...articlesData.data.filter(article => article.attributes.slug === query)
        ]
    });
};