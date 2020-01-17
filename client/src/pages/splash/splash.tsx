import * as React from "react";
import classnames from "classnames";
import Layout from "../../components/layout/layout";
import { GoogleButton } from "../../components/google-button/google-button";
import { useAuth } from "../../hooks/use-auth";
import styles from "./splash.module.css";
import { ALIGNMENT } from "../../types/enums";
import Loading from "../../components/loading/loading";

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
  return <h2 className={className}>A COMPETITIVE TRAVEL GAME</h2>;
};

const Splash: React.FunctionComponent = () => {
  const { login, loading } = useAuth();
  const pageClassName = classnames(styles["page"]);
  const buttonWrapperClassName = classnames(styles["button-wrapper"]);
  return loading ? (
    <Loading />
  ) : (
    <div className={pageClassName}>
      <div>
        <Title />
        <Subtitle />
      </div>
      <div className={buttonWrapperClassName}>
        <GoogleButton onClick={login} />
      </div>
    </div>
  );
};

export default Splash;
