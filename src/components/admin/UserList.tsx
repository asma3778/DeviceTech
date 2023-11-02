import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { removeUser, usersRequest, usersSuccess } from "../../redux/slices/userSlice";
import api from "../../api";
import { AdminSidebar } from "./AdminSidebar";

export const UserList = () =>{
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.userReducer

  useEffect(() => {
    handleGetUsers()
  }, [])

  const handleGetUsers = async () => {
    dispatch(usersRequest())

    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(usersSuccess(res.data))
  };

    return(
      <div>
          <AdminSidebar />
      <div className="main-content">
        {users.isLoading && <h3> Loading Users...</h3>}
      </div>
      <div className="general-content">
          {users.users.map((user) => (
      <div>
          <h2>{user.id}</h2>
          <h4>{`${user.firstName }  ${user.lastName }`}</h4>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <Button
                onClick={() => dispatch(removeUser({ userId: user.id }))}>
                Remove
          </Button>
      </div>
          ))}
         
      </div>
      </div>
    )
};