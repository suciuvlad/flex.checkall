(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  }

}(this, function (jQuery) {

  //= flex.checkall.js

  return Flex.Checkall;
}));
