import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/setup-database";
import Player from "./player";
import GameGenre from "./game-genre";

class Game extends Model {
  public id!: number;
  public playerId!: number;
  public isFinished!: boolean;
  public genre!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Player,
        key: "id"
      }
    },
    isFinished: {
      type: DataTypes.BOOLEAN
    },
    genre: {
      type: DataTypes.TEXT,
      references: {
        model: GameGenre,
        key: "genre"
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at"
    }
  },
  {
    sequelize,
    tableName: "game"
  }
);

export default Game;
