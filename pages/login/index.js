import Layout from '@/component/Layout'
import PasswordInput from '@/component/inputs/PasswordInput'
import TextInput from '@/component/inputs/TextInput'
import RgsIcon from '@/public/assets/RgsIcon'
import LoginHook from '@/hooks/LoginHook';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter()
    const { email, password, handleValueChange, handleSubmit,errors } = LoginHook();

    const onSubmit = async (values) =>{
        const status = await signIn('credentials',{
            callbackUrl:'/dashboard',
            redirect:false,
            email: values.email,
            password:values.password
        });
        if(status.ok){
            router.push(status?.url);
            toast.success("Login Successful")
        }
        if(!status.ok){
            toast.error(status?.error || "Something went wrong")
        }
    }
  return (
    <Layout>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white max-w-[600px] m-auto w-[60%] shadow-2xl m-auto rounded-sm py-10 p-4 text-center mt-10 border-primary border">
                <RgsIcon className="m-auto"/>
                <div className="w-[80%] m-auto">
                    <div className="pt-5">
                        <TextInput placeholder={'Email'} value={email} onChange={(e)=>handleValueChange('email',e.target.value)} name={email}/>
                        {errors?.email && <p className="text-red-500">{errors?.email?.message}</p>}
                    </div>
                    <div className="py-5">
                        <PasswordInput placeholder={'Password'} name={password} value={password} onChange={(e)=>handleValueChange('password',e.target.value)}/>
                        {errors?.password && <p className="text-red-500">{errors?.password?.message}</p>}
                    </div>
                    <button className="px-6 py-2 bg-primary text-white" type="submit">
                        Login
                    </button>
                </div>
            </div>
        </form>
    </Layout>
  )
}

export default Login