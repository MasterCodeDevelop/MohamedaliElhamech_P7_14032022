import React from 'react'
import FormPost from '../components/FormPost'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Post from '../components/Post';
export default function Home({master}) {
  return (
    <>
      <Header />
      <main className="home">
        <FormPost master={master} />
        <div className="items">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
      </main>
      <Footer/>
    </>
  )
}
