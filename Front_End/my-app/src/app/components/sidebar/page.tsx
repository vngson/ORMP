'use client'
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from "./page.module.css"
import React from "react";
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/apiRequests";
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);

type Action = {
    title: string;
    to: string;
};
 
type StaticImageData = /*unresolved*/ any  

type MyComponentProps = {
    author: string
    page_path: string,
    LIST_ACTION: Action[],
    avt: StaticImageData,
  };



export default function Sidebar({author, page_path, LIST_ACTION, avt}: MyComponentProps) {
    // const dispatch=useDispatch()
  
    // const router = useRouter()
    // const handleLogoutBtn= () =>{
    //     logOut(dispatch);
    //     router.push("/login")
    // }
    const handleClassname = (path:string) => {
        if(page_path===path)
            return 'sidebar-acction__btn-active'
        else
            return 'sidebar-acction__btn'
    }
    const dispatch = useDispatch()
    const handleLogoutbtn=()=>{
        logOut(dispatch)
    }
    return  (<div className={cx('sidebar')}>
        <div className={cx('sidebar-wrapper')}>
            <div className={cx('sidebar-account__info')}>
                <Image src={avt}  alt='avt' className={cx('sidebar-account__avt')}/>
                <label 
                    htmlFor="sidebar-account__name" 
                    className={cx("sidebar-label")}
                >
                    {author}
                </label>
                <div className={cx("sidebar-account__line")}></div>
            </div> 
            <div className={cx('sidebar-acction')}>
            {LIST_ACTION.map((action, index) =>{
                return (
                    <Link href={action.to} key={index}>
                        <button className={cx(handleClassname(action.to.toString()))}>
                          {action.title}
                        </button>
                    </Link>
                  );
            })}
            </div>
            <Link href="/login" >
                <button className={cx('sidebar__logout-btn') } onClick={()=>handleLogoutbtn()} >Đăng xuất</button>
            </Link>          
        </div>
    </div>) ;
}