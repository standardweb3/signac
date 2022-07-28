import * as nrwl from "@nrwl/nx-plugin/testing";

describe("generate nxink:lib && generate nxink:app", () => {
	it("should generate two projects in the same workspace", async () => {
		let app = nrwl.uniq("app");
		let lib = nrwl.uniq("lib");

		nrwl.ensureNxProject("nxink", "dist/packages/nxink");

		await nrwl.runNxCommandAsync(`generate nxink:lib ${lib}`);
		await nrwl.runNxCommandAsync(`generate nxink:app ${app}`);

		expect(() => {
			nrwl.checkFilesExist(`libs/${lib}/src/lib.rs`);
		}).not.toThrow();

		expect(() => {
			nrwl.checkFilesExist(`apps/${app}/src/main.rs`);
		}).not.toThrow();

		let cargoToml = nrwl.readFile("Cargo.toml").replace(/\s+/g, "");

		expect(cargoToml).toMatch(`[workspace]members=["apps/${app}","libs/${lib}"]`);
	}, 120000);
});
