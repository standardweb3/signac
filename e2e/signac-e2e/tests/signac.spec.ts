var nixt = require('nixt');

describe('Signac init', function() {
	it('Shows a starting screen', function(done) {
	  nixt()
	  .run('signac init')
	  .cwd('e2e/signac-e2e')
	  .stdout('d')
	  .end(done);
	}, 1000000);
  });