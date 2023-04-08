const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////////
//FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated in ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);   
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('File has been written');

//             })       
//         });
//     });
// });

/////////////////////////////////
//SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    //Overwiew page
    if(pathName == '/' || pathName == '/overwiew') {
        res.end('This is the overwiew');

    //Product page
    } else if (pathName == '/product') {
        res.end('This is the product');
    }

    //API
    else if (pathName == '/api') {
        //res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }

    //NotFound
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page cannot be found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () =>{
    console.log('Listening to requests');
})