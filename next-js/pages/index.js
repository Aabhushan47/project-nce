import axios from 'axios'
import { useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [posts,setPosts] =useState()
  const[id,setId]=useState('')
  const[product,setProduct]=useState('')
  const[author,setAuthor]=useState('')
  
  
  
  const getPosts = async() => {
    const response = await axios.get('http://localhost:8000/posts')
    setPosts(response.data) 
  }
  useEffect(() => {
    getPosts()
  },[])
  console.log(posts)
  const postUsers = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8000/posts' ,{ id,product,author })
    await  getPosts()
    
  }

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={postUsers}>
          <input onChange={(e) => setId(e.target.value)} value={id} placeholder='id'/>
          <input onChange={(e) => setProduct(e.target.value)} value={product}placeholder='product'/>
          <input onChange={(e) => setAuthor(e.target.value)} value={author} placeholder='author'/>
          <input type='submit'/>

        </form>
      </div>
      <div>
      {posts?.map((post,i) => {
        return(
        <div key={i}>
          <h1>
          {post.id}
          </h1>
          <h2>{post.product}</h2>
          <h3>{post.author}</h3>
          <hr />
          </div>
      )
    })}
      </div>
    </div>
  )
}
