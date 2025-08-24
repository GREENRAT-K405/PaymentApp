import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {

    axios.get('http://localhost:3000/api/v1/account/balance')
  .then(response => {
    console.log(response.data); // handle the data
  })
  .catch(error => {
    console.error('Error fetching data:', error); // handle errors
  });


    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}