import * as React from "react";
import classnames from "classnames";
import { GoogleButton } from "./google-button";
import styles from "./splash.module.css";

const Title: React.FunctionComponent = () => {
  const [title, setTitle] = React.useState<string>("RYOKŌ");
  const className = classnames(styles["title"]);
  return (
    <h1 onMouseEnter={() => setTitle("旅行")} onMouseOut={() => setTitle("RYOKŌ")} className={className}>
      {title}
    </h1>
  );
};

const Subtitle: React.FunctionComponent = () => {
  const className = classnames(styles["subtitle"]);
  return <h2 className={className}>A GAME TO TRAVEL AROUND THE WORLD WITH</h2>;
};

const Splash: React.FunctionComponent = () => {
  const pageClassName = classnames(styles["page"]);
  const buttonWrapperClassName = classnames(styles["button-wrapper"]);
  return (
    <div className={pageClassName}>
      <div>
        <Title />
        <Subtitle />
      </div>
      <div className={buttonWrapperClassName}>
        <GoogleButton onClick={() => console.log("clicked")} />
      </div>
    </div>
  );
};

export default Splash;
