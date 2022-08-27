import articlesData from '../../../data/articles.json';

export default (req, res) => {
    if (req.method === 'GET') {
        res.statusCode = 200;
        res.json(articlesData);
    } else if (req.method === 'POST') {
        const pageNo = req.body.pageNo;
        const searchQuery = req.body.searchQuery;
        if (searchQuery) {
            res.statusCode = 200;
            res.json({
                data: [
                    ...articlesData.data.filter(article => article.attributes.title.toLocaleLowerCase().includes(searchQuery))
                ]
            });
        } else {
            res.statusCode = 200;
            res.json({
                data: [
                    articlesData.data.slice(pageNo === 1 ? pageNo - 1 : pageNo - 1 * 4, pageNo === 1 ? pageNo * 4 : pageNo * 4 + 4)
                ]
            });
        }
    }
};
