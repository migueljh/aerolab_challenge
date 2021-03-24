import React, { useEffect, useState, useContext } from "react";
import styles from "./catalog.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, buyProduct, getUserInfo } from "../../redux/actions";
import Product from "../Products/Products";
import { Context } from "../../App";
import Alert from "../Alert/Alert";
import Pagination from "../Pagination/Pagination";

const Catalog = () => {
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [productCost, setProductCost] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("")
  const [successAlert, setSuccessAlert] = useState(false);
  const {
    openAlert,
    setOpenAlert,
    trackScrolling,
    setTrackScrolling,
    openAlertPoints,
  } = useContext(Context);
  const dispatch = useDispatch();
  const productsCatalogue = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(16);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts =
    Array.isArray(products) &&
    products.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () =>
    setCurrentPage(
      currentPage >= Math.ceil(productsCatalogue.length / productPerPage)
        ? currentPage
        : currentPage + 1
    );
  const prevPage = () =>
    setCurrentPage(currentPage !== 1 ? currentPage - 1 : currentPage);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilter("All");
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setProducts(productsCatalogue);
    }
  }, [filter, productsCatalogue]);

  useEffect(() => {
    const newArr = [...productsCatalogue];
    if (filter === "Lowest") {
      const filteredProducts = newArr.sort((a, b) => {
        return parseFloat(a.cost) - parseFloat(b.cost);
      });
      setProducts(filteredProducts);
    }
    if (filter === "Highest") {
      const filteredProducts = newArr.sort((a, b) => {
        return parseFloat(b.cost) - parseFloat(a.cost);
      });
      setProducts(filteredProducts);
    }
  }, [filter, productsCatalogue]);

  const purchaseProduct = (id) => {
    dispatch(buyProduct(id));
    dispatch(getUserInfo());
  };

  useEffect(() => {
    window.onscroll = () => {
      setTrackScrolling(window.pageYOffset);
    };
  }, [setTrackScrolling]);

  return (
    <>
      <div className={styles.catalogContainer}>
        <div
          className={styles.upperCatalogContainer}
          style={{
            opacity: openAlert === true || openAlertPoints === true ? 0.4 : 1,
          }}
        >
          <div className={styles.countProducts}>
            <p style={{ color: "rgba(0, 0, 0, 0.80)" }}>
              {productPerPage * currentPage} of {productsCatalogue.length}{" "}
              products
            </p>
          </div>
          <div className={styles.lineVerticalFilter} />
          <div className={styles.sortByDiv}>
            <p className={styles.sortByText}>Sort by: </p>
          </div>
          <button
            onClick={() => {
              setFilter("All");
              setCurrentPage(1);
            }}
          >
            Most Recent
          </button>
          <button
            onClick={() => {
              setFilter("Lowest");
              setCurrentPage(1);
            }}
          >
            Lowest Price
          </button>
          <button
            onClick={() => {
              setFilter("Highest");
              setCurrentPage(1);
            }}
          >
            Highest Price
          </button>
        </div>
        <div className={styles.lineHorizontalFilter} />

        <div className={styles.productsContainer}>
          {currentProducts.map((product) => {
            return (
              <div
                key={product._id}
                style={{
                  opacity:
                    openAlert === true || openAlertPoints === true ? 0.4 : 1,
                }}
              >
                <Product
                  id={product.id}
                  img={product.img.url}
                  name={product.name}
                  category={product.category}
                  cost={product.cost}
                  userCoins={!user ? null : user.points}
                  available={
                    parseFloat(user.points) >= parseFloat(product.cost)
                      ? true
                      : false
                  }
                  buy={() => {
                    setProductId(product._id);
                    setOpenAlert(true);
                    setProductCost(product.cost);
                    setProductName(product.name);
                  }}
                  
                />
              </div>
            );
          })}
          <div
            className={styles.alertPurchase}
            style={{
              marginTop: trackScrolling - 500,
              opacity: openAlert === true || openAlertPoints === true ? 1 : 1,
            }}
          >
            {openAlert === true ? (
              <Alert
                open={() => {
                  setOpenAlert(false);
                  purchaseProduct(productId);
                  setSuccessAlert(true);

                }}
                text={`You are going to buy ${productName} for ${productCost} coins `}
                textButton={"Confirm"}
                textButtonCancel={"Cancel"}
                close={() => {
                  setOpenAlert(false);
                }}
              />
            ) : null}
            {successAlert === true ? (
              <Alert
                open={() => {
                  setSuccessAlert(false);
                  dispatch(getUserInfo());
                }}
                text={`Your purchase has been made successfully`}
                textButton={"Continue"}
                textButtonCancel={"Close"}
                close={() => {
                  setSuccessAlert(false);
                  dispatch(getUserInfo());
                }}
              />
            ) : null}
          </div>
          <div
            className={styles.paginationDiv}
            style={{
              opacity: openAlert === true || openAlertPoints === true ? 0.4 : 1,
            }}
          >
            <div style={{ textAlign: "center", marginLeft: "40px" }}>
              <p style={{ color: "rgba(0, 0, 0, 0.80)" }}>
                {productPerPage * currentPage} of {products.length} products
              </p>
            </div>
            <Pagination
              productPerPage={productPerPage}
              totalproduct={products.length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              scroll={() => window.scrollTo(0, 530)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
