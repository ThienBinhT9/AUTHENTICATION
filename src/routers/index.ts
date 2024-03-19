//Page
import Login from '../modules/Auth/pages/Login.tsx'
import Register from '../modules/Auth/pages/Register.tsx'
import Home from '../modules/Home/pages/index.tsx'
import Contact from '../modules/Contact/pages/index.tsx'

//Layout
import AuthLayout from '../layouts/AuthLayout/index.tsx'
import MainLayout from '../layouts/MainLayout/index.tsx'


const routers = [
    {path:"/register", element:Register, layout:AuthLayout},
    {path:"/login", element:Login, layout:AuthLayout},
    {path:"/", element:Home, layout:MainLayout},
    {path:"/contact", element:Contact, layout:MainLayout},
]

export default routers
