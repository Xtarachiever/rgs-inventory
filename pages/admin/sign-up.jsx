import SelectInput from '@/component/inputs/SelectInput';
import TextInput from '@/component/inputs/TextInput'
import SignUpHook from '@/hooks/SignUp'
import RgsIcon from '@/public/assets/RgsIcon';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import { IoArrowBackOutline } from "react-icons/io5";

const SignUp = () => {
    const {handleValueChange, handleSubmit, email, lastName, firstName, errors} = SignUpHook();
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
                    role:values.role
                })
            })
            setLoading(false)
            const data = await res.json();
            if(!data?.status){
                toast.error(data?.message)
            }else{
                toast.success('Success. Check email to complete registration')
                setTimeout(()=>{
                    route.push('/login')
                },1000)
            }
        }catch(err){
            toast.error(err?.message);
            console.log(err?.message)
        }
    }
  return (
    <div className='pt-[50px] login_bg'>
        <ToastContainer />
        <p className='text-white px-10 flex items-center cursor-pointer' onClick={()=>route.push('/dashboard')}><IoArrowBackOutline className='mr-2'/>Back</p>
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
                <div className='py-2 mb-3'>
                    <SelectInput defaultName={'Role'} options={['Manager','Admin']} name={'role'} onChange={(e)=>handleValueChange('role',e.target.value)}/>
                    {errors?.role && <p className="text-red-500">{errors?.role?.message}</p>}
                </div>
                <button className="px-6 py-2 bg-primary text-white" type="submit">
                    {
                        loading ? 'Loading...' : 'Sign Up'
                    }
                </button>
            </form>
        </div>
    </div>
  )
}

export default SignUp

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
  
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }else if (session && session?.user?.role !== 'Admin'){
        return {
            redirect: {
              destination: "/dashboard",
              permanent: false,
            },
          };
    }
    return {
      props: { session },
    };
}