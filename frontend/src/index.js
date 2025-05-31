import { Router } from './services/Router.js';
import HomePage from './pages/HomePage.js';

class App {
    constructor() {
        this.router = new Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.addRoute('/', () => new HomePage());
        // Здесь будут другие маршруты
        this.router.navigate(window.location.pathname);
    }
}

new App();