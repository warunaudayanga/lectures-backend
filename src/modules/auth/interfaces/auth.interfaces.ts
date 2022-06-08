import { User } from "../../user/entities";

export interface TokenData {
    token: string;
    expiresIn: number;
    user: User;
}
