import { useEffect, useState } from "react";
import {
    FormGroup,
    FormControl,
    InputLabel,
    Input,
    Button,
    styled,
    Typography,
    TextField
} from "@mui/material";

import { HOSTAPI } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddUser = () => {
    const initialValue = {
        firstName: "",
        lastName: "",
        mobileNumber: "",
    };
    const navigate = useNavigate();
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");

    const [user, setUser] = useState(initialValue);
    const { firstName, lastName, mobileNumber } = user;

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const [image, setImage] = useState({ preview: "", data: "" });
    const [status, setStatus] = useState("");
    const addUserDetails = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("profilePic", image.data || user.profilePic);
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("mobileNumber", user.mobileNumber);

        if (id == "" || id == null) {
            const response = await fetch(`${HOSTAPI}users`, {
                method: "POST",
                body: formData,
            });

            if (response) {
                setStatus(response.statusText);
                navigate("/");
            }
        } else {
            const response = await fetch(`${HOSTAPI}users/edit/${id}`, {
                method: "POST",
                body: formData,
            });

            if (response) {
                navigate("/");
            }
        }
    };
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img);
    };

    async function getSingleUser(id) {
        try {
            let respons = await axios.get(`${HOSTAPI}users/${id}`);

            if (respons) {
                setUser(respons.data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getSingleUser(id);
    }, [id != "" || id != null]);

    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>

                <TextField variant="outlined" label="First Name"
                    onChange={(e) => onValueChange(e)}
                    name="firstName"
                    value={firstName}
                    id="my-input"
                />
            </FormControl>
            <FormControl>

                <TextField variant="outlined" label="Last Name"
                    onChange={(e) => onValueChange(e)}
                    name="lastName"
                    value={lastName}
                    id="my-input"
                />
            </FormControl>

            <FormControl>

                <TextField variant="outlined" label="Mobile Number"
                    onChange={(e) => onValueChange(e)}
                    name="mobileNumber"
                    value={mobileNumber}
                    id="my-input"
                    type="number"
                />
            </FormControl>
            <FormControl>
                {image.preview && (
                    <img src={image.preview} alt="Profile Pic" width="100" height="100" />
                )}
                <hr></hr>

                <Input type="file" name="file" onChange={handleFileChange} />

                {status && <h4>{status}</h4>}
            </FormControl>

            <FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => addUserDetails(e)}
                >
                    Add User
                </Button>
            </FormControl>
        </Container>
    );
};

export default AddUser;
