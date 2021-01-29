import React, {useEffect, useState} from "react";
import logo from "../logo.svg";
import {TextField} from "../components/TextField";
import { logIn } from "../api/apiCalls";
import axios from "axios";
import {ButtonWithProgress} from "../components/ButtonWithProgress";
const UserLoginPage = (): JSX.Element =>  {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const buttonDisabled = pendingApiCall || error !== "" || username === "" || password === "";

    useEffect(() => {
        axios.interceptors.request.use(
            request => {
                setPendingApiCall(true);
                return request;
        });

        axios.interceptors.response.use(
            response => {
                setPendingApiCall(false);
                return response;
            },
            error => {
                setPendingApiCall(false);
                throw error;
            }
        );
    })

    const clearScreen = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setUsername("");
        setPassword("");
        setError("");
    }


    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;

        setter(value);
        setError("");
    }

    const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        try {
            await logIn({ username, password });
        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    }

    return(
        <div className="container">
            <form>
            <div className="text-center mb-4">
                <img className="mb-4" src={logo} alt="" width="72"
                     height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Login to Memos</h1>
            </div>
                <TextField
                    name={"username"}
                    label={"Username"}
                    type= {"username"}
                    value={username}
                    onChange={handleChange(setUsername)}
                />

                <TextField
                    name="password"
                    label={"Password"}
                    type={"password"}
                    value={password}
                    onChange={handleChange(setPassword)}
                    error={error}
                />

                <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={clearScreen}
                >
                    Clear
                </button>

                <ButtonWithProgress
                    disabled={buttonDisabled}
                    label={"Login"}
                    onClick={onSubmit}
                    pendingApiCall={pendingApiCall}
                />
            </form>
        </div>
    );
}

export default UserLoginPage;
