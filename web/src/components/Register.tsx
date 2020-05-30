import React from "react"
import { useCreateUserMutation } from "../generated"

export const Register = () => {
    const ivalue = (id:string) => (document.getElementById(id) as HTMLInputElement).value
    const [createUser, {data}] = useCreateUserMutation() 

    const validateEmail = (email:string) => {
        const re = /^(([^<>()[].,;:\s@"]+(.[^<>()[].,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    const submit = async () => {
        const name = ivalue('name')
        const email = ivalue('email')
        const userid = ivalue('userid')
        const pw1 = ivalue('pw1')
        const pw2 = ivalue('pw2')
        if(!validateEmail(email)) {alert("Enter valid email"); return;}
        if(pw1 !== pw2) {alert("Passwords dont match"); return;}

        await createUser({
            variables:{
                name,
                email,
                userid,
                password:pw1
            }
        })

        if(data?.createUser === "User does not exist") {
            alert("Given codechef ID does not exist, please check")
            return;
        }
        else{
        localStorage.setItem("chef", data?.createUser!)
        window.location.pathname = 'user'}
    }

    return (
        <div>
            <h1>Welcome to ChefBook !</h1>
            <p> Please fill details to register yourself </p>
            <p> Given Username now can't be changed later </p>
            <input id='name' placeholder="Enter Name"></input>
            <input id='email' placeholder="Enter Email"></input>
            <input id='userid' placeholder="Enter Codechef ID"></input>
            <input id='pw1' placeholder="Enter password"></input>
            <input id='pw2' placeholder="Re-enter password"></input>
            <button onClick={submit}> Submit </button>
        </div>
    )
}