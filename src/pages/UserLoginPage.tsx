import React, {useState} from "react";
import logo from "../logo.svg";
import {TextField} from "../components/TextField";


const UserLoginPage = (): JSX.Element =>  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    return(
        <div className="container">
            <form>
            <div className="text-center mb-4">
                <img className="mb-4" src={logo} alt="" width="72"
                     height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Login to Memos</h1>
            </div>
                <TextField
                    label={"Email address"}
                    type= {"email"}

                />
                <TextField
                    label={"Password"}
                    type={"password"}
                />

                <button type="submit" className="btn btn-primary btn-block btn-lg" >Clear</button>
                <button type="submit" className="btn btn-primary btn-block btn-lg" >Login</button>
            </form>
        </div>
    );
}

export default UserLoginPage;
