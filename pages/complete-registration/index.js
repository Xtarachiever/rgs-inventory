import PasswordInput from '@/component/inputs/PasswordInput'
import ConfirmPasswordHook from '@/hooks/ConfirmPasswordHook'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import RgsIcon from '@/public/assets/RgsIcon';
import { useRouter } from 'next/router';
const CompleteRegistration = () => {
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const { handleSubmit, handleValueChange, confirmPassword, password, errors } = ConfirmPasswordHook()

    const onSubmit = async (values) =>{
        try{
            setLoading(true)
            const email = route?.query?.email?.replace(/ /g, '+');
            const data={
                password:values.password,
                email: decodeURIComponent(email)
            }
            console.log(data?.email)
            const res = await fetch('/api/auth/admin/register',{
                method:'POST',
                body: JSON.stringify(data),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            setLoading(false);
            const resData = await res.json()
            if(resData?.status){
                route.push('/login');
                toast.success(resData?.message)
            }
            console.log(resData)

        }catch(err){
            console.log(err?.message)
        }
    }
  return (
    <div className='login_bg'>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white/50 max-w-[600px] m-auto w-[85%] sm:w-[60%] relative top-[100px] shadow-2xl rounded-sm py-10 p-4 text-center pt-10 ">
                <RgsIcon className="m-auto cursor-pointer" onClick={()=>router.push('/')}/>
                <div className="w-[80%] m-auto">
                    <div className="pt-5 text-left">
                        <p className=''>Password</p>
                        <PasswordInput placeholder={'Password'} value={password} name={'password'} onChange={(e)=>handleValueChange('password',e.target.value)} />
                        {errors?.password && <p className="text-red-500">{errors?.password?.message}</p>}
                    </div>
                    <div className="py-5 text-left">
                        <p>Confirm Password</p>
                        <PasswordInput placeholder={'Confirm Password'} name={'confirmPassword'} value={confirmPassword} onChange={(e)=>handleValueChange('confirmPassword',e.target.value)}/>
                        {errors?.confirmPassword && <p className="text-red-500">{errors?.confirmPassword?.message}</p>}
                    </div>
                    <button className="px-6 py-2 bg-primary text-white" type="submit">
                        {
                            loading ? 'Loading...' : 'Submit'
                        }
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CompleteRegistration