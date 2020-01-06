import { Request, Response } from "express";
import Statistic from "../models/statistic";

export const statistic = async (req: Request, res: Response) => {
    const projects =  await Statistic.find({});
    res.json(projects);
}