import express, { Request, Response } from "express";
import cors from "cors";
import users from "../data";

const app = express();

const configOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(configOptions));

app.get("/api/v1/users", (req: Request, res: Response) => {
  res.send({
    data: users,
  });
});

app.listen(8080, () => {
  console.log("server starting");
});
