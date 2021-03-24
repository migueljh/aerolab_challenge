import React from "react";
import styles from "./alert.module.css";

const Alert = ({ text, open, textButton, close, textButtonCancel}) => {
  
  return (
    <div>
      <div className={styles.containerAlert}>
        <p>{text}</p>
        <button onClick={open}>{textButton}</button>
        <button className={styles.btnClose} onClick={close}>{textButtonCancel}</button>
      </div>
    </div>
  );
};

export default Alert;
