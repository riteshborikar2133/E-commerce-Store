import React, { useEffect, useState } from 'react'
import Card from '../Cards/Card'
import './CardHolder.css'
import axios from 'axios'
export default function CardHolder() {
    const [item, setItem] = useState();

    const getproduct = () => {
        axios.get('http://localhost:8080/api/product/getall')
            .then((e) => {
                console.log(e.data)
                setItem(e.data.response.reverse())
            })
    }

    useEffect((e) => {
        getproduct()
        console.log(item)
    }, [])

    return (
        <div className="card-frames">
            <h2>New Arriaval</h2>
            <div className="card-container">
                <div className="card-holder">
                    {
                        (item) ? (
                            item
                                .slice(0, 4)
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
    )
}
