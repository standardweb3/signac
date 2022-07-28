import * as nrwl from "@nrwl/nx-plugin/testing";

describe("generate nxink:lib", () => {
	it("should create a new Rust library", async () => {
		let lib = nrwl.uniq("nxink");
		nrwl.ensureNxProject("nxink", "dist/packages/nxink");

		await nrwl.runNxCommandAsync(`generate nxink:lib ${lib}`);

		expect(() => {
			nrwl.checkFilesExist(`libs/${lib}/src/lib.rs`);
		}).not.toThrow();
	}, 120000);

	describe("--directory", () => {
		it("should create src in the specified directory", async () => {
			let lib = nrwl.uniq("nxink");
			nrwl.ensureNxProject("nxink", "dist/packages/nxink");

			await nrwl.runNxCommandAsync(
				`generate nxink:lib ${lib} --directory subdir`
			);

			expect(() => {
				nrwl.checkFilesExist(`libs/subdir/${lib}/src/lib.rs`);
			}).not.toThrow();
		}, 120000);
	});

	describe("--tags", () => {
		it("should add tags to nx.json", async () => {
			let lib = nrwl.uniq("nxink");
			nrwl.ensureNxProject("nxink", "dist/packages/nxink");

			await nrwl.runNxCommandAsync(
				`generate nxink:lib ${lib} --tags e2etag,e2ePackage`
			);

			let projectCfg = nrwl.readJson(`libs/${lib}/project.json`);

			expect(projectCfg.tags).toEqual(["e2etag", "e2ePackage"]);
		}, 120000);
	});
});
