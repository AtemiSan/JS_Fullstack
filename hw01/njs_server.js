const http = require("http");
const host = 'localhost';
const port = 80;
const requestListener = function (req, res) {
    res.setHeader("Content-type", "text/html");
    res.writeHead(200);
    res.end("<html><head></head><body> <h1>Java Script Fullstack test server.</h1></body></html>");
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});