const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/uname', (req, res) => {
  // Execute the 'uname -a' command and capture its output
  exec('uname -a && sensors', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Error running uname command');
      return;
    }

    // Send the command output as plain text response
    res.type('text/plain').send(stdout.trim());
  });
});


app.get('/reboot', (req, res) => {
  // Trigger the reboot subprocess
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