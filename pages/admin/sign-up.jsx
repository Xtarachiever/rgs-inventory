import Layout from '@/component/Layout'
import PasswordInput from '@/component/inputs/PasswordInput'
import TextInput from '@/component/inputs/TextInput'
import SignUpHook from '@/hooks/SignUp'
import RgsIcon from '@/public/assets/RgsIcon';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const {handleValueChange, handleSubmit, email, lastName, firstName, password, confirmPassword, errors} = SignUpHook();
    const [loading, setLoading] = useState(false);

    const route = useRouter();
    const onSubmit = async (values) =>{
        try{
            setLoading(true)
            const res = await fetch('/api/auth/admin/sign-up',{
                method:"POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email:values.email,
                    firstName:values.firstName,
                    lastName:values.lastName,
                    password:values.password
                })
            })
            setLoading(false)
            const data = await res.json();
            if(!data?.status){
                toast.error(data?.message)
            }else{
                toast.success('Registered Successfully')
                route.push('/login')
            }
        }catch(err){
            toast.error(err?.message);
            console.log(err?.message)
        }
    }
  return (
    <Layout>
        <ToastContainer />
        <div className="max-w-[700px] m-auto mt-5 bg-white shadow-xl p-6 py-10 border-primary border text-center">
            <RgsIcon className="m-auto"/>
            <form className="w-[90%] m-auto" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextInput placeholder={'First Name'} value={firstName} onChange={(e)=>handleValueChange('firstName',e.target.value)} name={'firstName'}/>
                    {errors?.firstName && <p className="text-red-500">{errors?.firstName?.message}</p>}
                </div>
                <div>
                    <TextInput placeholder={'Last Name'} value={lastName} onChange={(e)=>handleValueChange('lastName',e.target.value)} name={'lastName'}/>
                    {errors?.lastName && <p className="text-red-500">{errors?.lastName?.message}</p>}
                </div>
                <div>
                    <TextInput placeholder={'Email'} value={email} onChange={(e)=>handleValueChange('email',e.target.value)} name={'email'}/>
                    {errors?.email && <p className="text-red-500">{errors?.email?.message}</p>}
                </div>
                <div>
                    <PasswordInput placeholder={'Password'} value={password} onChange={(e)=>handleValueChange('password',e.target.value)} name={'password'}/>
                    {errors?.password && <p className="text-red-500">{errors?.password?.message}</p>}
                </div>
                <div className="pb-5">
                    <PasswordInput placeholder={'Confirm Password'} value={confirmPassword} onChange={(e)=>handleValueChange('confirmPassword',e.target.value)} name={'confirmPassword'}/>
                    {errors?.confirmPassword && <p className="text-red-500">{errors?.confirmPassword?.message}</p>}
                </div>
                <button className="px-6 py-2 bg-primary text-white" type="submit">
                    {
                        loading ? 'Loading...' : 'Sign Up'
                    }
                </button>
            </form>
        </div>
    </Layout>
  )
}

export default SignUp