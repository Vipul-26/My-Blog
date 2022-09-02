import React from 'react';
import ReactMarkdown from 'react-markdown';

const MyMarkdown = ({ article }) => {

    return (
        <ReactMarkdown className="bodyTxt">
            {article}
        </ReactMarkdown>
    );
};

export default MyMarkdown;