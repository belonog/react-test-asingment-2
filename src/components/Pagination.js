import React from 'react';

const Pagination = ({ pagination, loadPage}) => {
    const {page, total} = pagination;
    const pages = getPages(page, total);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {page !== 1 && <li className="page-item">
                    <a className="page-link" href="#" onClick={() => loadPage(1)}>First</a>
                </li>}
                <li className={`page-item d-none d-md-block${page == 1 ? ' disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={() => loadPage(page - 1)}>Previous</a>
                </li>

                {pages[0] > 1 && <li className="page-item d-none d-md-block disabled"><a className="page-link" href="#">...</a></li>}

                {pages.map(itm => <li key={itm} className={`page-item${page === itm ? ' active' : ''}`}>
                    <a className="page-link" href="#" onClick={() => loadPage(itm)}>{itm}</a>
                </li>)}

                {pages[pages.length - 1] < total && <li className="page-item d-none d-md-block disabled"><a className="page-link" href="#">...</a></li>}

                <li className={`page-item d-none d-md-block${page == total ? ' disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={() => loadPage(page + 1)}>Next</a>
                </li>

                {page != total && <li className="page-item">
                    <a className="page-link" href="#" onClick={() => loadPage(total)}>Last</a>
                </li>}
            </ul>
        </nav>
    );
};

const getPages = (page, total) => {
    const pages = [];
    const delta = 3;

    for (let i = 1; i <= total; i++) {
        if (i <= page && i > page - delta || i >= page && i < page + delta) {
            pages.push(i);
        }
    }

    return pages;
}

export default Pagination;
