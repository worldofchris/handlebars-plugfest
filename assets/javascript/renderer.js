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
        throw new Error("missing templateSource");
      this.templateSource = templateSource;
    },
    setPartialSource: function(partialSource) {
      if (!partialSource)
        throw new Error("missing partialSource");
      this.partialSource = partialSource;
    },
    setHelperSource: function(helperSource) {
      if (!helperSource)
        throw new Error("missing helperSource");
      var helper = new Function("partial", helperSource.val());
      this.handlebars.registerHelper('render', helper);
    },
    content: function() {
      return JSON.parse(this.contentSource.val());
    },
    template: function() {
      return this.templateSource.val();
    },
    render: function() {
      if (this.partialSource) {
        // register the partial
        this.handlebars.registerPartial("partial", this.partialSource.val());
      }

      var template = this.handlebars.compile(this.template());
      return template(this.content());
    }
  };
})(this);
