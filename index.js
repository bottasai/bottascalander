// import Neode from 'neode';
const express = require('express');
const bodyParser =  require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost',neo4j.auth.basic('neo4j','ne04j'));
var dbsession = driver.session();

app.get('/user/:a', (req,res)=>{
    try
    {
   // res.send(req.params);
   console.log(JSON.stringify(req.params));
   // single quotes to the input params is important.
   const query = `MATCH (u:User {Mob: '${req.params.a}'}) RETURN u`
   const result = dbsession.run(query);
   result.then(result => {
            dbsession.close();
            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            res.send(JSON.stringify(node.properties.Name));
            // on application exit:
            driver.close();
        });
    }
   catch(e)
   {
       console.log(e);
   }
});

app.post('/createUser',function(request,response){
   // console.log(request.body);
    var name=request.body.User.Name;
    var mob=request.body.User.Mob;
    const query = `CREATE (u:User {Name: '${name}',Mob: '${mob}'}) RETURN u`
    const result = dbsession.run(query);
    result.then(result => {
        dbsession.close();
        // on application exit:
        driver.close();
      }); 
      response.end("Yes");
    });

const port = process.env.PORT || 3200;
app.listen(port,() => {console.log(`Listening on port${port}`)});