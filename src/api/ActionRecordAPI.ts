import { ActionRecord } from '@/entity/ActionRecord'
import { PageList } from '@/entity/pageList'
import { get } from '@/utils/request'

const BASE_PATH = '/action-records'

/** 操作记录搜索选项 */
export class ActionRecordSearchOptions {
  keywords?: string = null
  name?: string = null
  operatorName?: string = null
  startDate?: Date = null
  endDate?: Date = null
  pageIndex: number = null
  pageSize: number = null
}

export class ActionRecordAPI {
  public static async search(options: ActionRecordSearchOptions): Promise<PageList<ActionRecord>> {
    return await get(`${BASE_PATH}/search`, options)
  }

  public static async getOperatorOptions(): Promise<string[]> {
    return await get(`${BASE_PATH}/operator-options`)
  }

  public static async getActionOptions(): Promise<string[]> {
    return await get(`${BASE_PATH}/action-options`)
  }
}
