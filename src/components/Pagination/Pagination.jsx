import React from "react";
import styles from "./pagination.module.css";
import "semantic-ui-css/semantic.min.css";
import { Icon, Menu } from "semantic-ui-react";

const Pagination = ({
  productPerPage,
  totalproduct,
  paginate,
  nextPage,
  prevPage,
  currentPage,
  scroll
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalproduct / productPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Menu style={{ border: "none", boxShadow: "none" }} pagination>
      <ul className={styles.pagination}>
        <li>
          <Menu.Item
            as="a"
            icon
            onClick={() => {
              prevPage();
              scroll()
            }}
          >
            <Icon name="chevron left" />
          </Menu.Item>
        </li>
        <li key={currentPage}>
          <div
            onClick={() => {
              paginate(currentPage);
              window.scrollTo(0, 0);
            }}
            className={styles.pageLink}
            style={{marginTop: "7px"}}
          >
            <div className={currentPage ? styles.pageActive : null}>
              Page {currentPage} of {pageNumbers.length}
            </div>
          </div>
        </li>
        <li>
          <Menu.Item
            as="a"
            icon
            onClick={() => {
              nextPage();
              scroll()
            }}
          >
            <Icon name="chevron right" />
          </Menu.Item>
        </li>
      </ul>
    </Menu>
  );
};

export default Pagination;
