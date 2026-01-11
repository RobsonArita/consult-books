import { Book } from '../../types/Book'
import { useNavigate } from 'react-router-dom'
import './BookCard.css'

interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/books/${book._id}`)
  }

  return (
    <div className="book-card" onClick={handleClick}>
      <div className="book-card-image">
        <img src={book.image || './public/no-image'} alt={book.title} />
      </div>

      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  )
}
