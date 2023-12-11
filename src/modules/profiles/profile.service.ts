import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfileService {
    

    async findAll (): Promise<any> {
        return ({ status:201, message: 'return your data', count: 0, data: []})
    }
}