/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global define, describe, it, $, expect, beforeEach, afterEach, spyOn */

describe('Checkall', function () {
  'use strict';

  var checkboxesHtml,
    checkboxTriggerHtml,
    $checkboxes,
    $checkboxTrigger;


  beforeEach(function () {
    checkboxTriggerHtml = '<input type="checkbox" class="trigger" data-container=".js-checkboxes" data-toggle="checkall" />';
    checkboxesHtml = '<div class="js-checkboxes"><input type="checkbox" /><input type="checkbox" /></div>';

    $('body').append(checkboxesHtml).append(checkboxTriggerHtml);

    $checkboxes = $('.js-checkboxes');
    $checkboxTrigger = $('.trigger');

    $('[data-toggle="checkall"]').checkall();
  });

  afterEach(function () {
    $checkboxes.remove();
    $checkboxTrigger.remove();
  });

  it('.checkall exists on the jQuery Object', function () {
    expect($('body').checkall()).toBeDefined();
  });

  it('data attributes take precedence', function () {
    var dataAttribute = "fieldset",
      options = {container: 'noop'},
      checkall;

    $checkboxes.data('container', dataAttribute).checkall(options);
    checkall = $checkboxes.data('plugin_checkall');
    expect(checkall.options.container).toMatch(dataAttribute);
  });

  it('options passed to constructor override defaults', function () {
    var attribute = "div",
      checkall;

    $checkboxes.checkall({ container: attribute });
    checkall = $checkboxes.data('plugin_checkall');
    expect(checkall.options.container).toMatch(attribute);
  });

  describe('#click trigger', function () {
    it('checks/unchecks all the checkboxes withing `container`', function () {
      var checkboxes = $checkboxes.find(':checkbox');

      $checkboxTrigger.trigger('click');
      expect(checkboxes.length).toEqual($checkboxes.find(':checkbox').filter(':checked').length);
    });

    it('calls #onTriggerChange callback', function () {
      var plugin;
      plugin = $checkboxTrigger.data('plugin_checkall');
      spyOn(plugin.options, 'onTriggerChange');

      $checkboxTrigger.trigger('click');
      expect(plugin.options.onTriggerChange).toHaveBeenCalled();
    });
  });

  describe('#click checkbox within `container`', function () {
    it('calls #onChange callback', function () {
      var plugin,
        checkboxes = $checkboxes.find(':checkbox');

      plugin = $checkboxTrigger.data('plugin_checkall');
      spyOn(plugin.options, 'onChange');

      checkboxes.first().trigger('click');
      expect(plugin.options.onChange).toHaveBeenCalled();
    });

  });

  describe('.sync', function () {
    it('checks `trigger` if all checkoxes are checked', function () {
      var checkboxes = $checkboxes.find(':checkbox');

      checkboxes.first().trigger('click');
      checkboxes.last().trigger('click');

      expect($checkboxTrigger.prop('checked')).toEqual(true);
    });

    it('does not check `trigger` if at least one checkbox is unchecked', function () {
      var checkboxes = $checkboxes.find(':checkbox');

      checkboxes.last().trigger('click');

      expect($checkboxTrigger.prop('checked')).toEqual(false);
    });
  });

});
