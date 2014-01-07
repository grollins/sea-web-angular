'use strict';

describe('Service: Seawebbackend', function () {

  // load the service's module
  beforeEach(module('seaWebApp'));

  // instantiate service
  var Seawebbackend;
  beforeEach(inject(function (_Seawebbackend_) {
    Seawebbackend = _Seawebbackend_;
  }));

  it('should do something', function () {
    expect(!!Seawebbackend).toBe(true);
  });

});
