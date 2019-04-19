require('dotenv').config();

const server = require('./api/server.js');

server.get('/', (req, res) => {
  res.send('Coded!');
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
