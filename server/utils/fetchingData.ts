import axios from "axios";
import cheerio from "cheerio";

let siteUrl = "";
const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

const fetch = async (userid:string) => {
  siteUrl = ("https://www.codechef.com/users/"+userid)
  const $ = await fetchData();
  const currating = await $('.rating-number').text();
  if(currating.length == 0) return null; 
  console.log(parseInt((currating.substring(0,4))))
  const higrating = $('.rating-header').text();
  console.log(higrating.split('\n')[6].trim());
  const rating =  currating.substring(0,4)+' '+(higrating.split('\n')[6].trim());
  return rating;
}

export default fetch;