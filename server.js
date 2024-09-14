const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/reboot', (req, res) => {
  // Trigger the reboot subprocess
  const { exec } = require('child_process');
  exec('sudo reboot', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Reboot failed');
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Reboot initiated');
  });
});

app.get('/power-off', (req, res) => {
  // Trigger the poweroff subprocess
  const { exec } = require('child_process');
  exec('sudo poweroff', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Poweroff failed');
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Poweroff initiated');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});