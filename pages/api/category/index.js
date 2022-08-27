import categoriesData from '../../../data/categories.json';

export default (req, res) => {
    res.statusCode = 200;
    res.json(categoriesData);
};
