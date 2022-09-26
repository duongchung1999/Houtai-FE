import { BaseEntity } from "./baseEntity";

/**
 * model
 */
export class Model {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    id?: number = undefined;

    /** model name */
    name?: string = undefined;

    createTime?: Date | string | number = undefined;

    /** create user ID */
    creatorId?: number = undefined;

    /** 此机型的料号所用的默认配置表单 */
    pnFormStyle?: string = undefined;

    /** 料号表单的配置 */
    pnConfigTemplate?: string = undefined;
}