import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BooksList from './views/BooksList/BooksList'
import BookDetails from './views/BookDetails/BookDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
