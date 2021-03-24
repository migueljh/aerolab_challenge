import React, { useEffect, useContext } from "react";
import styles from "./navbar.module.css";
import aerolabLogo from "../../media/assets/aerolab-logo.svg";
import coin from "../../media/assets/icons/coin.svg";
import { getUserInfo } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../App";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    openList,
    setOpenList,
    openAlert,
    openAlertPoints,
    setOpenAlertPoints,
  } = useContext(Context);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const showOptions = () => {
    openList === true ? setOpenList(false) : setOpenList(true);
  };

  return (
    <div
      className={styles.navbarContainer}
      style={{ opacity: openAlert === true ? 0.4 : 1 }}
    >
      <div
        className={styles.upperNav}
        style={{ opacity: openAlertPoints === true ? 0.4 : 1 }}
      >
        <Link to="/">
          <img src={aerolabLogo} className={styles.aerolabLogo} alt="logo" />
        </Link>
      </div>
      <div className={styles.upperEl}>
        <div
          style={{ marginTop: "-2px", opacity: openAlertPoints === true ? 0.4 : 1 }}
        >
          <p
            className={styles.textNav}
            style={{ cursor: "pointer" }}
            onClick={() => {
              showOptions();
              setOpenAlertPoints(false);
            }}
          >
            {user.name} <FontAwesomeIcon icon={faSortDown} size="xs" />
          </p>
        </div>
        {openList === true ? <Dropdown /> : null}
        <span
          className={styles.pointCounter}
          style={{ opacity: openAlertPoints === true ? 0.4 : 1 }}
        >
          <p className={styles.textCounter} style={{ marginTop: "5px" }}>
            {user.points}
          </p>
          <img src={coin} className={styles.iconCoin} alt="coin" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
