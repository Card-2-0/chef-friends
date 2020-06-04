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
        <h2>My Info</h2>
        <p> My userid : {data.getChef.userid}</p>
        <p>{data.getChef.rating}</p>
        <a href={"https://www.codechef.com/users/"+props.user} target="_blank"> My CC Page </a>
        <button onClick={upChef}>Update my Info</button>
      </div>
    );
  else return <p>No Info</p>;
};
