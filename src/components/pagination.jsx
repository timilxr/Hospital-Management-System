import React from 'react';
import Button from 'react-bootstrap/Button';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);

    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(page =>
                    <li key={page} className='page-item'>
                        <Button variant="outline-primary" onClick={()=>paginate(page)} size='sm' className='mt-2'>{page}</Button>
                        {/* <a onClick={()=>paginate(page)} href='#' className='page-link text-secondary'>{page}</a> */}
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Pagination;