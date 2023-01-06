
import { Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AddUser from "./Components/AddUser";



import UserCard from "./Components/UserCard";
function App() {

  const style = {
    "alignContent": "space-around",
    "justifyContent": "center"
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <UserCard /></>} />
        <Route path="/adduser" element={<Grid container spacing={2} sx={style}> <AddUser /></Grid>} />
        <Route path="/edit" element={<Grid container spacing={2} sx={style}> <AddUser /></Grid>} />
      </Routes>
    </>

  );
}

export default App;
