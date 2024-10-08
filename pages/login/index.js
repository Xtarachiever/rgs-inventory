import Layout from '@/component/Layout'
import PasswordInput from '@/component/inputs/PasswordInput'
import TextInput from '@/component/inputs/TextInput'
import RgsIcon from '@/public/assets/RgsIcon'
import LoginHook from '@/hooks/LoginHook';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
    const router = useRouter()
    const { email, password, handleValueChange, handleSubmit,errors } = LoginHook();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () =>{
        setLoading(true)
        const status = await signIn('credentials',{
            callbackUrl:'/dashboard',
            redirect:false,
            email: email,
            password:password
        });
        setLoading(false)
        if(status.ok){
            router.push(status?.url);
            toast.success("Login Successful")
        }
        if(!status.ok){
            toast.error(status?.error || "Something went wrong")
        }
    }
  return (
    <div className='login_bg'>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white/50 max-w-[600px] m-auto w-[85%] sm:w-[60%] relative top-[100px] shadow-2xl rounded-sm py-10 p-4 text-center pt-10 ">
                <RgsIcon className="m-auto cursor-pointer" onClick={()=>router.push('/')}/>
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
                        {
                            loading ? 'Loading...' : 'Login'
                        }
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login