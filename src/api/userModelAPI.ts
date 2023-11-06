import { UserModel } from '@/entity/userModel'
import { get, add } from '@/utils/request'

const BASE_PATH = '/user-models'

export class UserModelAPI {
  public static async getList(userId: number): Promise<UserModel[]> {
    return await get(`${BASE_PATH}/${userId}`)
  }

  public static async Reallocate(userModels: UserModel[]): Promise<UserModel[]> {
    return await add(`${BASE_PATH}/reallocate`, userModels)
  }
}
