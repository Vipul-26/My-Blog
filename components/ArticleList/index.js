import React from 'react';
import Card from '../Card/index';

const ArticleList = ({ articles, isArtByCategory }) => {

    const articleData = isArtByCategory ? articles : articles[0];
    return (
        <div className="grid lg:grid-cols-2 grid-gap gap-4 sm:gap-7 lg:gap-6 xl:gap-8 mt-4 md:mt-4 lg:mt-6">
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