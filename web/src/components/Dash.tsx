import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMeQuery, useAddChefMutation } from "../generated";
import { Chef } from "./Chef";
import { MyInfo } from "./MyInfo";

export const Dash = () => {
  const { data } = useMeQuery();
  const [addChef, { data: dataa }] = useAddChefMutation();
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
    else alert("Codechef ID does not exist");
  }

  const logout = () => {
    localStorage.removeItem("chef");
    window.location.pathname = "login";
  };

  if (data?.me !== null)
    return (
      <div>
        <p>Hi {data?.me?.name} </p>
        <MyInfo user={data?.me?.userid} />
        <h2>My Friends</h2>
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
        <h2>Add New Friend</h2>
        <input
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter CC ID here"
        />
        <button onClick={AddChef} disabled={!id}>
          Add Friend
        </button>
        <button onClick={logout}> LOGOUT </button>
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
