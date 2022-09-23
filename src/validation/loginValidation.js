import {object,string} from 'yup'


const loginVal = object(
    {
        email:string().required("Email daxil edin").min(3),
        password:string().required("Sifre daxil edin").min(3)
    }
)


export default loginVal