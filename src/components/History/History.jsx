import React, { useState, useEffect } from "react";
import styles from "./history.module.css";
import "semantic-ui-css/semantic.min.css";
import { Table } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions";

const History = () => {
  const user = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(10);
  const dispatch = useDispatch();
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () =>
    setCurrentPage(
      currentPage >= Math.ceil(user.redeemHistory.length / productPerPage)
        ? currentPage
        : currentPage + 1
    );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const prevPage = () =>
    setCurrentPage(currentPage !== 1 ? currentPage - 1 : currentPage);

  const reverseArr = (input) => {
    var ret = [];
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  };

  const newUser = reverseArr(
    !user.redeemHistory ? <p>espera</p> : user.redeemHistory
  );

  const currentUserHistory = !newUser ? (
    <p>espera</p>
  ) : (
    Array.isArray(newUser) &&
    newUser.slice(indexOfFirstProduct, indexOfLastProduct)
  );

  return (
    <div className={styles.tableContainer}>
      <h1>Your purchase history</h1>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Purchase Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Array.isArray(currentUserHistory) &&
            currentUserHistory.map((userHistory) => {
              return (
                <Table.Row>
                  <Table.Cell>{userHistory.name}</Table.Cell>
                  <Table.Cell>{userHistory.category}</Table.Cell>
                  <Table.Cell>{userHistory.cost}</Table.Cell>
                  <Table.Cell>{userHistory.createDate.slice(0, 10)}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <div
                className={styles.paginationDiv}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Pagination
                  productPerPage={productPerPage}
                  totalproduct={
                    !user.redeemHistory ? null : user.redeemHistory.length
                  }
                  paginate={paginate}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  currentPage={currentPage}
                  scroll={() => window.scrollTo(0, 0)}
                />
              </div>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default History;
