import React from "react";
import classnames from "classnames";
import styles from "./card.module.css";

enum SIZE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

interface CardProps {
  cardTitle: string;
  cardTopImg: string;
  altText: string;
  cardBody?: string;
  subtitle: string;
  imgSize: string;
}

function Card({
  cardTitle,
  cardTopImg,
  altText,
  cardBody,
  subtitle,
  imgSize = SIZE.MEDIUM
}: CardProps): JSX.Element {
  const topClasses: string = classnames(styles["card-top"], {
    [styles["card-top-large"]]: imgSize === SIZE.LARGE
  });
  const imageClasses: string = classnames({
    [styles["card-img-small"]]: imgSize === SIZE.SMALL,
    [styles["card-img-medium"]]: imgSize === SIZE.MEDIUM,
    [styles["card-img-large"]]: imgSize === SIZE.LARGE
  });

  const cardClasses: string = classnames(styles["card"], {
    [styles["card-shadow-large"]]: imgSize === SIZE.LARGE,
    [styles["card-shadow-medium"]]: imgSize === SIZE.MEDIUM,
    [styles["card-shadow-small"]]: imgSize === SIZE.SMALL
  });

  const titleClasses: string = classnames(styles["card-title"], {
    [styles["card-title-large"]]: imgSize === SIZE.LARGE,
    [styles["card-title-medium"]]: imgSize === SIZE.MEDIUM,
    [styles["card-title-small"]]: imgSize === SIZE.SMALL
  });

  const subtitleClasses: string = classnames(styles["card-subtitle"], {
    [styles["card-subtitle-large"]]: imgSize === SIZE.LARGE,
    [styles["card-subtitle-medium"]]: imgSize === SIZE.MEDIUM,
    [styles["card-subtitle-small"]]: imgSize === SIZE.SMALL
  });

  const bodyClasses: string = classnames(styles["card-body"], {
    [styles["card-body-large"]]: imgSize === SIZE.LARGE,
    [styles["card-body-medium"]]: imgSize === SIZE.MEDIUM,
    [styles["card-body-small"]]: imgSize === SIZE.SMALL
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
