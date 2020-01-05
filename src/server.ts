import express from 'express';
import { Request, Response} from "express";
import * as homeController from './controllers/home';


class Server {
    private app: any
    private readonly port: number
    private readonly headers: any

    constructor(headers: object, port: number) {
        this.headers = headers;
        this.port = port;
        this.app = express();
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
    }

    public start(): void {
        this.setHeaders();
        this.initRoutes();

        if (typeof this.port !== 'number') {
            throw new Error(`Error start port: ${this.port}`);
        }

        this.app.listen(this.port, () => {
            console.log(`Server has been start on port: ${this.port}`)
        })
    }
}

export default Server;