import React from "react";
import styles from "./NotfoundBlock.module.scss";

const NotfoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className="description">
        К сожелению данная страница отсутвует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotfoundBlock;
