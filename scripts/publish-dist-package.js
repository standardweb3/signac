const cp = require("child_process");
const packages=["core", "config", "error", "events", "init", "nxink", "build", "test", "add-contract", "common"]
var fs = require('fs');

async function publish() {
    for (i in packages) {
		await runPublish(`yarn publish`, `../dist/packages/${packages[i]}/package.json`)
    }
}

function runPublish(args, cwd) {
	console.log(`> ${args.join(" ")}`);

	return new Promise((resolve, reject) => {
		cp.spawn(args.join(" "), {
			cwd,
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