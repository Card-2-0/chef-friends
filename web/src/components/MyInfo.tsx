import React from "react";
import { useGetChefQuery } from "../generated";

export const MyInfo = (props: any) => {
  const { data } = useGetChefQuery({
    variables: {
      userid: props.user,
    },
  });

  if (data)
    return (
      <div>
        <h2>My Info</h2>
        <p> My userid : {data.getChef.userid}</p>
        <p>{data.getChef.rating}</p>
      </div>
    );
  else return <p>No Info</p>;
};
