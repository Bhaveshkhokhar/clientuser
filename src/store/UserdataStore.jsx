import { useContext, useReducer, createContext } from "react";
import { authContext } from "./authStore";
import { useEffect } from "react";
import { getUserData } from "../services/userService";

export const UserStore = createContext({
  user: {},
  handleUpdate: () => {},
});

const reducer = (curruser, action) => {
  let newUser = curruser;
  if (action.type === "delete") {
    newUser = {
      name: "",
      number: "",
      gender: "",
      email: "",
      address: "",
      birthdate: "",
      image: "/defaultpic.jpg",
    };
  } else if (action.type === "add") {
    newUser = action.payload;
  } else if (action.type === "update") {
    newUser=action.payload;
  }
  return newUser;
};
const UserProvider = ({ children }) => {
  const { loginstate, handleuserProfile } = useContext(authContext);
  const [user, dispatch] = useReducer(reducer, {
    name: "",
    number: "",
    gender: "",
    email: "",
    address: "",
    birthdate: "",
    image: "/defaultpic.jpg",
  });

  const handleAdd = (data) => {
    const action = {
      type: "add",
      payload: data,
    };
    dispatch(action);
  };

  const handleUpdate = (data) => {
    const action = {
      type: "update",
      payload: data,
    };
    dispatch(action);
  };

  const handleDelete = () => {
    const action = {
      type: "delete",
    };
    dispatch(action);
  };

  useEffect(() => {
    if (loginstate) {
      const controller = new AbortController();
      const signal = controller.signal;
      getUserData(signal, handleuserProfile).then((data) => {
        handleAdd(data);
      });
      return () => {
        controller.abort();
      };
    } else {
      handleDelete();
    }
  }, [loginstate]);

  return (
    <UserStore.Provider
      value={{
        user,
        handleUpdate,
      }}
    >
      {children}
    </UserStore.Provider>
  );
};
export default UserProvider;
