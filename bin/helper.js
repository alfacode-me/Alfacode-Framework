module.exports = {
    init: (module) => {
        if (module.fs.existsSync(module.path.join(__dirname, "../helper"))) {
            var helper = {};
            module.fs.readdirSync(module.path.join(__dirname, "../helper")).forEach(function (file) {
                var hlp;
                if (file.substr(-3) == ".js") {
                    hlp = require("../helper/" + file);
                    if (typeof hlp == "function") {
                        hlp(module.hbs);
                    }
                }
            });
        }
    }
}