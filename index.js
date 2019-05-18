const express = require('express');
const app = express();

app.get('/:id/:a', (req,res)=>{
    res.send(req.params);
});

const port = process.env.PORT || 3200;
app.listen(port,() => {console.log(`Listening on port${port}`)});


