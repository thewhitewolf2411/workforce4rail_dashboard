import React from 'react';

const Pagination = ({ page, setPage, numberOfPages}) => {
    const pageNumbers = [];

    for(let i = 1; i <= numberOfPages; i++){
        pageNumbers.push(i);
    }

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