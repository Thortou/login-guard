import { Provider } from "@nestjs/common";
import { JwtStrategy } from "src/common/guards/jwt.strategy";
import { LocalStrategy } from "src/common/guards/local.strategy";

export const strategies: Provider[] = [
    LocalStrategy, 
    JwtStrategy
];