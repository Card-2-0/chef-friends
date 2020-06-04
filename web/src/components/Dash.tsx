import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMeQuery, useAddChefMutation } from "../generated";
import { Chef } from "./Chef";
import { MyInfo } from "./MyInfo";

export const Dash = () => {
  const imgsource = require('./Logo/Codechef_book_logo.png');
  const profpic = require('./../components/Images/Joey.jpg');
  const openLogout = () => {
    (document.getElementById("dashboard-user-dialog") as HTMLElement).style.display = "flex";
    (document.getElementById("dashboard-body") as HTMLElement).style.backgroundImage = "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))";
  }
  const closeLogout = () =>{
      (document.getElementById("dashboard-user-dialog") as HTMLElement).style.display = "none";
      (document.getElementById("dashboard-body") as HTMLElement).style.backgroundImage = "linear-gradient(45deg, #3091be, #13acb1)";
  }
  const { data } = useMeQuery();
  const [addChef, { data: dataa,loading }] = useAddChefMutation();
  const [id, setId] = useState<string>("");
  const AddChef = async () => {
    await addChef({
      variables: {
        useradding: data?.me?.id!,
        userid: id,
      },
    });
  };
  if (dataa) {
    if (dataa.addChef === "Done") window.location.pathname = "user";
    else if(dataa.addChef !== "Don") { 
      alert("Codechef ID does not exist"); 
      dataa.addChef = "Don"; 
    } 
  }

  const logout = () => {
    localStorage.removeItem("chef");
    window.location.pathname = "login";
  };

  if (data?.me !== null)
    return (
      <div className="dashboard-page" >
        <div className="dashboard-menubar">
          <div className="dashboard-menubar-left">
          <img src={imgsource} width="35px" alt="codechef logo" />
          <div className="dashboard-menubar-title">CHEFBOOK</div>
          </div>
          <div className="dashboard-menubar-left">
          <img src={profpic} style={{position:"relative",borderRadius:"50%"}} width="40px" alt="profilepic" onClick={openLogout} />
          <div className="dashboard-user-dialog" id="dashboard-user-dialog" >
          <img src={profpic} style={{position:"relative",borderRadius:"50%"}} width="110px" alt="profilepic" />
          <div className="dashboard-menubar-username">{data?.me?.name} </div>
          <button className="dashboard-logout" onClick={logout}> LOGOUT </button>
          </div>
          </div>
        </div>
        <div className="dashboard-body" id="dashboard-body" onClick={closeLogout}>
        <div className="dashboard-info-section">
        <div className="dashboard-my-info">
        <MyInfo user={data?.me?.userid} />
        </div>
        <div className="dashboard-add-friend">
        <h1 className="dashboard-info-section-head" >Add New Friend</h1>
        <form onSubmit={AddChef}>
        <input className="add-friend-input" id="add-friend-input"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter CC ID here"
          required
          title="Please Enter the Codechef ID"
          
        />
        <button type="submit" style={{fontFamily: "Nexa-Bold", backgroundColor:"#1890ff", border:0, fontSize:"25px", marginTop: "20px", padding: "10px", width: "100%"}}  disabled={loading}>
          ADD FRIEND
        </button>
        </form>
      </div>
        </div>
        <div className="dashboard-friends-head"><h1>My Friends</h1></div>
        <div style={{display:"flex", flexDirection:"row", flexWrap: "wrap", justifyContent: "space-between"}}>
        {data?.me &&
          data?.me.friends?.map((item, i) => {
            return (
              <Chef
              key={i}
              userid={item.userid}
              rating={item.rating}
              user={data?.me?.id}
              />
              );
            })}
            </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        <p> Please Login </p>
        <Link to="login"> Here </Link>
      </div>
    );
};
