import React, { useEffect, useState } from 'react'
import Card from '../../components/Cards/Card';
import axios from 'axios';
import './Productlist.css'
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

export default function Productlist() {
    const [item, setItem] = useState([]);
    const [data, setData] = useState()
    const { state } = useLocation()
    const { type } = state;

    const getproduct = () => {
        axios.get('http://localhost:8080/api/product/getall')
            .then((e) => {
                // console.log(e.data)
                setItem(e.data.response)
            })
        console.log(item)
    }

    // const data = item.filter((data) => { data.producttype === "Home Appliances" })

    useEffect(() => {
        getproduct()
        // console.log("ss" + type)
        setData(type)
        // data
        // console.log(data)
    }, [])

    return (
        <>
            <Navbar />
            <div className="productcard-frames">
                <h2>Product List</h2>
                <div className="productcard-container">
                    <div className="productcard-holder">
                        {
                            (item) ? (
                                item
                                    .filter(item => item.producttype === data)
                                    .map((data) => {
                                        return (
                                            <Card id={data._id} image={data.image} name={data.name} price={data.price} key={data._id} />
                                        )
                                    })
                            )
                                : <h2>No item</h2>
                        }

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}
