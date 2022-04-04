import React, { useContext} from 'react'
import { Globalstate } from '../../../Globalstate'
import Button from '@mui/material/Button';

function Loadmore() {
    const state=useContext(Globalstate)
    const[page,setpage]=state.foodsAPI.page
    const[result]=state.foodsAPI.result

  return (
    <div className="load_more">
    {
        result < page * 9 ? ""
        :<Button variant="contained" size="medium" color="inherit" onClick={()=>setpage(page+1)}>Load more</Button>
    }

</div>
  )
}

export default Loadmore