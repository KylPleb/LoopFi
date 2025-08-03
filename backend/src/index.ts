import express, { Request, Response } from "express";
import { loops, roles } from "./data";

const app = express();
const port = process.env.PORT || 3001;

function toCSV(items: any[]): string {
  if (items.length === 0) return "";
  const headers = Object.keys(items[0]);
  const csvRows = [
    headers.join(","),
    ...items.map((item) => headers.map((h) => String(item[h] ?? "")).join(",")),
  ];
  return csvRows.join("\n");
}

app.get("/", (_req: Request, res: Response) => {
  res.send("LoopFi backend");
});

app.get("/export/loops", (req: Request, res: Response) => {
  const format = String(req.query.format || "json").toLowerCase();
  if (format === "csv") {
    res.type("text/csv").send(toCSV(loops));
  } else {
    res.json(loops);
  }
});

app.get("/export/roles", (req: Request, res: Response) => {
  const format = String(req.query.format || "json").toLowerCase();
  if (format === "csv") {
    res.type("text/csv").send(toCSV(roles));
  } else {
    res.json(roles);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
