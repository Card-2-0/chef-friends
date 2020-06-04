/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useGetChefQuery, useUpdateChefMutation } from "../generated";

export const MyInfo = (props: any) => {
  const [updateChef, { data: datau }] = useUpdateChefMutation();
  const { data } = useGetChefQuery({
    variables: {
      userid: props.user,
    },
  });

  const upChef = async () => {
    await updateChef({
      variables: {
        userid: props.user,
      },
    });
  };
  if (datau) window.location.pathname = "user";

  if (data)
    return (
      <div>
        <h1 className="dashboard-info-section-head">My Info</h1>
        <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{fontFamily:"Nexa-Bold", fontSize:"25px", color:"#99ffdd", paddingRight: "20px",}}> My User ID : </div>
        <div style={{fontFamily:"Nexa-Regular", fontSize:"25px", color:"#ffffff",}}>{data.getChef.userid}</div>
        </div>
        <div style={{fontFamily:"Nexa-Bold", fontSize:"25px", color:"#99ffdd", paddingTop: "10px", paddingBottom:"25px"}}>{data.getChef.rating}</div>
        <a href={"https://www.codechef.com/users/"+props.user} target="_blank"> <button style={{width:"125px",borderRadius:"20px", backgroundColor: "#1890ff", font: "Nexa-Bold", fontSize:"15px",color:"#ffffff", textAlign:"center", border:0, padding: "10px",}}>My CC Page</button> </a>
        <button style={{width:"125px",borderRadius:"20px", backgroundColor: "#1890ff", font: "Nexa-Bold", fontSize:"15px",color:"#ffffff", textAlign:"center", border:0, padding: "10px",marginLeft:"15px"}} onClick={upChef}>Update my Info</button>
      </div>
    );
  else return <p>No Info</p>;
};
