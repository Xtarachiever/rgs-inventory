import { useEffect, useState } from "react";

const useAllDetailsHook = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const getAllDetails = async () =>{
        try{
            setLoading(true)
            const res = await fetch('/api/combined-details',{
                method:'GET'
            });
            setLoading(false)
            if(res?.ok){
                const data = await res.json();
                setData(data?.data)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getAllDetails()
    },[])
    return{
        data,
        allDetailsLoading:loading
    }
}

export default useAllDetailsHook;