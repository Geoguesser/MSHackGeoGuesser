// setup the postgres database hosted on heroku
import { Sequelize } from "sequelize";

const uri = process.env.HEROKU_POSTGRES_URI || "";

if (!uri) {
  console.log("cannot find database uri, make sure that you have setup the environment correctly");
}

const options = {
  dialectOptions: {
    ssl: true
  }
};

const sequelize = new Sequelize(uri, options);

export { sequelize };
