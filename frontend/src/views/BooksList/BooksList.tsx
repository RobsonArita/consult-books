import { useEffect, useState } from 'react'
import { Book } from '../../types/Book'
import { bookService } from '../../services/bookService'
import BookCard from '../../components/BookCard/BookCard'
import BookModal from '../../components/BookModal/BookModal'
import './BooksList.css'

export default function BooksList() {
  const [books, setBooks] = useState<Array<Book>>([])
  const [filteredBooks, setFilteredBooks] = useState<Array<Book>>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await bookService.list()
        setBooks(data)
        setFilteredBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBooks(books)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = books.filter((book) => book.title?.toLowerCase().includes(term) || book.author?.toLowerCase().includes(term))
    setFilteredBooks(filtered)
  }, [searchTerm, books])

  const handleBookCreated = async (data: FormData) => {
    await bookService.create(data)

    const books = await bookService.list()
    setBooks(books)
    setFilteredBooks(books)
  }

  return (
    <div className="books-page">
      <header className="books-header">
        <div className="header-left">
          <h1>Livros</h1>

          <button className="new-button" onClick={() => setOpenModal(true)}>
            Novo
          </button>
        </div>

        <div className="search-wrapper">
          <input type="search" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />

          <img src="/lupe.svg" alt="Buscar" className="search-icon" />
        </div>
      </header>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}

        {filteredBooks.length === 0 && searchTerm && <p className="no-results">Nenhum livro encontrado com "{searchTerm}"</p>}
      </div>

      {openModal && <BookModal onClose={() => setOpenModal(false)} onSave={handleBookCreated} />}
    </div>
  )
}
