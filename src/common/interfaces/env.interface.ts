export interface IEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PORT: number;
    DB_DATABASE: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;

    SERVER_PORT: number;
}