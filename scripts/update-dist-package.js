const cp = require("child_process");
const packages=["core", "config", "error", "events", "init", "nxink", "build", "test", "add-contract", "common"]
var fs = require('fs');

async function publish() {
    for (i in packages) {
        const npmVersion = await execute(`curl -s \"https://registry.npmjs.org/@signac/${packages[i]}\" | \ python3 -c \"import sys, json; print(json.load(sys.stdin)['dist-tags']['latest'])\"`)
        var packageJson = require(`../dist/packages/${packages[i]}/package.json`)
		var nextVersion = incrementVersion(npmVersion)
        packageJson["version"] = nextVersion 
        fs.writeFile (`./dist/packages/${packages[i]}/package.json`, JSON.stringify(packageJson), function(err) {
            if (err) throw err;
            }
        );
		if(!["core","nxink"].includes(packages[i])) {
			var corePackageJson = require(`../dist/packages/core/package.json`)
			corePackageJson['dependencies'][`@signac/${packages[i]}`] =  nextVersion
			fs.writeFile (`./dist/packages/core/package.json`, JSON.stringify(corePackageJson), function(err) {
				if (err) throw err;
				}
			);
		}
    }
}

function incrementVersion(npmVersion) {
    var [major, minor, patch] = npmVersion.split('.')
    patch = parseInt(patch) + 1
    return `${major}.${minor}.${patch}`
}

const execute = async (command) => {
	return new Promise((resolve, reject) => {
		const exec = require("child_process").exec;
		exec(
			command,
			function (error, stdout, stderr) {
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

function runPublish(args) {
	console.log(`> ${args.join(" ")}`);

	return new Promise((resolve, reject) => {
		cp.spawn(args.join(" "), {
			shell: true,
			stdio: "inherit",
		})
			.on("error", reject)
			.on("close", code => {
				if (code) reject(new Error(`process failed with exit code ${code}`));
				else resolve();
			});
	});
}

publish()