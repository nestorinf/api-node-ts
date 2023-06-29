import express from 'express';
import bodyParser from 'body-parser';
import menuRoutes from './menus/infra/routes/menu.route';
import userRoutes from './users/infra/routes/user.route'
import * as dotenv from "dotenv";
import cors from "cors"

dotenv.config({ path: __dirname+'/.env' });

const app = express();
const port = 4001;

console.log("DATABASE_URL: ",process.env.DATABASE_URL)

export default class App {
  private readonly application = app

  constructor() {
    this.listen()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.application.use(cors<Request>())
    this.application.use(bodyParser.json())
  }


  routes() {
    this.application.get('/', (req, res) => {
        res.send('Hello World!');
      });

    this.application.use(menuRoutes)
    this.application.use(userRoutes)
  }

  listen() {
    console.log(port)
    return this.application.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    })
  }
}
