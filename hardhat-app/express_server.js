const express = require('express');
const { spawn } = require('child_process');
const { sign } = require('crypto');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});



app.get('/get-addresses', (req, res) => {
  // Run the Hardhat script as a child process
  // console.log('Before spawning child process');
  const hardhatScript = spawn(getNPXPath(), ['hardhat', 'run', 'scripts/getAddresses.js']);
  // console.log('After spawning child process');
  
  let scriptOutput = [];

  hardhatScript.stdout.on('data', (data) => {
      // Push each line of output to the array
      const lines = data.toString().split('\n');
      scriptOutput.push(...lines);
  });

  hardhatScript.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  hardhatScript.on('close', (code) => {
    if (code === 0) {
        // Script executed successfully
        res.json({ success: true, output: scriptOutput });
    } else {
        // Script encountered an error
        res.json({ success: false, output: scriptOutput });
    }
  });
});



app.get('/deploy-contract', (req, res) => {

  // Run the Hardhat deploy task as a child process
  const hardhatScript = spawn(getNPXPath(), ['hardhat', 'deploy-contract', '--deployer', req.query.address, '--network', 'localhost']);

  let scriptOutput = '';

  hardhatScript.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  hardhatScript.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  hardhatScript.on('close', (code) => {
    if (code === 0) {
      // Script executed successfully
      res.json({ success: true, output: scriptOutput });
    } else {
      // Script encountered an error
      res.json({ success: false, output: scriptOutput });
    }
  });
});



app.post('/create-campaign', (req, res) => {

  const { platform, signer, name, description, goal, duration } = req.body;
  
  const hardhatScript = spawn(getNPXPath(), [
    'hardhat', 
    'create-campaign',
    '--platform',
    platform,
    '--account',
    signer,
    '--name', 
    name,
    '--description',
    description,
    '--goal',
    goal,
    '--duration',
    duration, 
    '--network', 
    'localhost'
  ]);

  let scriptOutput = '';

  hardhatScript.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  hardhatScript.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  hardhatScript.on('close', (code) => {
    if (code === 0) {
      // Script executed successfully
      res.json({ success: true, output: scriptOutput.trim() });
    } else {
      // Script encountered an error
      res.json({ success: false, output: scriptOutput });
    }
  });
});



app.post('/donate', (req, res) => {

  const { platform, signer, id, amount } = req.body;

  const hardhatScript = spawn(getNPXPath(), [
    'hardhat', 
    'donate',
    '--platform',
    platform,
    '--account',
    signer,
    '--id', 
    id,
    '--value',
    amount, 
    '--network', 
    'localhost'
  ]);

  let scriptOutput = '';

  hardhatScript.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  hardhatScript.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  hardhatScript.on('close', (code) => {
    if (code === 0) {
      // Script executed successfully
      res.json({ success: true, output: scriptOutput });
    } else {
      // Script encountered an error
      res.json({ success: false, output: scriptOutput });
    }
  });
});



const port = 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getNPXPath(){
  return 'C:\\Users\\User\\AppData\\Roaming\\npm\\npx.cmd'
}