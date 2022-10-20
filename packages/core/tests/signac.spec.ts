// eslint-disable-next-line @typescript-eslint/no-var-requires
let nixt = require("nixt")
describe('Signac init', function() {
	it('Shows a starting screen', async function(done) {
	  await nixt()
	  .run('node ./dist/packages/core/src/index.js init')
	  .stdout('')
	  .end(done);
	}, 1000000);
  });