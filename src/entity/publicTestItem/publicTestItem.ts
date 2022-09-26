
import { BaseEntity } from "./../baseEntity";
import { PublicTestItemParam } from "./publicTestItemParam";

/** 通用测试项目 */
export class PublicTestItem {
    constructor(data?: any) {
        BaseEntity.converter(this, data)
    }

    id?: number = undefined;

    /** 概述 */
    summary?: string = undefined;

    /** dll中的方法名称 */
    methodName?: string = undefined;

    /** 备注 */
    mark?: string = undefined;

    /** 参数列表 */
    params: PublicTestItemParam[] = [];

    /** 返回值 */
    returns?: string = undefined;

    /** 通用测试项目组的Id */
    groupId?: number = undefined;
}