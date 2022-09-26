import { BaseEntity } from "./baseEntity";

export class PartNoConfig {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }


    id?: number = undefined;

    /** 绑定此配置的料号列表 */
    PartNoIdList?: number[] = [];

    /** 料号对应的配置 */
    config?: string = undefined;

    /** 标题 */
    title?: string = undefined;


    modelId?: number = undefined;
}