const express = require('express');
var bodyParser = require('body-parser');
const { exec } = require("child_process");

const app = express();

app.listen(3000);


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.post('/cmdrun', (req, res) => {
    console.log(req.body.cmd) ;
    let cmd=req.body.cmd ;

console.log(cmd);
exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    resp={"outp":stdout} ;
    res.send(resp) ;
});



});

app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
