import React from 'react';
import Card from '../Card/index';

const ArticleList = ({ articles, isArtByCategory }) => {

    const articleData = isArtByCategory ? articles : articles[0];
    return (
        <div className="grid lg:grid-cols-2 grid-gap gap-6 sm:gap-10 mt-4 sm:mt-6">
            {articleData.map((article) => {
                return (
                    <div key={article.id}>
                        <Card article={article} />
                    </div>
                );
            })}
        </div>
    );
};

export default ArticleList;