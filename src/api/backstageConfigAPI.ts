import { get, update } from '@/utils/request'
import { BackstageConfig } from '@/entity/bakcstageConfig'

const BASE_PATH = '/backstage-configurations'

export class BackstageConfigAPI {
  public static getKeyList(): Promise<Array<BackstageConfig>> {
    return get(`${BASE_PATH}/keys`)
  }

  public static get(key: string): Promise<BackstageConfig> {
    return get(`${BASE_PATH}/${key}`)
  }

  public static async update(config: BackstageConfig): Promise<BackstageConfig> {
    return update(`${BASE_PATH}`, config)
  }
}
