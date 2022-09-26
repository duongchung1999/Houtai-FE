
import { get, add } from '@/utils/request';
import { RequestLog } from '@/entity/requestLog';
import { PageList } from '@/entity/pageList';

const BASE_PATH = "/request-logs";


export class RequestLogAPI {

    /**
     * 查询请求日志
     * @param params 过滤条件
     * @returns 
     */
    public static getList(params: { requestUserId: number, path: string, method: string, keyword: string, startdate: Date, enddate: Date, page: number, pagesize: number }): Promise<PageList<RequestLog>> {
        return get(`${BASE_PATH}/list`, params);
    }

    public static getOptions(): Promise<any> {
        return get(`${BASE_PATH}/options`);
    }

}