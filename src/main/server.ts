import express from 'express';
import path from 'path';
import { IpcMain, ipcMain } from 'electron';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', '..', 'assets')));

let theme = 'light';

ipcMain.on('set-theme', (event, themeName) => {
  theme = themeName;
  event.reply('set-theme', 'test');
});

// Define the route to handle the tile requests
app.get('/:z/:x/:y.webp', (req, res) => {
  const { z, x, y } = req.params;
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    'assets',
    'tiles',
    theme,
    z,
    x,
    `${y}.webp`,
  );

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
