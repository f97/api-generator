const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function input(str){
  return new Promise((resolve, reject) => {
    rl.question(str, (ans) => {
      resolve(ans);
    });
  });
};

const execCmd = (command, cwd, callback) => {
  let cmd = exec(command, {cwd: cwd}, function(error, stdout, stderr) {
    
    if (error) {
       console.log(error.stack);
       console.log('Error code: '+error.code);
       console.log('Signal received: '+error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    callback();
  });
  cmd.on('exit', code => {
    console.log('Process exited with code '+code);
  });
}

module.exports = {
  input,
  execCmd
}