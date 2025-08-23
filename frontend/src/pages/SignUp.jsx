import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Buttoncomp } from "../components/Buttoncomp";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import axios from "axios";


export function SignUp() {

    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center ">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 ">
                <Heading label={"SignUp"} />
                <Subheading label={"Write your Email, Fullname, Password here"} />

                <Inputbox onChange={(e) => {
                    setEmail(e.target.value);
                }} label={"Email"} placeholder={"email@gmail.com"} />

                <Inputbox onChange={(e) => {
                    setName(e.target.value);
                }} label={"Name"} placeholder={"Firstname Lastname"} />

                <Inputbox onChange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"**********"} />

                <Buttoncomp className="pt-4" label={"Submit"} onPress={async () => {

                    const response = await fetch("http://localhost:3000/api/v1/user/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"   // makes express.json() parse it
                        },
                        body: JSON.stringify({
                            name: Name,
                            email: Email,
                            password: Password
                        })
                    });
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);
                    console.log(data.token);
                    token = data.token;
                    localStorage.setItem("token", token)
                    // const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    //     email: Email,
                    //     name: Name,
                    //     password: Password
                    // });
                }
                } />

                <BottomWarning label={"already a user? "} buttonText={"SignIn here"} to={"../signin"} />
            </div>
        </div>
    </div>
}