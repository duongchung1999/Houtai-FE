import { BaseEntity } from "./baseEntity";

/** 请求日志 */
export class RequestLog {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    public id?: number = undefined;

    public method?: string = undefined;

    public request_url?: string = undefined;

    public refer_url?: string = undefined;

    public ip?: string = undefined;

    public parameters?: string = undefined;

    public result?: string = undefined;

    public requestUserId?: number = undefined;
    
    public requestUserNickanme?: string = undefined;

    public isSucceed?: boolean = undefined;

    public requestDate?: Date = undefined;

    public path?: string = undefined;

}