import React from 'react'
import './OfferGallery.css'
export default function OfferGallery() {
    return (
        <div className="og-frame">
            <h2>Latest Deal</h2>

            <div className='og-container'>
                <div className="og-big">
                    <img src="https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg" alt="" />
                </div>
                <div className="og-small">
                    <div className="og-small-img">
                        <img src="https://profit.pakistantoday.com.pk/wp-content/uploads/2023/07/pp.jpg" alt="" />
                        <img src="https://fdn.gsmarena.com/imgroot/static/headers/makers/oneplus-2023-1.jpg" alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}
