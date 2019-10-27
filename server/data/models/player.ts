import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/setup-database";
class Player extends Model {
  public id!: number;
  public username!: string | null;
  public googleId!: string | null;
  public googleDisplayName!: string | null;
  public googleFamilyName!: string | null;
  public googleGivenName!: string | null;
  public googlePhotoUrl!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    googleId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "google_id"
    },
    googleDisplayName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "google_display_name"
    },
    googleFamilyName: {
      type: DataTypes.STRING(255),
      field: "google_family_name"
    },
    googleGivenName: {
      type: DataTypes.STRING(255),
      field: "google_given_name"
    },
    googlePhotoUrl: {
      type: DataTypes.STRING(255),
      field: "google_photo_url"
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
    tableName: "player"
  }
);

export default Player;
