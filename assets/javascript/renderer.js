(function(exports) {
  "use strict";

  function Renderer() {
    this.handlebars = Handlebars;
  }
  exports.Renderer = Renderer;

  Renderer.prototype = {
    setContentSource: function(contentSource) {
      if (!contentSource)
        throw new Error("missing contentSource");
      this.contentSource = contentSource;
    },
    setTemplateSource: function(templateSource) {
      if (!templateSource)
        throw new Error("missing contentSource");
      this.templateSource = templateSource;
    },
    content: function() {
      return JSON.parse(this.contentSource.text());
    },
    template: function() {
      return this.templateSource.text();
    },
    render: function() {
      var template = Handlebars.compile(this.template());
      return template(this.content());
    }
  };
})(this);
