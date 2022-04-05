import React from 'react'

function List({newName, amount}) {
    
  return (
    <div>
        <div className="historyCase">
            <p className="name">Transfer to {newName}</p>
            <p className="amount" style={{ color: "rgb(207, 5, 5)" }}>
              -${amount}
            </p>
          </div>
    </div>
  )
}

export default List