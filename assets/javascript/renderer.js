(function(exports) {
  "use strict";

  function Renderer() {
    this.handlebars = Handlebars;
  }
  exports.Renderer = Renderer;

  Renderer.prototype = {
    setContent: function(content) {
      if (!content)
        throw new Error("missing content");
      this.content = JSON.parse(content);
    },
    setTemplate: function(template) {
      if (!template)
        throw new Error("missing template");
      this.template = template;
    },
    setPartial: function(partial) {
      if (!partial)
        throw new Error("missing partial");
      this.partial = partial;
    },
    setHelper: function(helperCode) {
      if (!helperCode)
        throw new Error("missing helper");
      this.handlebars.registerHelper('render', helperCode);
    },
    render: function() {
      if (this.partial) {
        this.handlebars.registerPartial("partial", this.partial);
      }

      var template = this.handlebars.compile(this.template);
      return template(this.content);
    }
  };
})(this);
