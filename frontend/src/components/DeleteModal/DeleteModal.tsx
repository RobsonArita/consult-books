import './DeleteModal.css'

interface Props {
  title: string
  onCancel: () => void
  onConfirm: () => void
}

export default function DeleteModal({ title, onCancel, onConfirm }: Props) {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h3>Excluir livro</h3>
        <p>
          Tem certeza que deseja excluir <strong>{title}</strong>?
        </p>

        <footer>
          <button onClick={onCancel}>Cancelar</button>
          <button className="danger" onClick={onConfirm}>
            Excluir
          </button>
        </footer>
      </div>
    </div>
  )
}
