import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/tryToLogIn", (req: Request, res: Response) => {
  const { name, pass } = req.body;
  if (name && pass) {

    res.send(`Hello, ${name}!`);
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
