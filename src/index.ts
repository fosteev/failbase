import Server from "./server";
import Configuration from "./configuration";

const configuration = new Configuration('configuration.json');

configuration.parsingConfiguration().then(config => {
    const server = new Server(config.headers, config.port);
    server.start();
})


