import * as React from "react";
import Layout from "../../components/layout/layout";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "../../components/button/button";
import Loading from "../../components/loading/loading";

import styles from "./menu.module.css";

const Menu: React.FunctionComponent = () => {
  const { user, loading } = useAuth();
  console.log(user);
  return loading ? (
    <Loading />
  ) : (
    <Layout renderFooter={<h2>{user ? user.username : null}</h2>}>
      <div className={styles["content"]}>
        <Button to="/leaderboard">Leaderboard</Button>
        <Button to="/game">Play Game</Button>
        <Button to="/stats">Statistics</Button>
      </div>
    </Layout>
  );
};

export default Menu;
