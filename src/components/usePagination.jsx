import React, {useState} from 'react';

const usePagination = (posts, postsPerPage, loaded) => {
    const [currentPage, setCurrentPage] = useState(1);
    // const [postsPerPage] = useState(4);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = 0;
    if(loaded){
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if(!loaded){
        return [[], null];
    }
    return [currentPosts, paginate];
}
export default usePagination;