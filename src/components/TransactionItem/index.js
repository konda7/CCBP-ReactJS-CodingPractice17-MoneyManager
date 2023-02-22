import './index.css'

const TransactionItem = props => {
  const {transactionDetails} = props
  const {title, amount, type} = transactionDetails
  return (
    <li className="transaction-details-container">
      <p className="transaction-details">{title}</p>
      <p className="transaction-details">{amount}</p>
      <p className="transaction-details">{type}</p>
      <button type="button" className="delete-btn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
