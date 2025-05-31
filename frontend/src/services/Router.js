export class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', () => this.navigate(window.location.pathname));
    }

    addRoute(path, callback) {
        this.routes[path] = callback;
    }

    navigate(path) {
        if (this.routes[path]) {
            history.pushState({}, '', path);
            this.routes[path]();
        } else {
            // Обработка 404
            console.error('Route not found');
        }
    }
}