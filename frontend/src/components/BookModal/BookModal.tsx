import { useEffect, useState } from 'react'
import { Book } from '../../types/Book'
import './BookModal.css'

interface Props {
  book?: Book
  onClose: () => void
  onSave: (data: FormData) => void
}

export default function BookModal({ book, onClose, onSave }: Props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const isFormValid =
    title.trim() !== '' && author.trim() !== '' && publishedDate !== '' && description.trim() !== '' && (imageFile !== null || imagePreview !== null)

  useEffect(() => {
    if (book) {
      setTitle(book.title || '')
      setAuthor(book.author || '')

      if (book.publishedDate) {
        const formattedDate = new Date(book.publishedDate).toISOString().slice(0, 10)
        setPublishedDate(formattedDate)
      } else {
        setPublishedDate('')
      }

      setDescription(book.description || '')
      setImagePreview(book.image || null)
      setImageFile(null)
    } else {
      setTitle('')
      setAuthor('')
      setPublishedDate('')
      setDescription('')
      setImagePreview(null)
      setImageFile(null)
    }
  }, [book])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isFormValid) return

    const formData = new FormData()

    formData.append('title', title)
    formData.append('author', author)
    formData.append('description', description)
    formData.append('publishedDate', publishedDate)

    if (imageFile) {
      formData.append('image', imageFile)
    }

    if (book?._id) {
      formData.append('_id', book._id)
    }

    onSave(formData)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSave}>
          <h2>{book ? 'Editar Livro' : 'Novo livro'}</h2>

          <div className="modal-grid">
            <div className="form">
              <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />

              <input placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />

              <input
                type={publishedDate ? 'date' : 'text'}
                placeholder="Data da publicação"
                max={new Date().toISOString().split('T')[0]}
                value={publishedDate}
                onFocus={(e) => (e.currentTarget.type = 'date')}
                onBlur={(e) => {
                  if (!publishedDate) {
                    e.currentTarget.type = 'text'
                  }
                }}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
            </div>

            <label className="image-upload">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <>
                  <span className="icon">
                    <img className="cover" src={'/no-image.svg'} alt="No cover available" />
                  </span>
                  <p>Escolher imagem</p>
                </>
              )}
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </label>

            <textarea className="description" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <footer>
            <button className="cancel" onClick={onClose}>
              Cancelar
            </button>
            <button className="primary" type="submit" disabled={!isFormValid}>
              Salvar
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}
