import {ILoginParams, IRegisterParams} from '../interfaces/auth'

export const validEmpty = (values: IRegisterParams | ILoginParams) => {
    
    for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          const value = values[key];
          if(!value.trim()) return false
        }
    }

    return true
}