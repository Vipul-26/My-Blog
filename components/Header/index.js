import React from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import Image from 'next/image';

class Header extends React.PureComponent {

    render() {
        return (
            <header className={styles.header}>
                <nav className="flex item-center justify-center sm:mb-2 lg:mb-0">
                    <Link href="/">
                        <div className="flex items-center cursor-pointer">
                            <Image src="/V-BlogNew.png" className='lg:h-16 h-14' alt="logo" title="logo" width={165} height={65} />
                        </div>
                    </Link>
                </nav>
            </header>
        );
    }
}

export default Header;