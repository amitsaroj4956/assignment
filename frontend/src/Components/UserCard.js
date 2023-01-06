import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import { HOSTAPI, imgurl } from "../api";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function UserCard() {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const [data, setData] = useState(null);
  const [newuser, setNewuser] = useState("");
  async function getUser() {
    try {
      await axios.get(`${HOSTAPI}users`).then((res) => setData(res.data));
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUser(id) {
    try {
      let respons = await axios.delete(`${HOSTAPI}users/${id}`);

      if (respons.data.status) {
        getUser();
      }
    } catch (error) {
      console.error(error);
    }
  }
  function updateUser(id) {
    navigate(`/edit?id=${id}`);
  }

  const filterSearch = (e) => {
    setNewuser(e.target.value);
    if (e.target.value.length > 10) {
      setIsError(true);
    }
    // setNewuser(e.target.value);
  };

  const style = {
    alignContent: "space-around",
    justifyContent: "center",
  };
  const style2 = {
    alignContent: "space-around",
    justifyContent: "space-around",
    margin: "30px 0px",
  };
  return (
    <>
      <Grid container spacing={2} sx={style2}>
        <FormControl>
          <TextField variant="outlined"
            onChange={(e) => filterSearch(e)}
            name="mobileNumber"
            id="my-input"
            placeholder="Serach"
            type="tel"
            error={isError}
            value={newuser}
            label="Enter Phone Number"

            InputProps={{
              startAdornment: <InputAdornment position="start">
                +91
              </InputAdornment>,
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/adduser");
          }}
        >
          Add User
        </Button>
      </Grid>

      <Grid container spacing={2} sx={style}>
        {data
          ?.filter((number) => {
            let exnumber = "" + number.mobileNumber;

            if (newuser === "" || newuser === null) {
              return number;
            } else if (exnumber?.includes(newuser)) {
              return number;
            }
          })
          ?.map((userData) => (
            <Card
              sx={{ maxWidth: 345, minWidth: "30%", margin: 1 }}
              key={userData._id}
            >
              <CardHeader
                title={`${userData.firstName} ${userData.lastName}`}
                subheader={userData.mobileNumber}
              />
              <CardMedia
                component="img"
                height="194"
                image={`${imgurl}/${userData.profilePic}`}
                alt={`${userData.firstName} ${userData.lastName}`}
              />

              <CardActions disableSpacing>
                <IconButton
                  aria-label="Delete"
                  onClick={() => {
                    deleteUser(userData._id);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
                <IconButton
                  aria-label="Edit"
                  onClick={() => {
                    updateUser(userData._id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </Grid>
    </>
  );
}
