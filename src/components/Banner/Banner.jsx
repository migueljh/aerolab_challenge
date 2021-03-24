import React, {useContext} from "react"
import banner from "../../media/assets/header-x1.png";
import styles from "./banner.module.css"
import { Context } from "../../App";

const Banner = () => {
  const { openAlert, openAlertPoints } = useContext(Context);
    return(
        <div style={{opacity: openAlert === true || openAlertPoints === true ? 0.4 : 1}}>
        <p className={styles.textBanner}>Electronics</p>
        <img className={styles.banner} src={banner} alt="banner" />
      </div>
    )
}

export default Banner