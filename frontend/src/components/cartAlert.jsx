import '../styles/cartAlert.css'

function CartAlert({status,msg}){
    return(
        <div className="cart-alert">
          {(status===201 || status==200) &&
        <div className="alert alert-success text-center" role="alert">
  {msg}
</div>}{(status===401 || status===403 || status===404) &&
        <div className="alert alert-danger text-center" role="alert">
  {msg}
</div>}
        </div>
    )
}

export default CartAlert