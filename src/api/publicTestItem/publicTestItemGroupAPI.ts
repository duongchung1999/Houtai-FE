import { PublicTestItemGroup } from '@/entity/publicTestItem/publicTestItemGroup';
import { add, del, get } from '@/utils/request';

const BASE_PATH = "/public-test-item-groups";

export class PublicTestItemGroupAPI {
    /** 获取某个通用测试项目组的测试项目 */
    public static async getList(): Promise<PublicTestItemGroup[]> {
        return await get(`${BASE_PATH}/list/`);
    }

    /** 添加通用测试项目组 */
    public static async add(publicTestItemGroup: PublicTestItemGroup): Promise<PublicTestItemGroup> {
        return await add(`${BASE_PATH}`, publicTestItemGroup);
    }

     /** 删除通用测试项目组 */
     public static async del(groupId: number): Promise<PublicTestItemGroup> {
        return await del(`${BASE_PATH}/${groupId}`);
    }
}