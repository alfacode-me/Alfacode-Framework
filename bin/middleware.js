module.exports = {
    init: (module) => {
        if (module.fs.existsSync(module.path.join(__dirname, "../middleware"))) {
            module.fs.readdirSync(module.path.join(__dirname, "../middleware")).forEach(function (file1) {
                var route1;
                if (file1.substr(-3) == ".js") {
                    route1 = require("../middleware/" + module.path.basename(file1, '.js'));
                    module.app.use(route1.path, route1.router);
                }
                if (module.path.extname(file1) == "") {
                    module.fs.readdirSync(module.path.join(__dirname, "../middleware/" + file1)).forEach(function (file2) {
                        var route2;
                        if (file2.substr(-3) == ".js") {
                            route2 = require("../middleware/" + file1 + "/" + module.path.basename(file2, '.js'));
                            module.app.use(route2.path, route2.router);
                        }
                        if (module.path.extname(file2) == "") {
                            module.fs.readdirSync(module.path.join(__dirname, "../middleware/" + file1 + "/" + file2)).forEach(function (file3) {
                                var route3;
                                if (file3.substr(-3) == ".js") {
                                    route3 = require("../middleware/" + file1 + "/" + file2 + "/" + module.path.basename(file3, '.js'));
                                    module.app.use(route3.path, route3.router);
                                }
                            });
                        }
                    });
                }
            });
        }
    }
}