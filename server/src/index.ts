import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, Collection } from "mongodb";

dotenv.config();

const url = process.env.MONGODBURL || "";
const port = process.env.PORT || 9000;
let accounts: Collection;

async function connectToDatabase() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db("task-manager");
    accounts = database.collection("accounts");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with an error code
  }
}

connectToDatabase();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/tryToLogIn", async (req: Request, res: Response) => {
  const { name, pass } = req.body;
  if (name && pass) {
    try {
      const account = await accounts.findOne({ name: name, pass: pass });
      if (!account) {
        res.send("Invalid");
      } else {
        res.send("OK");
      }
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
