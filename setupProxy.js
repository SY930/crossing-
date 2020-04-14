const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    debugger;
    console.log('app', app);
    app.use(
        proxy("/prism/", {
            target: "http://172.16.11.220:9081/",
            changeOrigin: true
        })
    );
};