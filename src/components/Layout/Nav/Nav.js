import React from 'react'
import "./Nav.scss";

const Nav = ({listPage, setListPage}) => {

    const checkListPage = (title) => {
        if(title === listPage) {
            return 'list-page'
        }
    
        return ''
    }

    return (
        <div className='nav'>
            <div className={checkListPage('watchlist')} onClick={e => setListPage('watchlist')}>
                Watchlist
            </div>
            <div className={checkListPage('addcrypto')} onClick={e => setListPage('addcrypto')}>
                Add Crypto
            </div>
        </div>
    )
}

export default Nav