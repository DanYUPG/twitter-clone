import axios from 'axios';

function fetcher(url: string) {
  let response = axios.get(url);
  let data = response.then((res) => res.data);
  return data;
}



export default fetcher;
 
 