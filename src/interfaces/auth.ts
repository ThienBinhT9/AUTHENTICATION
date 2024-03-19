//LOGIN

export interface IUser{
    [key: string] : any
}

export interface ILoginParams{
    email:string,
    password:string   
}

export interface IPropsLoginParams{
    onSubmit(values : ILoginParams) : void,
    loading:boolean,
    errMessage:string,
}

//REGISTER
export interface IRegisterParams{
    email:string,
    password:string,
    repeatPassword:string,
    name:string,
    gender:string,
    region: number | undefined,
    state: number | undefined,
}

export interface IGender{
    label:string,
    value:string
}

export interface ILocationParams{
    pid:number | null,
    id:number | undefined,
    name:string,
    createdAt:string
}

export interface IPropsRegisterParams{
    onSubmit(values : IRegisterParams) : void,
    onChange(value : number) : void,
    loading:boolean,
    errMessage:string,
    region:Array<ILocationParams>
    state:Array<ILocationParams>
}