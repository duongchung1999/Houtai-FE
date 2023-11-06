import { PublicTestItem } from '@/entity/publicTestItem/publicTestItem'
import { get, add } from '@/utils/request'

const BASE_PATH = '/public-test-items'

export class PublicTestItemAPI {
  /** 获取某个通用测试项目组的测试项目 */
  public static async getList(groupId: number): Promise<PublicTestItem[]> {
    return await get(`${BASE_PATH}/list/${groupId}`)
  }

  /** 为通用测试项目组重新分配测试项目 */
  public static async reallocate(groupId: number, publicTestItems: PublicTestItem[]): Promise<PublicTestItem[]> {
    return await add(`${BASE_PATH}/reallocate/${groupId}`, publicTestItems)
  }
}
