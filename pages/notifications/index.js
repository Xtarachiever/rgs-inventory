import Layout from '@/component/Layout'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LiaUserCheckSolid } from "react-icons/lia";
import Paginate from '@/component/pagination/Paginate';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([])
    const [loading, setLoading] = useState(false);
    const [itemsOffSet, setItemOffset] = useState(0)

    const limit = 5
    const endItemOffSet = itemsOffSet + limit;

    const currentItems = notifications.slice(itemsOffSet, endItemOffSet);

    useEffect(()=>{
        setFilteredNotifications(notifications)
    },[notifications])

    const convertDate = (dateString) =>{
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options)
    }

    const fetchNotifications = async () =>{
        try{
            setLoading(true)
            const res = await fetch('/api/notifications',{
                method:"GET"
            })
            setLoading(false)
            if(res?.ok){
                const data = await res.json();
                if(data?.status){
                    setNotifications(data?.notifications);
                    toast.success(data?.message)
                }
            }
        }catch(err){
            console.log(err?.message)
        }
    }

    useEffect(()=>{
        fetchNotifications()
    },[])
  return (
    <Layout>
        <div>
            <p className='text-lg'>Notifications</p>
            {
                loading ? <div className='loader'></div>
                :
                filteredNotifications?.length !== 0 ?
                <div>
                    {
                        currentItems?.map(({message,_id,createdAt,updatedAt})=>(
                            <div key={_id} className='bg-brightGreen p-4 my-2 flex gap-[20px] items-center w-auto'>
                                <LiaUserCheckSolid fontSize={'1.5rem'}/>
                                <div>
                                    <p>{message}</p>
                                    <p><span>Created At:</span> {convertDate(createdAt)}</p>
                                    <p><span>Updated At:</span> {convertDate(updatedAt)}</p>
                                </div>
                            </div>
                        ))
                    }
                    <Paginate items={filteredNotifications} limit={limit} setItemOffset={setItemOffset} totalItems={notifications?.length}/>
                </div>
                :
                <div>No notifications found</div>
            }
        </div>
    </Layout>
  )
}

export default Notifications