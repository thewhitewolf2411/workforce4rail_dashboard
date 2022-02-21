import React from 'react';

const Pagination = ({postPerPage, totalPosts, page, setPage}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

    console.log(pageNumbers, totalPosts, postPerPage);

    return(
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number =>(
                    <li key={number} className={page === number ? 'page-item page-item__active' : 'page-item'}>
                        <div className='page-link' onClick={() => setPage(number)}>
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;