import Link from 'next/link';
import React from 'react';
import { formatDate } from '../../utils';
import classnames from 'classnames';
import style from './card.module.css';
import Image from 'next/image';

const Card = ({ article }) => {

    return (
        <div>
            <Link href={`/article/${article.attributes.slug}`} className={classnames("text-xs text-gray-600 font-bold", style.linkText)}>
                {article.attributes.title}
            </Link>
            <div className="flex items-center my-3 sm:my-4">
                <div className="rounded-lg overflow-hidden flex items-center justify-center mr-2">
                    <Image
                        src='/Vipul.jpg'
                        height={40}
                        width={35}
                        alt="vipul img"
                        title="vipul img"
                    />
                </div>
                <span className="text-xs text-gray-600">
                    {article.attributes.author.data.attributes.username}{' '} on
                    &nbsp;
                    <span className="text-gray-400 text-xs">
                        {formatDate(article.attributes.createdAt)}
                    </span>
                </span>
            </div>
            <div className="text-gray-500 text-xs">
                {article.attributes.body.slice(0, 250)}{' '}
                {article.attributes.body.length > 250 ? '...' : ''}
            </div>
        </div>
    );
};

export default Card;