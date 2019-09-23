import React from "react";
import classnames from "classnames";
import styles from "./card.module.css";

const IMG_SIZE = {
  SM: "small",
  MED: "medium",
  LG: "large"
};

function Card({ cardTitle, cardTopImg, altText, cardBody, subtitle, imgSize = IMG_SIZE.MED }) {
  const topClasses = classnames(styles["card-top"], {
    [styles["card-top-large"]]: imgSize === IMG_SIZE.LG
  });
  const imageClasses = classnames({
    [styles["card-img-small"]]: imgSize === IMG_SIZE.SM,
    [styles["card-img-medium"]]: imgSize === IMG_SIZE.MED,
    [styles["card-img-large"]]: imgSize === IMG_SIZE.LG
  });

  const cardClasses = classnames(styles["card"], {
    [styles["card-shadow-large"]]: imgSize === IMG_SIZE.LG,
    [styles["card-shadow-medium"]]: imgSize === IMG_SIZE.MED,
    [styles["card-shadow-small"]]: imgSize === IMG_SIZE.SM
  });

  const titleClasses = classnames(styles["card-title"], {
    [styles["card-title-large"]]: imgSize === IMG_SIZE.LG,
    [styles["card-title-medium"]]: imgSize === IMG_SIZE.MED,
    [styles["card-title-small"]]: imgSize === IMG_SIZE.SM
  });

  const subtitleClasses = classnames(styles["card-subtitle"], {
    [styles["card-subtitle-large"]]: imgSize === IMG_SIZE.LG,
    [styles["card-subtitle-medium"]]: imgSize === IMG_SIZE.MED,
    [styles["card-subtitle-small"]]: imgSize === IMG_SIZE.SM
  });

  const bodyClasses = classnames(styles["card-body"], {
    [styles["card-body-large"]]: imgSize === IMG_SIZE.LG,
    [styles["card-body-medium"]]: imgSize === IMG_SIZE.MED,
    [styles["card-body-small"]]: imgSize === IMG_SIZE.SM
  });
  return (
    <article className={cardClasses}>
      <div className={topClasses}>
        <img className={imageClasses} src={cardTopImg} alt={altText} />
      </div>
      <div className={styles["card-body"]}>
        <h3 className={titleClasses}>{cardTitle}</h3>
        {subtitle ? <h4 className={subtitleClasses}>{subtitle}</h4> : null}
        {cardBody ? <p className={bodyClasses}>{cardBody}</p> : null}
      </div>
    </article>
  );
}

export { Card };
