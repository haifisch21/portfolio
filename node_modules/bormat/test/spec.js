var assert = require('assert');
var bormat = require('../');
describe("a boring format util: ", function() {
    
    describe("a comma-group number formatter", function() {
        it("should format number strings with commas every three places", function(){
            assert.equal( bormat.commaGroups("1000000000"), "1,000,000,000", "did not format a billion correctly");
        });
        it("should accept a number as an argument", function() {
            assert.equal( bormat.commaGroups(1000000000), "1,000,000,000", "did not format a billion (number) correctly");
        });
        it("should not format numbers less than 1000", function() {
            assert.equal( bormat.commaGroups("893"), "893", "formatted a number less than 1000");
        });
    });
    
    describe("a timeSince formatter", function() {
        it("should calculate the time since a given unix timestamp", function() {
            var now = +new Date();
            var timestamp = now - 176400000; // 2 days and 1 hour
            assert.equal( bormat.timeSince(timestamp), "2 days, 1 hour", "timeSince did not work with one parameter" )
        });
        
        it("should be able to take a compare date in lieu of assuming the current timestamp", function() {
            var compare = +new Date() - 172800000; // 2 days from now
            var timestamp = compare - 3602000; // 1 hour and 2 seconds before compare
            assert.equal( bormat.timeSince(timestamp, { compareDate: compare }), "1 hour, 2 seconds", "timeSince did not work with a provided compare date");
        });
        
        it("should be able to specify a max unit size", function() {
            var timestamp = +new Date() - 2419200000 - 604800000;
            assert.equal( bormat.timeSince(timestamp), "1 month, 1 week", "timeSince did not work with control test for max unit");
            assert.equal( bormat.timeSince(timestamp, { maxUnit: "day" }), "35 days", "timeSince did not work with a max unit specified");
        });
        
        it("should be able to output unix uptime format", function() {
            var timestamp = +new Date() - 2419200000 - 604800000 - 3720000; // 35 days, 1 hour, 2 minutes
            assert.equal( bormat.timeSince(timestamp, {unixUptime: true}), "35 days, 1:02", "timeSince did not format unix uptime correctly");
        });
        
        it("should be able to output unix uptime format for less than 24 hours", function() {
            var timestamp = +new Date() - 3600000 - 120000 - 3000; // 1 hour, 2 minutes, 3 seconds
            assert.equal( bormat.timeSince(timestamp, {unixUptime: true}), "01:02:03", "timeSince did not format unix uptime correctly under 24hrs");
        });
        
        it("should be able to take a time chunk", function() {
            assert.equal( bormat.timeSince({timeChunk: 3600000}), "1 hour");
        });
        
    });
    
})
