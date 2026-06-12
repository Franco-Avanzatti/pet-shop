"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserEntity = void 0;
const client_1 = require("@prisma/client");
const createUserEntity = ({ email, password, role, }) => ({
    email,
    password,
    role: role ?? client_1.Role.USER,
});
exports.createUserEntity = createUserEntity;
//# sourceMappingURL=user.factory.js.map