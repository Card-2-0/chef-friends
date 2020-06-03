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
    <div>
      <h3>{props.userid}</h3>
      <p>Current Rating {props.rating.split(' ')[0]}</p>
      <p>Highest Rating {props.rating.split(' ')[3].slice(0,-1)}</p>
      <a href={"https://www.codechef.com/users/"+props.userid} target="_blank"> CC Page </a>
      <button onClick={upChef}> Refresh </button>
      <button onClick={remChef}>remove</button>
    </div>
  );
};
