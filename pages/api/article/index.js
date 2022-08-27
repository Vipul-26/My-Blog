import articlesData from '../../../data/articles.json';

export default (req, res) => {
    if (req.method === 'GET') {
        res.statusCode = 200;
        res.json(articlesData);
    } else if (req.method === 'POST') {
        const pageNo = req.body.pageNo;
        res.statusCode = 200;
        res.json({
            data: [
                articlesData.data.slice(pageNo === 1 ? pageNo - 1 : pageNo - 1 * 4, pageNo === 1 ? pageNo * 4 : pageNo * 4 + 4)
            ]
        })
    }
};
