import { get, add, del } from '@/utils/request'
import { StationTestItem } from '@/entity/stationTestItem'

function BASE_PATH(routerParam: string | number) {
  return `/models/stations/${routerParam}/test-items`
}

/**
 * relevant request that test item of station
 */
export class StationTestItemAPI {
  /**
   * fetch list of test items for the station
   * @param modelUk [string] name of model that has the station | [number] id of model that has the station
   * @param stationUk [string] name of station that has the test items | [number] id of station that has the test items
   * @returns
   */
  public static async getList(modelUk: string | number, stationUk: string | number): Promise<StationTestItem[]> {
    return await get(`/models/${modelUk}/stations/${stationUk}/test-items`)
  }

  /**
   * remove old test items and distribute new test items
   * @param stationId id of station that has the test items
   * @param items list of test item of to be redistributed(set the test order in the order in the array)
   * @returns a list of test item on this station
   */
  public static async distribute(stationId: number, items: StationTestItem[]): Promise<StationTestItem[]> {
    return await add(`/models/stations/${stationId}/test-items/distribute`, items)
  }

  /**
   * delete the all test items of the station
   * @param stationId stationId of the station
   * @returns
   */
  public static async delAll(stationId: number): Promise<void> {
    await del(`${BASE_PATH(stationId)}/test-items/all`)
  }
}
