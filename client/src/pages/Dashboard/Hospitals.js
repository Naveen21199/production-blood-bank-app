import React, { useEffect, useState } from 'react'
import Layout from './../../components/shared/Layout/Layout';
import moment from 'moment';
import API from '../../services/API';

const Hospitals = () => {
    const [data, setData] = useState([])
    //find donar records
    const getDonars = async () => {
        try {
            const { data } = await API.get('/inventory/get-hospitals')
            // console.log(data)
            if (data?.success) {
                setData(data?.organisations)
            }
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getDonars();
    }, [])
    return (
        <div>
            <Layout>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email Type</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(record => (
                            <tr key={record._id}>
                                <td>{record.hospitalName}</td>
                                <td>{record.email}</td>
                                <td>{record.phone}</td>
                                <td>{record.address}</td>
                                <td>
                                    {moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    );
}

export default Hospitals
