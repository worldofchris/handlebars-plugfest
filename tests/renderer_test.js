var expect = chai.expect;
var should = chai.should;

describe("Renderer", function() {

  var $$;

  beforeEach(function(){
      fixtures.path = '/';
      fixtures.load('assets/html/content_input.html');
      $$ = fixtures.window().jQuery; // access the jquery instance from within the fixtures context
  });

  afterEach(function(){
      fixtures.cleanUp(); // cleans up the fixture for the next test
  });

  // TODO: Constructor test

  it("should be able to have its content source set from a field on the page", function() {

    // Given some HTML containing the field where content can be entered
    var expected_content = {content: "That"};
    var actual_content = JSON.parse($$('#content-input').text());
    expect (JSON.stringify(actual_content)).to.equal(JSON.stringify(expected_content));
    // And a renderer
    var renderer = new Renderer();
    // When we set the content source to that field
    renderer.setContentSource($$('#content-input'));
    // Then the renderer should have it's content to render set to the text in that field
    expect(JSON.stringify(renderer.content())).to.equal(JSON.stringify(expected_content));
  });

  it("should be able to have its template source set from a field on the page", function() {
    var template = "This is {{ content }}.";
    // Given some HTML containing the field where a template can be entered
    expect($$('#template-input').text()).to.equal(template);
    // And a renderer
    var renderer = new Renderer();
    // When we set the template source to that field
    renderer.setTemplateSource($$('#template-input'));
    // Then the renderer should template set to the text in that field
    expect(renderer.template()).to.equal(template);
    
  });

  it("should be able to render the content using the template", function() {

    var renderer = new Renderer();
    // Given we set the content source to a field on the page
    renderer.setContentSource($$('#content-input'));
    // And we set the template source to a field on the page
    renderer.setTemplateSource($$('#template-input'));
    // When we render the template
    var result = renderer.render();
    // Then the result should be the content rendered with the template
    expect(result).to.equal("This is That.");
  });

  it("should be able to render the content using the template and a partial", function() {

    var renderer = new Renderer();
    // Given some content, a template and a partial
    renderer.setContentSource($$('#content-input'));
    renderer.setTemplateSource($$('#template-partial-input'));
    renderer.setPartialSource($$("#partial-input"));
    // When we render the template
    var result = renderer.render();
    // Then the output should be:
    expect(result).to.equal("This is That.");
  });

  it("should allow a generic partial to be parameterized with specific content", function() {

    var renderer = new Renderer();
    // Given some specific content
    renderer.setContentSource($$('#content-specific-input'));
    // And a generic partial
    renderer.setPartialSource($$("#generic-partial-input"));
    // And a template containing a generic partial
    renderer.setTemplateSource($$("#template-with-generic-partial-input"));
    // And a renderer to marshall the content
    renderer.setHelperSource($$("#helper-input"));
    // When we render the template
    var result = renderer.render();
    // Then the output should be:
    expect(result).to.equal("This is Marzipan.");
  });

});
