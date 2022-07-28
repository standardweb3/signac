import { Tree } from "@nrwl/devkit";
import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import runGenerator from "./generator";

describe("ink! generator", () => {
	let appTree: Tree;

	beforeAll(async () => {
		appTree = createTreeWithEmptyWorkspace();
		await runGenerator(appTree, { name: "my-library" });
	});

	it("should create the correct file structure", () => {
		let changes = appTree.listChanges();
		let cargoToml = changes.find(c => c.path === "contracts/my-library/Cargo.toml");
		let libRs = changes.find(c => c.path === "contracts/my-library/src/lib.rs");

		expect(cargoToml).toBeTruthy();
		expect(libRs).toBeTruthy();
	});
});
