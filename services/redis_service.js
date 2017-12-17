let Redis = require('ioredis');
let redis = new Redis({
    host: 'localhost',
    port: 6379,
})

redis.set('ccc', 'ri')

redis.hset('h_set_key', 'field1', 'value1', (e, r)=>{
    console.log(`r1 ${r}`);
})

redis.hset('h_set_key', 'field2', 'value2')
    .then(r=>{
        console.log(`r2 ${r}`)
    })