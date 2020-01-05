import { Request, Response } from "express";
import Project from '../models/project';

export const projects = async (req: Request, res: Response, mongo: any) => {
    const projects =  await Project.find({});
    res.json(projects);
};

export const addProject = async (req: Request, res: Response, mongo: any) => {
    // const project = new Project({
    //     name: req.body,
    //     date: new Date()
    // });
    // await project.save();

    res.json(req.params);

};