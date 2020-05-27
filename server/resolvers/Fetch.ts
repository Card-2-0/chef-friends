import axios from "axios";
import cheerio from "cheerio";
import { Resolver, Mutation, Arg } from "type-graphql";

let siteUrl = "";
const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

@Resolver()
export default class Fetch {
    @Mutation(() => String)
    async fetch (@Arg("userid") userid : string) {
        siteUrl = ("https://www.codechef.com/users/"+userid)
        const $ = await fetchData();
        const currating = $('.rating-number').text();
        if(currating.length == 0) return "User does not exist"; 
        console.log(parseInt((currating.substring(0,4))))
        const higrating = $('.rating-header').text();
        console.log(higrating.split('\n')[6].trim());
        return currating.substring(0,4)+' '+(higrating.split('\n')[6].trim());
    }
}