var expect = chai.expect;
var should = chai.should;

describe("Renderer", function() {

  // TODO: Constructor test

  it("should be able to have its content set", function() {

    // Given some JSON content
    var content = {content: "That"};
    // And a renderer
    var renderer = new Renderer();
    // When we set the content source
    renderer.setContent(JSON.stringify(content));
    // Then the renderer should have it's content to render set to the text in that field
    expect(JSON.stringify(renderer.content)).to.equal(JSON.stringify(content));
  });

  it("should be able to have its template set", function() {
    // Given a template
    var template = "This is {{ content }}.";
    // And a renderer
    var renderer = new Renderer();
    // When we set the template source to that field
    renderer.setTemplate(template);
    // Then the renderer should have its template set to the text in that field
    expect(renderer.template).to.equal(template);
    
  });

  it("should be able to render the content using the template", function() {

    var renderer = new Renderer();
    // Given some JSON content
    var content = {content: "That"};
    renderer.setContent(JSON.stringify(content));
    // And a template
    var template = "This is {{ content }}.";
    renderer.setTemplate(template);

    var result = renderer.render();
    // Then the result should be the content rendered with the template
    expect(result).to.equal("This is That.");
  });

  it("should be able to render the content using the template and a partial", function() {

    var renderer = new Renderer();
    // Given some JSON content
    var content = {content: "That"};
    renderer.setContent(JSON.stringify(content));
    // And a template
    var template = "This is {{> partial }}.";
    renderer.setTemplate(template);
    // And a partial
    var partial = "{{ content }}";
    renderer.setPartial(partial);
    // When we render the template
    var result = renderer.render();
    // Then the output should be:
    expect(result).to.equal("This is That.");
  });

  it("should allow a generic partial to be parameterized with specific content", function() {

    var renderer = new Renderer();
    // Given some JSON content
    var content = {sweet: "Marzipan"};
    renderer.setContent(JSON.stringify(content));
    // And a template
    var template = "This is {{render 'partial' headline=sweet }}.";
    renderer.setTemplate(template);
    // And a partial
    var partial = "{{ hash.headline }}";
    renderer.setPartial(partial);
    // And a helper function
    var render = function() {
      var values, opts, done, value, context;
      if (!partial) {
          console.error('No partial name given.');
      }
      values = Array.prototype.slice.call(arguments, 1);
      opts = values.pop();
      while (!done) {
          value = values.pop();
          if (value) {
              partial = partial.replace(/:[^\.]+/, value);
          }
          else {
              done = true;
          }
      }

      console.log(opts);

      context = _.extend({}, opts.context||this, _.omit(opts, 'context', 'fn', 'inverse'));

      var template = Handlebars.compile(partial);
      var output = new Handlebars.SafeString( template(context) );
      console.log(template(context));
      console.log(output);
      return output;
    };

    renderer.setHelper(render);
    // When we render the template
    var result = renderer.render();
    // Then the output should be:
    expect(result).to.equal("This is Marzipan.");
  });

});
