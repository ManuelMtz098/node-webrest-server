import express, { Router } from 'express'
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(private options: Options) {
        const { port, public_path = 'public', routes } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes
    }

    async start(){
        //* Middlewares
        this.app.use(express.json()) //* CUalquier peticion pasa por aqui, por lo que si viene en el body será json
        this.app.use(express.urlencoded({ extended: true })) //* Este es para el x-www-form-urlencoded

        //* Public folders
        this.app.use(express.static(this.publicPath))

        //* Routes (API)
        this.app.use(this.routes)

        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log('Server is running on port ', this.port)
        })
    }
}