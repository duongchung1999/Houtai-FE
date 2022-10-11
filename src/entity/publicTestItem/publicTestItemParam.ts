
import { BaseEntity } from "./../baseEntity";

/** 通用测试项目的参数 */
export class PublicTestItemParam {

    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    id?: number = undefined;

    sortIndex?: number = undefined;

    methodId?: number = undefined;

    /** 参数概述 */
    summary?: string = undefined;

    /** 参数名称 */
    name?: string = undefined;

    /** 参数类型 */
    type?: string = undefined;

    // TODO 为了适配不同形式的可选项，改成字符串，前端解析
    /** 可选项 */
    options?: string;
}
