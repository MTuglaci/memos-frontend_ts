import React, { useState } from "react";
import {TextField} from "../components/TextField";
import logo from "../logo.svg";
import {signUp, User} from "../api/apiCalls";

interface Error {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    passwordAgain: string;
}

const UserSignUpPage = (): JSX.Element => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [isAnyError, setIsAnyError] = useState(false);
    const [errors, setErrors] = useState({} as Error);

    const clearScreen = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setName("");
        setSurname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordAgain("");
    }

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;

        const errorsCopy = {...errors};

        const errorKey: keyof Error = name as keyof Error;

        errorsCopy[errorKey] = '';

        if (name === 'password' || name === 'passwordAgain') {
            if ((name === 'password' && (value !== passwordAgain && !(value === '' && passwordAgain === null)))
                || (name === 'passwordAgain' && (value !== password && !(value === '' && password === null)))) {
                errorsCopy.passwordAgain = 'Password mismatch';
            } else {
                errorsCopy.passwordAgain = '';
            }
        }

        getIsAnyError(errorsCopy);
        setter(value);
        setErrors(errorsCopy);
    }

    const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setPendingApiCall(true);

        let user: User = {
            name,
            surname,
            username,
            email,
            password,
        };

        try {
            await signUp(user);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
        setPendingApiCall(false);
    }

    const getIsAnyError = (errors: Error) => {

        const errorArray: Array<string> = Object.values(errors).map(value => {
            return value
        });

        let tmp = false;
        errorArray.forEach((value: Object) => {
            if(value !== '') {
                tmp = true;
            }
        });
        setIsAnyError(tmp);
    }

    return (
        <div className="container">
            <form>
                <div className="text-center mb-4">
                    <img className="mb-4" src={logo} alt="" width="72"
                         height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Sign Up to Memos</h1>
                </div>

                <TextField
                    name="name"
                    label="Name"
                    value={name}
                    onChange={handleChange(setName)}
                    error={errors.name}
                />

                <TextField
                    name="surname"
                    label="Surname"
                    value={surname}
                    onChange={handleChange(setSurname)}
                    error={errors.surname}
                />

                <TextField
                    name="username"
                    label="Username"
                    value={username}
                    onChange={handleChange(setUsername)}
                    error={errors.username}
                />

                <TextField
                    name="email"
                    type="email"
                    label="E-mail"
                    value={email}
                    onChange={handleChange(setEmail)}
                    error={errors.email}
                />
                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handleChange(setPassword)}
                    error={errors.password}
                />
                <TextField
                    name="passwordAgain"
                    type="password"
                    label="Password Again"
                    value={passwordAgain}
                    onChange={handleChange(setPasswordAgain)}
                    error={errors.passwordAgain}
                />

                <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={clearScreen}
                    type="button"
                >
                    Clear
                </button>


                <button
                    className="btn btn-lg btn-primary btn-block text-center"
                    type="submit"
                    onClick={onSubmit}
                    disabled={pendingApiCall || isAnyError}
                >
                    Sign Up
                    {pendingApiCall && <span className="spinner-grow spinner-grow-sm"></span>}
                </button>

            </form>
        </div>
    );
}

export default UserSignUpPage;