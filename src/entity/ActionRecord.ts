import { BaseEntity } from "./baseEntity";

/** 操作记录 */
export class ActionRecord {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    id?: number = undefined;
    name?: string = undefined;
    message?: string = undefined;
    operator?: string = undefined;
    createDate?: Date = undefined;

}