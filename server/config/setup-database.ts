// setup the postgres database hosted on heroku
import { Sequelize } from "sequelize";

const uri = process.env.HEROKU_POSTGRES_URI || "";

const options = {
  dialectOptions: {
    ssl: true
  }
};

const sequelize = new Sequelize(uri, options);

export { sequelize };
