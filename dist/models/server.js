"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const departmentRoutes_1 = __importDefault(require("../routes/departmentRoutes"));
const holidayRoutes_1 = __importDefault(require("../routes/holidayRoutes"));
const enterpriseRoutes_1 = __importDefault(require("../routes/enterpriseRoutes"));
const usersRoutes_1 = __importDefault(require("../routes/usersRoutes"));
const seniorityRoutes_1 = __importDefault(require("../routes/seniorityRoutes"));
const appError_1 = __importDefault(require("../utils/appError"));
const errorController_1 = __importDefault(require("./../controllers/errorController"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        // MIDDLEWARES
        this.middlewares();
        // INIT ROUTES
        this.routes();
    }
    middlewares() {
        // ABLE CORS
        this.app.use((0, cors_1.default)());
        // ABLE BODY REQUEST
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use("/api/v1/department", departmentRoutes_1.default);
        this.app.use("/api/v1/holiday", holidayRoutes_1.default);
        this.app.use("/api/v1/enterprise", enterpriseRoutes_1.default);
        this.app.use("/api/v1/seniority", seniorityRoutes_1.default);
        this.app.use("/api/v1/users", usersRoutes_1.default);
        this.app.all("*", (req, _, next) => {
            next(new appError_1.default(`can't find ${req.originalUrl} on this server!`, 404));
        });
        this.app.use(errorController_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listem in port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map