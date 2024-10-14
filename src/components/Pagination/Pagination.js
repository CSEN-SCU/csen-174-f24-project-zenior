"use client";
import styles from "./Pagination.module.css";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const PagesCount = Math.ceil(items / pageSize);
    if(PagesCount === 1)
        return null;
    const pages = Array.from({ length: PagesCount }, (_, i) => i+1); //length of array and mapping fn
    return(
        <div>
            <ul className={styles.Pagination}>
                {pages.map((page) => (
                    <li key={page} className = { page === currentPage ? styles.pageItemActive : styles.pageItem }>
                        <a className = {styles.pageLink} onClick={()=>onPageChange(page)}>{page}</a>
                    </li>
                )
                )}
            </ul>
        </div>
    );
};
export default Pagination;