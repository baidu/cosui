export default function () {
    return {
        name: 'vite-plugin-server',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const regexNodeModules = /\/node_modules\/.*(chunk-5WWUZCGV|san)\.js\.map$/;
                if (regexNodeModules.test(req.url)) {
                    res.end('undefined');
                }
                else {
                    next();
                }
            });
        }
    };
}