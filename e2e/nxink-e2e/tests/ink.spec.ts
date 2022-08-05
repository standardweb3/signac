import * as nrwl from "@nrwl/nx-plugin/testing";

describe("generate nxink:ink", () => {
	it("should create a new ink contract", async () => {
		let ink = nrwl.uniq("nxink");
		nrwl.ensureNxProject("nxink", "dist/packages/nxink");

		await nrwl.runNxCommandAsync(`generate nxink:ink ${ink}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${ink}/lib.rs`);
		}).not.toThrow();
	}, 120000);

    // TODO: add tests for other cargo-contract commands
    it("should create a new ink contract", async () => {
		let ink = nrwl.uniq("nxink");
		nrwl.ensureNxProject("nxink", "dist/packages/nxink");

		await nrwl.runNxCommandAsync(`generate nxink:ink ${ink}`);

		expect(() => {
			nrwl.checkFilesExist(`contracts/${ink}/lib.rs`);
		}).not.toThrow();
	}, 120000);

    
});
