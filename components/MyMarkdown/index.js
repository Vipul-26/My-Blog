import React from 'react';
import ReactMarkdown from 'react-markdown';

const MyMarkdown = ({ article }) => {

    const articleMdx = "**JavaScript** is the world's most popular programming language used for web development. It is used to make websites interactive. It is easy to learn. To learn it, you must know the basics of **HTML** and **CSS**.\n\n> ### Below are few useful websites to learn Javascript:-\n >    1.[https://www.w3schools.com/js/](link)                                                                                               \n >2.[https://www.programiz.com/javascript](link)                                                                             \n >3.[https://www.javatpoint.com/javascript-tutorial](link)                                                           \n >4.[https://javascript.info/](link)                                                                                \n >5.[https://developer.mozilla.org/en-US/docs/Web/JavaScript](link)                                                \n\n> ### Below are few useful youtube videos to learn Javascript:-\n > 1.[https://www.youtube.com/playlist?list=PLwGdqUZWnOp1hqyT6h7pY0RlXIIGlE5U0](link)\n > 2.[https://www.youtube.com/playlist?list=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD](link)\n > 3.[https://www.youtube.com/playlist?list=PLu0W_9lII9ajyk081To1Cbt2eI5913SsL](link)\n > 4.[https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP](link)\n > 5.[https://www.youtube.com/watch?v=PkZNo7MFNFg](link)\n\n```\nSample Javascript Code:- \n\nfunction javascript() {\n    console.log('Hello from javascript');\n}\n\njavascript() \n\n// It prints Hello from javascript in console\n```\n_**Interview Questions coming soon**_";

    return (
        <ReactMarkdown className="bodyTxt">
            {articleMdx}
        </ReactMarkdown>
    );
};

export default MyMarkdown;