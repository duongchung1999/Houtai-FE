
import { get, add, update, del } from '@/utils/request';
import { DynamicCode } from '@/entity/dynamicCode';
import { PageList } from '@/entity/pageList';

const BASE_PATH = "/dynamic-codes";


export class DynamicCodeSearchOptions {
    // keyword: string = null;
    // startDate?: Date = null;
    // endDate?: Date = null;
    pageIndex: number = null;
    pageSize: number = 9;

}

export class DynamicCodeAPI {
    static getByModelId(modelId: number): Promise<DynamicCode> { return get(`${BASE_PATH}/by-model-id/${modelId}`) }
    static add(code: DynamicCode): Promise<DynamicCode> { return add(`${BASE_PATH}`, code) }
    static del(codeId: number): Promise<DynamicCode> { return del(`${BASE_PATH}/${codeId}`) }
    // static search(options: DynamicCodeSearchOptions): Promise<PageList<DynamicCode>> { return get(`${BASE_PATH}/list`) }
}