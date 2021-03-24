import React, { useContext } from "react";
import styles from "./products.module.css";
import coin from "../../media/assets/icons/coin.svg";
import { Context } from "../../App";

const Products = ({
  id,
  img,
  name,
  category,
  cost,
  userCoins,
  available,
  buy,
}) => {
  const { openAlert, openAlertPoints } = useContext(Context);
  return (
    <div className={styles.productCard} key={id}>
      <div className={styles.circleShopping}></div>
      <img src={img} className={styles.productCardImg} alt="product img" />
      <div className={styles.lineHorizontalProduct} />
      {available === false ? (
        <p className={styles.notAvailableText}>Not available</p>
      ) : null}
      <p className={styles.productCardTextTitle}>{category}</p>
      <p className={styles.productCardTextSubtitle}>{name}</p>

      {available === true ? (
        <div className={styles.curtain}>
          <div className={styles.circleShoppingHover}></div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ fontWeight: "900" }}>Price: {cost}</p>
            <img src={coin} className={styles.iconCoin} alt="info" />
          </div>
          <button
            className={styles.btnRedeem}
            onClick={buy}
            disabled={openAlert === true || openAlertPoints === true ? true : false}
          >
            Redeem Now
          </button>
        </div>
      ) : (
        <div className={styles.curtainNotAvailable}>
          <div className={styles.circleShoppingHoverNotAvailable}></div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ fontWeight: "900" }}>Price: {cost}</p>
              <img src={coin} className={styles.iconCoinNA} alt="coin" />
            </div>
            <p style={{ marginTop: "0px", width: "200px", fontSize: "20px" }}>
              You need {cost - userCoins} coins more to buy this product{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
