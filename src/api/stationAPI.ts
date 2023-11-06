import { get, add, update, del } from '@/utils/request'
import { Model } from '@/entity/model'
import { Station } from '@/entity/station'

const BASE_PATH = '/models'

/**
 * a class that send request relevant to station
 * @version v2.0.0
 */
export class StationAPI {
  /**
   * fetch station
   * @param modelSlug [string]: a name of the model that owned this station | [number]: a id of the model that owned this station
   * @param stationSlug string: station name | number: station id
   * @returns
   */
  public static get(modelSlug: string | number, stationSlug: string | number): Promise<Station> {
    return get(`${BASE_PATH}/${modelSlug}/stations/${stationSlug}`)
  }

  /**
   * fetch a list of stations owned by a model
   * @param modelId [string]: a name of the model that owned this station | [number]: a id of the model that owned this station
   * @returns a list of stations
   */
  public static async getList(modelId: number | string): Promise<Station[]> {
    return await get(`${BASE_PATH}/${modelId}/stations`)
  }

  /**
   * delete an staion owned by a model
   * @param modelId a id of the model that owned this station
   * @param station [Station]: a station entity that carrying a station id | [number]: station id
   * @returns empty object
   */
  public static del(modelId: number, station: Station | number): Promise<Station> {
    const stationId = station instanceof Station ? station.id : station
    return del(`${BASE_PATH}/${modelId}/stations`, { id: stationId })
  }

  /**
   * modify station
   * @param modelId a id of the model that owned this station
   * @param station station entity
   * @returns modified station
   */
  public static async update(modelId: number, station: Station): Promise<Station> {
    return update(`${BASE_PATH}/${modelId}/stations`, station)
  }

  /**
   * add an station to a model
   * @param modelId a id of the model you want to add
   * @param station station
   * @returns added station
   */
  public static add(modelId: number, station: Station): Promise<Model> {
    return add(`${BASE_PATH}/${modelId}/stations`, station)
  }
}
