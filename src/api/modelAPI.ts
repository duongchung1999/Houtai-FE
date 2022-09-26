import { get, add, update, del } from '@/utils/request'
import { Model } from '@/entity/model';

const BASE_PATH = "/models";

/**
 * a class that send request relevant to model
 * @version v2.0.0
 */
export class ModelAPI {
    /**
     * fetch model
     * @param userUk model ID or model name
     * @returns 
     */
    public static get(modelUk: string | number): Promise<Model> {
        return get(`${BASE_PATH}/${modelUk}`)
    }

    /**
     * fetch a list of models assigned to this user
     * @returns model list
     */
    public static async getList(userId: number): Promise<Model[]> {
        return await get(`${BASE_PATH}/list/${userId}`);
    }

    /**
     * delele model
     * @param model the model to delete for
     * @returns empty object
     */
    public static del(model: Model): Promise<Model> {
        return del(BASE_PATH, model);
    }

    /**
     * modify model
     * @param {Model} model the model to modify for
     * @returns modified model entity
     */
    public static async update(model: Model): Promise<Model> {
        return update(BASE_PATH, model);
    }

    /**
     * add model
     * @param {Model} model the model to add for
     * @returns added model entity
     */
    public static add(model: Model): Promise<Model> {
        return add(BASE_PATH, model);
    }

}