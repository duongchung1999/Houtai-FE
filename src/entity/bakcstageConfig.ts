import { BaseEntity } from "./baseEntity";

export class BackstageConfig {
    constructor(data?: any) {
        BaseEntity.converter(this, data);
    }

    public id?: number = undefined;

    public key?: string = undefined;

    public label?: string = undefined;

    public value?: any = undefined;
}