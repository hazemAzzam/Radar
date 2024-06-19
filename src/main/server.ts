import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

// Define the route to handle the tile requests
app.get('/:z/:x/:y.png', (req, res) => {
  const { z, x, y } = req.params;
  const filePath = path.join(__dirname, '..', 'tiles', z, x, `${y}.png`);
  console.log(__dirname);

  // Check if the file exists and send it, or send a 404 error
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Tile not found');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
