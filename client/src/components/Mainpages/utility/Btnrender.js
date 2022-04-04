import React, { useContext } from 'react'
import { Globalstate } from '../../../Globalstate'
import {Link} from "react-router-dom"

function Btnrender({food,deletefood}) {
    const state=useContext(Globalstate)
    const[isAdmin]=state.userAPI.isAdmin

    const addCart=state.userAPI.addCart

  return (
    <div className="row-btn">
    {

      isAdmin ?
      <>
      <Link id="btn_buy" to="#!" onClick={()=>deletefood(food._id,food.images.public_id)}>
      Delete
    </Link>
    <Link id="btn_view" to={`/edit_food/${food._id}`}>
      Edit
    </Link>
    </>
    :<>
    <Link id="btn_buy" to="#!" onClick={()=>addCart(food)}>
      Buy
    </Link>
    <Link id="btn_view" to={`/detail/${food._id}`}>
      View
    </Link>
    </>
  }
  </div>
  )
}

export default Btnrender