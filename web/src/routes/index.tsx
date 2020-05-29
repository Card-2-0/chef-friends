import React from "react"
import { useGetUsersQuery, useCreateUserMutation } from "../generated"

export const AppRoutes = () => {

    const { data } = useGetUsersQuery();
    const [createUserMutation, { data:datau,error }] = useCreateUserMutation()
    if(data) console.log(data);

    const fun = () => {
        try{
            createUserMutation({
                variables:{
                    name:"Sheik",
                    email:"sheik@ram.com",
                    password:"asdasd",
                    userid:"kaousheik"
                }
            })
        }
        catch{
            console.log("Error")
        }
    }
    if(datau) {
        console.log(datau);
        localStorage.setItem('chef', datau.createUser)
    }
    if(error) console.log(error);

    return (
        <div>
            <p> {data && data.getUsers[0].name } </p> 
            <button onClick={fun}> Press me </button>
        </div>
    )
}