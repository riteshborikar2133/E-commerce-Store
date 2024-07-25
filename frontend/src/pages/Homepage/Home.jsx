import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ImageSwiper from '../../components/Swiper/ImageSwiper'
import Card from '../../components/Cards/Card'
import OfferGallery from '../../components/OfferGallery/OfferGallery'
import Heading from '../../components/Heading/Heading'
import Category from '../../components/Category/Category'
import CardHolder from '../../components/Card-Holder/CardHolder'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <ImageSwiper />

      <CardHolder />
      {/* <Heading heading="Top Category" /> */}
      <Category />

      {/* <Heading heading="Top Deals" /> */}

      {/* <Heading heading="Latest Deals" /> */}
      <OfferGallery />
      <Footer />
    </>
  )
}
