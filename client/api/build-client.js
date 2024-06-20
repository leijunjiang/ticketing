import axios from 'axios';

export default ({ req }) => {
  
  const baseURL = typeof window === 'undefined'
    ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    : '/';

  return axios.create({
    baseURL: baseURL,
    headers: req.headers
  });
}