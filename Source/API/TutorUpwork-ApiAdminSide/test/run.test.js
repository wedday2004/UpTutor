// index.js
const { describe, it } = require("mocha");
var expect = require("chai").expect;

describe("Our application", function() {
  it("should understand basic mathematical principles", function() {
    expect(5).to.equal(5);
    expect(5).to.not.equal(3);
  });
});
