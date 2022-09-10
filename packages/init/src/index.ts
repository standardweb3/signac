import * as cp from "child_process";
import chalk from "chalk";
import inquirer from "inquirer"

const color = "#1890FF"



const runCommand = async (project: string) => {
	console.log(
		chalk.hex(color)(`
	███████╗██╗ ██████╗ ███╗   ██╗ █████╗  ██████╗
	██╔════╝██║██╔════╝ ████╗  ██║██╔══██╗██╔════╝
	███████╗██║██║  ███╗██╔██╗ ██║███████║██║     
	╚════██║██║██║   ██║██║╚██╗██║██╔══██║██║     
	███████║██║╚██████╔╝██║ ╚████║██║  ██║╚██████╗
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝                                            
	`)
	);
	const version = await execute('signac --version');
	console.log(chalk.cyan(`🖼  Welcome to Signac v${version.replace(/[\r\n]/gm, '')} 🎨`));
	inquirer
  .prompt([
    {
      type: 'list',
      name: 'intent',
      message: 'What do you want to do?',
      choices: ['Create a ink! project', 'Create an empty workspace', 'Quit'],
    },
  ])
  .then(async (answers: any) => {
    switch(answers.intent) {
		case 0 : {
			await runNx(project);
			await addContract(project);
			break
		}
		case 1 :{
			await runNx(project);
			break
		}
		case 2 :{
			break
		}
		default: {
			break;
		}
	}
  });
};

function runNx(project: string) {
	return new Promise<void>((resolve, reject) => {
		cp.spawn(`npx create-nx-workspace ${project} --preset=nxink`, {
			shell: true,
			stdio: "inherit",
		})
			.on("error", reject)
			.on("close", code => {
				if (code) reject(new Error(`Cargo failed with exit code ${code}`));
				else resolve();
			});
	});
}

function addContract(project: string) {
	return new Promise<void>((resolve, reject) => {
		cp.spawn("nx generate nxink:ink my-ink-contract", {
			cwd: `./${project}`,
			shell: true,
			stdio: "inherit",
		})
			.on("error", reject)
			.on("close", code => {
				if (code) reject(new Error(`Cargo failed with exit code ${code}`));
				else resolve();
			});
	});
}

const execute = async (command: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const exec = require("child_process").exec;
      exec(
        command,
        function (
          error: Error,
          stdout: string | Buffer,
          stderr: string | Buffer
        ) {
          if (error) {
            reject(error);
            return;
          }
          if (stderr) {
            reject(stderr);
            return;
          } else {
            resolve(stdout);
          }
        }
      );
    });
  };

export default runCommand;
