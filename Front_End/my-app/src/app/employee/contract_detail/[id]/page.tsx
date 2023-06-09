'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/app/api/bareURL';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import avatar from "@/assets/images/omrp_logo_white.png"
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const actions = [
    {
        title: 'Hổ trợ khách hàng',
        to: '/employee/customer_support',
    },
    {
        title: 'Quản lý đối tác',
        to: '/employee/manage_partner',
    },
    {
        title: 'Quản lý hợp đồng',
        to: '/employee/manage_contract',
    },
]

type ContractData = {
    ID_CONTRACT: string;
    "Mã số thuế": string;
    "Ngày lập HĐ": string;
    "Ngày hết HĐ": string;
    "Đơn vị đổi": number;
    "% giao dịch": number;
    "Tên doanh nghiệp": string;
    "Số điện thoại": string;
    Email: string;
    Image: string;
  };
  
  type ApiResponse = {
    message: string;
    contract: ContractData;
  };

const cx = classNames.bind(styles);
function ContractDetail() {
    const [contract, setContract] = useState<ContractData | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams(); // get the search params object
    const id = searchParams.get("id"); // get the value of id
    useEffect(() => {
    async function fetchData() {
        const response = await axios.get<ApiResponse>(
            `${baseURL}/employee/contract/${id}`
        );
        setContract(response.data.contract);
    }
    fetchData();
    }, []);
    
    const user=useSelector((state:any)=> state.auth.login.currentUser)

    const cusID = user?.user?.userId
    const permiss = user?.user?.permission;
    const pms : number = Number(permiss);
    
    if (pms !== 4) {
        return (  <div > <label> You do not have permission to access this page </label></div>)}
    else if(!contract) {
      return <div>Loading...</div>;
    } 
    else {
        return ( <div className={cx('contract')}>
        <div className={cx('contract-wrapper')}>
        <Header name_view='Nhân viên'/>
        <div className={cx('contract-middle')}>
            <div className={cx('contract-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/employee/manage_contract' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('contract-container')}>
                    <div className={cx('contract-title')}>
                        <label 
                                htmlFor="contract-title" 
                                className={cx("contract-title__label")}
                            >
                                HỢP ĐỒNG 
                        </label>
                    </div>
                    <div className={cx('contract-ID')}>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label1")}
                            >
                                Mã hợp đồng 
                        </label>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label2")}
                            >
                                {contract.ID_CONTRACT} 
                        </label>
                    </div>
                    <div className={cx('contract-content')}>
                        <div className={cx('contract-topic')}>
                            <label 
                                htmlFor="info-title__contract_name" 
                                className={cx("contract__label")}
                            >
                                Tên doanh nghiệp 
                            </label>
                            <label 
                                htmlFor="info-title__Tax_code" 
                                className={cx("contract__label")}
                            >
                                Mã số thuế 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label")}
                            >
                                Số điện thoại 
                            </label>  
                            <label 
                                htmlFor="info-title__email" 
                                className={cx("contract__label")}
                            >
                                Email 
                            </label> 
                            <label 
                                htmlFor="info-title__date_contract" 
                                className={cx("contract__label")}
                            >
                                Ngày lập hợp đồng 
                            </label> 
                            <label 
                                htmlFor="info-title__contract_term" 
                                className={cx("contract__label")}
                            >
                                Ngày hết hạn hợp đồng 
                            </label> 
                            <label 
                                htmlFor="info-title__conversion_rate" 
                                className={cx("contract__label")}
                            >
                                Tỉ lệ quy đổi điểm 
                            </label> 
                            <label 
                                htmlFor="info-title__commission" 
                                className={cx("contract__label")}
                            >
                                Phí hoa hồng 
                            </label>   
                        </div>
                        <div className={cx('contract-info')}>
                        <label 
                                htmlFor="info-title__contract_name" 
                                className={cx("contract__label")}
                            >
                                {contract['Tên doanh nghiệp']}  
                            </label>
                            <label 
                                htmlFor="info-title__Tax_code" 
                                className={cx("contract__label")}
                            >
                            {contract['Mã số thuế']} 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label")}
                            >
                                {contract['Số điện thoại']}   
                            </label>  
                            <label 
                                htmlFor="info-title__email"  
                                className={cx("contract__label")}
                            >
                                {contract.Email} 
                            </label> 
                            <label 
                                htmlFor="info-title__date_contract" 
                                className={cx("contract__label")}
                            >
                                {new Date(contract["Ngày lập HĐ"]).toLocaleDateString()}
                            </label> 
                            <label 
                                htmlFor="info-title__contract_term" 
                                className={cx("contract__label")}
                            >
                                {new Date(contract["Ngày hết HĐ"]).toLocaleDateString()}
                            </label> 
                            <label 
                                htmlFor="info-title__conversion_rate" 
                                className={cx("contract__label")}
                            >
                                {contract['Đơn vị đổi']} 
                            </label>  
                            <label 
                                htmlFor="info-title__commission" 
                                className={cx("contract__label")}
                            >
                                30% 
                            </label>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> )}
    
}

export default ContractDetail;