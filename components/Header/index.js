import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <nav className="flex item-center justify-center sm:mb-2 lg:mb-0">
            <Link href="/">
                <div className="flex items-center cursor-pointer">
                    <img src="/V-Blog.png" className='lg:h-16 h-14' />
                </div>
            </Link>
        </nav>
    );
};

export default Header;