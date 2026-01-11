import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Book } from '../../types/Book'
import { bookService } from '../../services/bookService'
import BookModal from '../../components/BookModal/BookModal'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import './BookDetails.css'

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [book, setBook] = useState<Book | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  useEffect(() => {
    if (!id) return

    bookService.getById(id).then((data) => {
      if (!data) {
        navigate('/')
        return
      }
      setBook(data)
    })
  }, [id, navigate])

  function handleUpdate(formData: FormData) {
    if (!book) return

    const id = book._id

    bookService
      .update(id, formData)
      .then(async () => {
        const updated = await bookService.getById(id)
        setBook(updated)
        setIsEditOpen(false)
      })
      .catch((error) => {
        console.error('Erro ao atualizar livro:', error)
      })
  }

  function handleDelete() {
    if (!book) return
    bookService.delete(book._id)
    navigate('/')
  }

  if (!book) return <p>Carregando...</p>

  return (
    <div className="book-details">
      <header className="details-header">
        <button className="back" onClick={() => navigate(-1)}>
          <img src="/arrow-back.svg" alt="Voltar" />
          Voltar
        </button>

        <div className="actions">
          <button className="edit" onClick={() => setIsEditOpen(true)}>
            Editar
          </button>
          <button className="delete" onClick={() => setIsDeleteOpen(true)}>
            Excluir
          </button>
        </div>
      </header>

      <div className="details-content">
        <div className="text">
          <h1>{book.title}</h1>

          <div className="meta">
            <span className="bold">Por {book.author}</span>
            <span className="bold">Publicado em {new Date(book.publishedDate).toLocaleDateString('pt-BR')}</span>
          </div>

          <p className="description-details">{book.description}</p>
        </div>

        <div className="cover-wrapper">
          <img className="cover" src={book.image || '/no-image.svg'} alt={book.title} />
        </div>
      </div>

      {isEditOpen && <BookModal book={book} onClose={() => setIsEditOpen(false)} onSave={handleUpdate} />}

      {isDeleteOpen && <DeleteModal title={book.title} onCancel={() => setIsDeleteOpen(false)} onConfirm={handleDelete} />}
    </div>
  )
}
