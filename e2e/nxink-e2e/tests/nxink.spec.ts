import * as nrwl from "@nrwl/nx-plugin/testing";

describe("generate nxink:ink", () => {
	it("should create a new ink contract", async () => {
		let ink = nrwl.uniq("nxink");
		nrwl.ensureNxProject("nxink", "dist/packages/nxink");

		await nrwl.runNxCommandAsync(`generate nxink:ink ${ink}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${ink}/src/lib.rs`);
		}).not.toThrow();

		expect(() => {
			nrwl.checkFilesExist(`signac.config.js`);
		}).not.toThrow();
	
	}, 120000);
});
