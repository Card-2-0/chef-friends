// import { DrawerProps } from "antd/lib/drawer";
// import { ModalProps } from "antd/lib/modal";
import React from "react";

interface IUserContext {
    user? :any 
  }

export const UserContext = React.createContext<IUserContext>(
    {user:null}
)