import { BottomWarning } from "../components/BottomWarning";
import { Buttomcomp } from "../components/Buttoncomp";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";


export function SignIn(){
    return <div>
        <Heading label={"SignIn"}/>
        <Subheading label={"Write your Email, Password here"}/>
        <Inputbox label={"Email"} placeholder={"email@gmail.com"}/>
        <Inputbox label={"Password"} placeholder={"**********"}/>
        <Buttomcomp label={"Submit"}/>
        <BottomWarning label={"Don't have an account? "} buttonText={"SignUp here"} to={"./signup"}/>
    </div>
}