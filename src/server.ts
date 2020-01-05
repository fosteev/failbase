import express from 'express';
import {Request, Response} from "express";
import mongoose from "mongoose";
import * as homeController from './controllers/home';
import * as projectController from "./controllers/project";

class Server {
    private app: any
    private readonly port: number
    private readonly headers: any
    private readonly mongo: any

    constructor(headers: object, port: number) {
        this.headers = headers;
        this.port = port;
        this.app = express();
        this.mongo = mongoose;
    }

    private setHeaders(): void {
        this.app.use((req: Request, res: Response, next: any) => {
            for (const key in this.headers) {
                const value = this.headers[key];
                res.header(key, value);
            }
            next();
        });
    }

    private initRoutes(): void {
        this.app.get('/', homeController.index);
        this.app.get('/projects', projectController.projects);
        this.app.post('/project', projectController.addProject);
    }

    private parsingRequest(): void {
        this.app.use(express.json()) // for parsing application/json
        this.app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    }

    public start(): void {
        this.setHeaders();
        this.parsingRequest();
        this.initRoutes();

        if (typeof this.port !== 'number') {
            throw new Error(`Error start port: ${this.port}`);
        }

        this.app.listen(this.port, () => {
            console.log(`Server has been start on port: ${this.port}`)
        })
    }

    public initMongo(url: string) {
        this.mongo.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('success mongo connect')
            /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        }).catch((err: any) => {
            console.log(`Mongo url: ${url}`)
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
        });
    }
}

export default Server;