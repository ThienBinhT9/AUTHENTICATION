import {HOST, HOST_2} from '../utils/constants.ts'

enum APIService{
    auth,
    protected,
    public
}

const getBaseUrl = (service: APIService, host:string) => {
    if(service === APIService.auth) return `${host}/auth`
    else if(service === APIService.protected) return `${host}/protected`
    else if(service === APIService.public) return `${host}`

    return ""
}

export let API_PATHS = {
    login: `${getBaseUrl(APIService.auth, HOST)}/login`,
    register: `${getBaseUrl(APIService.auth, HOST_2)}/register`,
    location:`${getBaseUrl(APIService.public, HOST_2)}/location`
}
