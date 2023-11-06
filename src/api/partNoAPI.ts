import { get, add, update, del } from '@/utils/request'
import { PartNo } from '@/entity/partNo'
import { PartNoConfig } from '@/entity/partNoConfig'

const BASE_PATH = '/part-nos'

export class PartNoAPI {
  /**
   * 获取料号配置对应的料号列表
   * @param partNoConfigID 料号配置Id
   * @returns
   */
  static getList(partNoConfigID: number): Promise<PartNo[]> {
    return get(`${BASE_PATH}/list/${partNoConfigID}`)
  }

  /**
   * 更新料号
   * @param PN 料号
   * @returns
   */
  static update(PN: PartNo): Promise<PartNo> {
    return update(BASE_PATH, PN)
  }

  /**
   * 添加料号
   * @param PN 料号
   * @returns
   */
  static add(PN: PartNo): Promise<PartNo> {
    return add(BASE_PATH, PN)
  }

  /**
   * 删除料号
   * @param PNId 料号Id
   * @returns
   */
  static del(PNId: number): Promise<void> {
    return del(`${BASE_PATH}/${PNId}`)
  }

  /**
   * 获取料号配置列表（包含ID和标题）
   * @returns 料号配置列表
   */
  static getPartNoConfigList(modelId: number): Promise<PartNoConfig[]> {
    return get(`${BASE_PATH}/part-no-config-list/${modelId}`)
  }

  /**
   * 根据ID获取料号配置
   * @param id
   * @returns
   */
  static getPartNoConfig(id: number): Promise<PartNoConfig> {
    return get(`${BASE_PATH}/part-no-config/${id}`)
  }

  /**
   * 添加料号配置
   * @param partNoConfig
   * @returns
   */
  static addPartNoConfig(partNoConfig: PartNoConfig): Promise<PartNoConfig> {
    return add(`${BASE_PATH}/part-no-config`, partNoConfig)
  }

  /**
   * 更新料号配置
   * @param partNoConfig
   * @returns
   */
  static updatePartNoConfig(partNoConfig: PartNoConfig): Promise<PartNoConfig> {
    return update(`${BASE_PATH}/part-no-config`, partNoConfig)
  }

  /**
   * 删除料号配置
   * @param id
   * @returns
   */
  static deletePartNoConfig(id: number): Promise<void> {
    return del(`${BASE_PATH}/part-no-config/${id}`)
  }
}
