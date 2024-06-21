import axios from "axios";
import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return  currentUser ?  
    <h1>Landing page you are signed in</h1> 
    : 
    <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);

  try {
    const { data } = await client.get("api/users/currentuser");
    return data;
  } catch (err) {

  }

  return ({})
};

export default LandingPage;
