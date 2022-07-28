import * as nrwl from "@nrwl/nx-plugin/testing";

describe("generate nxink:app", () => {
	it("should create a new Rust application", async () => {
		let app = nrwl.uniq("nxink");
		nrwl.ensureNxProject("nxink", "dist/packages/nxink");

		await nrwl.runNxCommandAsync(`generate nxink:app ${app}`);

		expect(() => {
			nrwl.checkFilesExist(`apps/${app}/src/main.rs`);
		}).not.toThrow();
	}, 120000);

	describe("--directory", () => {
		it("should create src in the specified directory", async () => {
			let app = nrwl.uniq("nxink");
			nrwl.ensureNxProject("nxink", "dist/packages/nxink");

			await nrwl.runNxCommandAsync(
				`generate nxink:app ${app} --directory subdir`
			);

			expect(() => {
				nrwl.checkFilesExist(`apps/subdir/${app}/src/main.rs`);
			}).not.toThrow();
		}, 120000);
	});

	describe("--tags", () => {
		it("should add tags to nx.json", async () => {
			let app = nrwl.uniq("nxink");
			nrwl.ensureNxProject("nxink", "dist/packages/nxink");

			await nrwl.runNxCommandAsync(
				`generate nxink:app ${app} --tags e2etag,e2ePackage`
			);

			let projectCfg = nrwl.readJson(`apps/${app}/project.json`);

			expect(projectCfg.tags).toEqual(["e2etag", "e2ePackage"]);
		}, 120000);
	});
});
