import { BaseEntity } from "./baseEntity";

export class PartNo {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    id?: number = undefined;

    /** 料号 */
    no?: string = undefined;

    /** 对应的料号配置的Id */
    partNoConfigID?: number = undefined;

    /** 对应的料号配置 */
    partNoConfig?: string = undefined;

    /** 对应的机型的Id */
    modelId?: number = undefined;


}