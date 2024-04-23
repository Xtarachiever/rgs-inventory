import Layout from '@/component/Layout'
import PasswordInput from '@/component/inputs/PasswordInput'
import TextInput from '@/component/inputs/TextInput'
import RgsIcon from '@/public/assets/RgsIcon'
import React from 'react'

const Login = () => {
  return (
    <Layout>
        <div className="bg-white max-w-[600px] m-auto w-[60%] shadow-2xl m-auto rounded-sm py-10 p-4 text-center mt-10 border-primary border">
            <RgsIcon className="m-auto"/>
            <div className="w-[80%] m-auto">
                <div className="pt-5">
                    <TextInput placeholder={'Email'}/>
                </div>
                <div className="py-5">
                    <PasswordInput placeholder={'Password'}/>
                </div>
                <button className="px-6 py-2 bg-primary text-white">
                    Login
                </button>
            </div>
        </div>
    </Layout>
  )
}

export default Login