import React from "react";
import './Pagination.scss'

 export default function Pagination ({
  productsPage,
  totalProducts,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <nav
      className="pagination is-centered mb-6"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className={`pagination-previous ${
          currentPage === 1 ? "is-disabled" : " "
        }`}
        onClick={onPreviusPage}
      >
        Anterior
      </button>

      <ul className="pagination-list">
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <button
              className={`pagination-link ${
                noPage === currentPage ? "is-current" : " "
              }`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </button>
          </li>
        ))}
      </ul>
      
      <button
        className={`pagination-next ${
          currentPage >= pageNumbers.length ? "is-disabled" : " "
        }`}
        onClick={onNextPage}
      >
        Siguiente
      </button>
    </nav>
  );

};
