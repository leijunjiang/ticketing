import axios from 'axios';


const LandingPage = ( { currentUser }) => {
  console.log(`currentUser = ${currentUser}`);
  console.log(currentUser);
  return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async (req) => {
  let currentUser = null;
  console.log(req.headers)

  try {
    const response = await axios.get(
      typeof window === 'undefined'
        ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser' // Use your server URL here
        : '/api/users/currentuser',
      {
        headers: req.headers
      }
    );
    currentUser = response.data;
  } catch (err) {
    console.error('Error fetching current user:', err);
  }

  return { currentUser };
};

export default LandingPage;