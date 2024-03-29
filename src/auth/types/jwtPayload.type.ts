import { Role } from "src/common/enums/role.enum";

export type JwtPayload = {
    email: string;
    sub: string;
    role: Role;
}