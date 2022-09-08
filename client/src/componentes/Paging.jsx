/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./css/paging.css";

export default function Paging({ servicesPerPage, allServices, paging }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allServices / servicesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="pagenr" key={number}>
              <a onClick={() => paging(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
