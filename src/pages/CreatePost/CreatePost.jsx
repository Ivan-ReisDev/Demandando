import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useState } from 'react'

//css
import style from './createPost.module.css'

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('')

    try {
      new URL(image)

    } catch (error) {
     return setFormError("A imagem precisa ser uma URL.")
    }

    if (formError) return

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body || !tags) {
      setFormError("Por favor preencha todos os campos.")

    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    navigate('/')

  }
   



  

  return (
    <div className={style.newPost}>

      <h1>Criar Post</h1>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <div className='input'>
          <label>Título</label>
          <input type="text"
            placeholder='Pense num bom título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
        </div>

        <div className='input'>
          <label>URL da imagem</label>
          <input type="text" placeholder='Insira uma imagem que representa seu post'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required />
        </div>

        <div className='input'>
          <label>Conteúdo</label>
          <textarea
            name="body"
            id="body"
            value={body}
            placeholder='Insira o conteúdo do post'
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>

        <div className='input'>
          <label>Tags</label>
          <input type="text" placeholder='Insira tags separadas por vírgulas'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        {!response.loading && <button >Postar</button>}
        {response.loading && <button className='btnDisabled' disabled>Aguarde...</button>}

        {response.error ? <p className='MsgError'>{response.error}</p> : ''}
        {formError ? <p className='MsgError'>{formError}</p> : ''}
      </form>
    </div>
  )
}

export default CreatePost