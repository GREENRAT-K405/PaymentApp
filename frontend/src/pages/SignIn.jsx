import { BottomWarning } from "../components/BottomWarning";
import { Buttomcomp } from "../components/Buttoncomp";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { useState } from "react";


export function SignIn() {
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center ">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 ">
                <Heading label={"SignIn"} />
                <Subheading label={"Write your Email, Password here"} />

                <Inputbox label={"Email"} placeholder={"email@gmail.com"} onChange={(e) => {
                    setEmail(e.target.value);
                }} />

                <Inputbox onChange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"**********"} />

                <Buttomcomp className="pt-4" label={"Submit"} onPress={async () => {

                    const response = await fetch("http://localhost:3000/api/v1/user/signin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"   // makes express.json() parse it
                        },
                        body: JSON.stringify({
                            email: Email,
                            password: Password
                        })
                    });
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data.token);
                    localStorage.setItem("token", data.token)
                    // const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    //     email: Email,
                    //     name: Name,
                    //     password: Password
                    // });
                }
                } />
                <BottomWarning label={"Don't have an account? "} buttonText={"SignUp here"} to={"../signup"} />
            </div>
        </div>
    </div>
}