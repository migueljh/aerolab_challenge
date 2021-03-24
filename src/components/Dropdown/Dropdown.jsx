import React, { useState, useContext, useEffect } from "react";
import styles from "./dropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faShoppingBasket,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { addPoints, getUserInfo } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import Alert from "../Alert/Alert";

const Dropdown = () => {
  const {
    setOpenList,
    openAlertPoints,
    setOpenAlertPoints,
    trackScrolling,
    setTrackScrolling,
  } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const dispatch = useDispatch();
  const setModalMode = () => {
    openModal === true ? setOpenModal(false) : setOpenModal(true);
  };
  const [amount, setAmount] = useState(0);

  const addUserPoints = (amount) => {
    dispatch(addPoints(amount));
  };

  useEffect(() => {
    window.onscroll = () => {
      setTrackScrolling(window.pageYOffset);
    };
  }, [setTrackScrolling]);

  return (
    <div>
      <div className={styles.dropdownContainer}>
        <ul>
          <li>
            <Link to="/history">
              <p onClick={() => setOpenList(false)}>
                Purchase history{" "}
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  style={{ marginLeft: "5px" }}
                />
              </p>
            </Link>
          </li>
          <li style={{ marginTop: "15px" }} onClick={setModalMode}>
            <p>
              Charge points{" "}
              <FontAwesomeIcon icon={faCoins} style={{ marginLeft: "5px" }} />
            </p>
          </li>
        </ul>
        {openModal === true ? (
          <div className={styles.modalContainer}>
            <h4>How much you want to charge?</h4>
            <ul>
              <li>
                <button
                  className={styles.chargeBtn}
                  onClick={() => {
                    setAmount(1000);
                    setOpenAlertPoints(true);
                  }}
                >
                  1000{" "}
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    color="#fff"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
              </li>
              <li>
                <button
                  className={styles.chargeBtn}
                  onClick={() => {
                    setAmount(5000);
                    setOpenAlertPoints(true);
                  }}
                >
                  5000{" "}
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    color="#fff"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
              </li>
              <li>
                <button
                  className={styles.chargeBtn}
                  onClick={() => {
                    setAmount(7500);
                    setOpenAlertPoints(true);
                  }}
                >
                  7500{" "}
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    color="#fff"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
              </li>
            </ul>
            <div
              className={styles.alertPoints}
              style={{ marginTop: trackScrolling }}
            >
              {openAlertPoints === true ? (
                <Alert
                  open={() => {
                    setSuccessAlert(true)
                    setOpenAlertPoints(false);
                    addUserPoints(amount);
                    dispatch(getUserInfo());
                  }}
                  text={`Are you sure that you want to add ${amount} coins to your account? `}
                  textButton={"Confirm"}
                  textButtonCancel={"Cancel"}
                  close={() => {
                    setOpenAlertPoints(false);
                  }}
                />
              ) : null}
              {successAlert === true ? (
                <Alert
                  open={() => {
                    setSuccessAlert(false);
                    dispatch(getUserInfo());
                  }}
                  text={`You charge has been made successfully`}
                  textButton={"Continue"}
                  textButtonCancel={"Close"}
                  close={() => {
                    setSuccessAlert(false);
                    dispatch(getUserInfo());
                  }}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
