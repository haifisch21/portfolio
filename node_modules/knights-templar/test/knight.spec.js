var _ = require('underscore');
var assert = require('assert');
describe("A template-generating knight templar", function() {
    
    var knight = require("../knights-templar");
    
    it("should compile underscore templates by default", function() {
        var path = __dirname + "/underscore.html";
        var template = knight.make(path);
        assert.equal(template({ name:"test" }),'<p>test</p>');
    });
    
    it("should compile underscore templates too, with aliases", function() {
        var path = __dirname + "/underscore.html";
        var template = knight.make(path,"_");
        var template2 = knight.make(path,"underscore");
        assert.equal(template({ name:"test" }),'<p>test</p>');
    });
    
    it("should accept common aliases for types", function() {
        var path = __dirname + "/handlebars.html";
        var data = {name: "aliases"};
        var template = knight.make(path);
        var template2 = knight.make(path,"hbs");
        var template3 = knight.make(path,"handlebars");
        var template4 = knight.make(path,"Handlebars");
        assert.ok(template(data) === template2(data));
        assert.ok(template(data) === template3(data));
        assert.ok(template(data) === template4(data));
    });
    
    it("should complain if a file does not exist", function() {
        var badCall = function() {
            knight.make(__dirname+'/notafile')
        }
        assert.throws(badCall);
    });

    it('should look in precompiled templates object first for content', function() {
        var path = __dirname + "/underscore.html";
        var precomp = {};
        precomp[path] = '<span><%= name %></span>';
        knight.registerPrecompiled(precomp);
        var template = knight.make(path, '_');
        assert.equal(template({ name: "test" }), '<span>test</span>');
    });

    it('precompiled template object should be able to be html or precompiled function', function() {
        var path = __dirname + "/underscore.html";
        var precomp = {};
        precomp[path] = _.template('<span><%= name %></span>');
        knight.registerPrecompiled(precomp);
        var template = knight.make(path, '_');
        assert.equal(template({ name: "test" }), '<span>test</span>');
    });
    
})