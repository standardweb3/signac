const coffee = require('coffee');

describe('cli', () => {
  it('should fork node cli', () => {
    return coffee.fork('dist/packages/core/src/index.js' ["--version"])
    .expect('stdout', '')
    .expect('stderr', /34/)
    .expect('code', undefined)
    .end();
  });
});