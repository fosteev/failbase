import { Request, Response } from "express";
import Project from '../models/project';
import Message from '../models/message';
import Statistic from '../models/statistic';

export const projects = async (req: Request, res: Response) => {
    const projects =  await Project.find({});
    res.json(projects);
};

const snapshot = async () => {
    const projects: any = await Project.find({});
    let snapshot:any = {};

    projects.forEach((project: any) => {
        const name = project.name;
        snapshot[name] = project.count;
    });

    const statistic = new Statistic({
        snapshot: snapshot,
        date: new Date()
    });

    await statistic.save();

    return true;
}

const encrimentProjectCount = async (name: string) => {
    const projects: any = await Project.find({name: name});

    if (projects.length === 0) {
        const project = new Project({
            name: name,
            date: new Date()
        });
        await project.save();
    } else {
        const project = projects[0];
        project['count'] += 1;
        await project.save();
    }

    await snapshot();
    return  true;
}

export const pushProject = async (req: Request, res: Response) => {
    const {name} = req.params;
    const {header, message, additional_json, url} = req.body;

    await encrimentProjectCount(name);

    const messageModel = new Message({
        url: url,
        project: name,
        head: header,
        message: message,
        additional_json: additional_json,
        date: new Date()
    });

    await messageModel.save();
    res.send('Pushed');
};

export const getProjectMessages = async (req: Request, res: Response) => {
    const {name} = req.params;
    const messages = await Message.find({project: name});
    res.json(messages);
}