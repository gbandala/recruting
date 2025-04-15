import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Candidato } from "../models/Candidato";
import { Llamada } from "../models/Llamada";
import { EnvironmentEnum } from "../enums";

dotenv.config();

const {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  ENV,
} = process.env;

class Database {
  public sequelize: Sequelize | undefined;
  private DB_NAME = DB_NAME as string;
  private DB_HOST = DB_HOST as string;
  private DB_PORT = DB_PORT as unknown as number;
  private DB_USER = DB_USER as unknown as string;
  private DB_PASSWORD = DB_PASSWORD as unknown as string;
  private ENVIRONMENT: string;

  constructor() {
    this.DB_NAME = DB_NAME;
    this.DB_HOST = DB_HOST;
    this.DB_PORT = Number(DB_PORT);
    this.DB_USER = DB_USER;
    this.DB_PASSWORD = DB_PASSWORD;
    this.ENVIRONMENT = ENV;
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    const connection: SequelizeOptions = {
      database: this.DB_NAME,
      username: this.DB_USER,
      password: this.DB_PASSWORD,
      host: this.DB_HOST,
      port: this.DB_PORT,
      dialect: "postgres",
      logging: false,
      models: [Candidato, Llamada],
    };

    if (ENV === EnvironmentEnum.PRODUCTION) {
      connection.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };
    }

    this.sequelize = new Sequelize(connection);

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PostgreSQL Connection has been established successfully for PostgreSQL database:" + process.env.DB_NAME
        );
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:" + process.env.DB_NAME, err);
      });
  }
}

export default Database;