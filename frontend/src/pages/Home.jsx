import React from 'react'
import FormPost from '../components/FormPost'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
export default function Home({master}) {
  return (
    <>
      <Header />
      <main className="home">
        <FormPost />
      </main>
      <Footer/>
    </>
  )
}
