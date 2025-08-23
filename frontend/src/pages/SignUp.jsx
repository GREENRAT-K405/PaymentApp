import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Buttomcomp } from "../components/Buttoncomp";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";


export function SignUp() {

    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4"></div>
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

                <Buttomcomp className="pt-4" label={"Submit"} />
                <BottomWarning label={"already a user? "} buttonText={"SignIn here"} to={"../signin"} />
            </div>
        </div>
}