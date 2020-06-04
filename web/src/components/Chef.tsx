/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useRemoveChefMutation, useUpdateChefMutation } from "../generated";

export const Chef = (props: any) => {
  const [removeChef, { data }] = useRemoveChefMutation();
  const [updateChef, { data: datau }] = useUpdateChefMutation();
  const remChef = async () => {
    await removeChef({
      variables: {
        userremove: props.user,
        userid: props.userid,
      },
    });
  };
  if (data) {
    window.location.pathname = "user";
  }

  const upChef = async () => {
    await updateChef({
      variables: {
        userid: props.userid,
      },
    });
  };
  if (datau) window.location.pathname = "user";

  return (
    <div className="dashboard-friend">
      <h1 style={{fontFamily:"Nexa-Bold", fontSize:"35px", color:"#ffffff"}}>{props.userid}</h1>
      <h3 className="friend-rating">Current Rating {props.rating.split(' ')[0]}</h3>
      <h3 className="friend-rating">Highest Rating {props.rating.split(' ')[3].slice(0,-1)}</h3>
      <div style={{display:"flex", justifyContent:"space-between", marginTop: "30px"}}>
      <div>
      <a href={"https://www.codechef.com/users/"+props.userid} target="_blank"> <button style={{width:"125px",borderRadius:"20px", backgroundColor: "#1890ff", font: "Nexa-Bold", fontSize:"15px",color:"#ffffff", textAlign:"center", border:0, padding: "10px",}}>CC Page</button> </a>
      <button style={{width:"125px",borderRadius:"20px", backgroundColor: "#1890ff", font: "Nexa-Bold", fontSize:"15px",color:"#ffffff", textAlign:"center", border:0, padding: "10px",marginLeft:"15px"}} onClick={upChef}> Refresh </button>
      </div>
      <button style={{width:"125px",borderRadius:"20px", backgroundColor: "#b71c1c", font: "Nexa-Bold", fontSize:"15px",color:"#ffffff", textAlign:"center", border:0, padding: "10px",marginLeft:"15px"}} onClick={remChef}>Remove</button>
      </div>
    </div>
  );
};
