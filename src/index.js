import db from "./db/db.js";
import views_controller from "./views/Views_Controller.js";

const initialized = await db.init();

if (!initialized) {
    console.log("Problemas na conexão com o BD (fora do ar?)");
    process.exit(1);
} else {
    console.log("Conectou")
}

(async () => {
    views_controller.init()
})();