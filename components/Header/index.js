import React from 'react';
import Link from 'next/link';
import styles from './header.module.css';

class Header extends React.PureComponent {

    render() {
        return (
            <header className={styles.header}>
                <nav className="flex item-center justify-center sm:mb-2 lg:mb-0">
                    <Link href="/">
                        <div className="flex items-center cursor-pointer">
                            <img src="/V-BlogNew.png" className='lg:h-16 h-14' />
                        </div>
                    </Link>
                </nav>
            </header>
        );
    }
}

export default Header;