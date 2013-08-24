/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global define, window, document, Flex */

if (typeof Flex === "undefined") { window.Flex = {}; }

Flex.Checkall = (function ($) {
  'use strict';

  var Checkall,
    buildConfig,
    defaults;

  defaults = {
    container: 'form',
    sync: true,
    onChange: function () {},
    onTriggerChange: function () {}
  };

  /**
  * Checkall
  */
  Checkall = function (elem, options) {
    this.version = '0.1.0';
    this.options = options;
    this.$elem = $(elem);
    this.$container = $(this.options.container);

    this._setupBindings();

    return this;
  };

  Checkall.prototype._setupBindings = function () {
    var self = this;

    this.$elem.on('change', function () {
      self.$container.find(':checkbox').prop('checked', this.checked).change();
      self.options.onTriggerChange.call(this);
    });

    self.$container.find(":checkbox").on('change', function () {
      self.options.onChange.call(this);
    });

    if (self.options.sync) {
      self.$container.find(':checkbox').on('click', function () {
        var checkboxes = self.$container.find(':checkbox');

        if (checkboxes.length === checkboxes.filter(':checked').length) {
          self.$elem.prop('checked', 'checked');
        } else {
          self.$elem.removeAttr('checked');
        }
      });
    }
  };

  Checkall.prototype.defaults = defaults;

  $.plugin = function (name, Klass) {
    $.fn[name] = function (options) {
      return this.each(function () {
        var data = $.data(this, 'plugin_' + name),
          initOptions = $.extend({}, typeof options === 'object' && options),
          dataOptions = $(this).data(),
          extOptions = $.extend({}, Checkall.prototype.defaults, initOptions, dataOptions);
        if (!data) {
          $.data(this, 'plugin_' + name, (data = new Klass(this, extOptions)));
        }
      });
    };
  };

  $.plugin('checkall', Checkall);

  $(document).ready(function () {
    $('[data-toggle="checkall"]').checkall();
  });

  return Checkall;
}(window.jQuery));
