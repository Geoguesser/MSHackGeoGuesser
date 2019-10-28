import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/setup-database";
import Game from "./game";

class GameRound extends Model {
  public id!: number;
  public gameId!: number;
  public round!: number;
  public score!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GameRound.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: "id"
      }
    },
    round: {
      type: DataTypes.NUMBER
    },
    score: {
      type: DataTypes.NUMBER
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
  { sequelize, tableName: "game_round" }
);

export default GameRound;
