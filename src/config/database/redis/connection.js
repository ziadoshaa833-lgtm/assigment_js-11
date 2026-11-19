import { createClient } from "redis";





export const redisConnection=async()=>{
     const client = createClient({
  url: "rediss://default:gQAAAAAAA5ivAAIgcDEyMjQwNjJhMTIwM2E0ZjI0YjI3N2RhMzc0MjYxYjVlMQ@teaching-gelding-235695.upstash.io:6379"
});

client.on("error", function(err) {
  throw err;
});
await client.connect()
 console.log("redis connected");
return client



}
