import React from "react"
import { useRemoveChefMutation, useUpdateChefMutation } from "../generated"

export const Chef = (props:any) => {
    const [ removeChef, {data} ] = useRemoveChefMutation() 
    const [ updateChef, {data:datau} ] = useUpdateChefMutation()
    const remChef = async () => {
        await removeChef ({
            variables:{
                userremove:props.user,
                userid:props.userid
            }
        })
    }
    if(data){
        window.location.pathname = 'user'
    }

    const upChef = async () => {
        await updateChef({
            variables:{
                userid:props.userid
            }
        })
    }
    if(datau) window.location.pathname = 'user'

    return(
        <div>
            <h3>{props.userid}</h3>
            <p>{props.rating}</p>
            <button onClick={upChef}> Refresh </button>
            <button onClick={remChef}>remove</button>
        </div>
    )
}