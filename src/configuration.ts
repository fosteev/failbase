import fsReadFilePromise from 'fs-readfile-promise';

interface configuration {
    headers: object,
    port: number
}

class Configuration {
    private readonly path: string

    constructor(path: string) {
        this.path = path;
    }

    async parsingConfiguration(): Promise<configuration> {
        const configuration = await this.getConfiguration();
        return {
            headers: configuration.headers,
            port: configuration.port
        }
    }

    async getConfiguration(): Promise<configuration> {
        try {
            const buffer: string = await fsReadFilePromise(this.path, 'utf8');
            return JSON.parse(buffer);
        } catch (e) {
            console.log(e);
            throw new Error(`Error parse configuration file. Path: ${this.path}`);
        }
    }
}

export default Configuration;