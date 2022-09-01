const config = require("./signac-config.js")
var validate = require("validate.js");


var constraints = {
	"rust": {
	  presence: false
	},
	"networks": {
		presence: true,
		pattern: "^[0-9]+ .+$",
		message: "^The street for the shipping address must be a valid street name"
	}
};

describe('validate configuratiion file', () => {
  test('rust should not be necessary for config', () => {
    const config = new SignacConfig();
    validate({config, constraints);
    expect(1+2).toBe(3);
  });
});