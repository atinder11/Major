import React from 'react'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'

function YoutubeAnalysis() {
  return (
    <>
    <Header/>
    <br />
    <div className="mt-4 flex justify-center">
  <h1 className="text-2xl flex items-center gap-2 font-bold">
    Enter The YouTube Link:
  </h1>
</div>

      <br />
      <br />
    <SearchBar/>

    <br />
    {/*
    <button className="btn btn-success">Go to dashboard</button>
    */}
    
      <br />
      <br />
    <Footer/>

    


    </>
  )
}

export default YoutubeAnalysis
