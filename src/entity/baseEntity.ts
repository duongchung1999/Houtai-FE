export class BaseEntity {
    /**
  * a boxing operation.
  * at runtime, objects using this method on self constructor can be correctly type checking by the instanceof operator 
  * @param o class instance
  * @param model boxing data
  */
    static converter<T>(o: T, data: any) {
        if (!data) return;
        if (typeof data !== 'object') {
            throw new Error(`[boxing waring] can not boxing ${data} to this type, the data must be an object`)
        }
        for (const key in o) {
            if (Object.prototype.hasOwnProperty.call(o, key)) {
                if (data[key] != undefined) {
                    o[key] = data[key]
                }
            }
        }
    }
}