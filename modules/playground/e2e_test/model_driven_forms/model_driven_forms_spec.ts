/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {browser, by, element} from 'protractor/globals';
import {verifyNoBrowserErrors} from 'e2e_util/e2e_util';

describe('Model-Driven Forms', function() {

  afterEach(verifyNoBrowserErrors);

  var URL = 'all/playground/src/model_driven_forms/index.html';

  it('should display errors', function() {
    browser.get(URL);

    var form = element.all(by.css('form')).first();
    var input = element.all(by.css('#creditCard')).first();
    var firstName = element.all(by.css('#firstName')).first();

    input.sendKeys('invalid');
    firstName.click();

    // TODO: WebElement getInnerHtml has been deprecated
    expect((<any>form.getWebElement()).getInnerHtml()).toContain('is invalid credit card number');
  });
});
