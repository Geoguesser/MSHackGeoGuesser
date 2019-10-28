import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/setup-database";

type GameGenreEnum = "geoguesser";

class GameGenre extends Model {
  public genre!: GameGenreEnum;
}

GameGenre.init(
  {
    genre: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    tableName: "game_genre"
  }
);

export default GameGenre;
