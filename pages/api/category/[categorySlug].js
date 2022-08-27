import articlesData from '../../../data/articles.json';

export default (req, res) => {
    const query = req.query.categorySlug;
    const searchQuery = req.body.searchQuery;
    if (searchQuery) {
        const filteredData = [...articlesData.data.filter(article => article.attributes.category.data.attributes.slug === query)];
        res.statusCode = 200;
        res.json({
            data: [
                ...filteredData.filter(article => article.attributes.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
            ]
        });
    } else {
        res.statusCode = 200;
        res.json({
            data: [
                ...articlesData.data.filter(article => article.attributes.category.data.attributes.slug === query)
            ]
        });
    }
};


