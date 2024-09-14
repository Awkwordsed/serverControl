const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/uname', (req, res) => {
  exec('uname -a', (error, unameStdout, unameStderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send({ error: 'Error running uname command' });
      return;
    }

    exec('sensors', (error, sensorsStdout, sensorsStderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send({ error: 'Error running sensors command' });
        return;
      }

      // Replace newline characters with <br> tags in the output
      const formattedUnameOutput = unameStdout.trim().replace(/\n/g, '<br>');
      const formattedSensorsOutput = sensorsStdout.trim().replace(/\n/g, '<br>');

      // Combine the formatted output with a separator line
      const output = `${formattedUnameOutput}<br>------<br>${formattedSensorsOutput}`;

      // Send the formatted command output as JSON response
      res.json({ output });
    });
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