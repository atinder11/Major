import React from 'react'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'

function AmazonAnalsis() {
  return (
    <>
        <Header/>
        <br />
      <br />
      <div className="mt-4 flex justify-center">
  <h1 className="text-2xl flex items-center gap-2 font-bold">
    Enter The Product Link:
  </h1>
</div>
      <br />
        <SearchBar/>

        <br />
        <div className="flex justify-center">
  <a href="./seller" target="_blank" rel="noopener noreferrer">
    <button className="btn btn-primary">Go to dashboard</button>
  </a>
</div>
      <br />
      <br />

        <Footer/>


    </>
  )
}

export default AmazonAnalsis
