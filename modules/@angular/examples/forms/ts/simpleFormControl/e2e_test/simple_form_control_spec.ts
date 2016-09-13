/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ElementFinder} from 'protractor';
import {browser, element, by} from 'protractor/globals';
import {verifyNoBrowserErrors} from '../../../../_common/e2e_util';

describe('simpleFormControl example', () => {
  afterEach(verifyNoBrowserErrors);

  describe('index view', () => {
    let input: ElementFinder;
    let valueP: ElementFinder;
    let statusP: ElementFinder;

    beforeEach(() => {
      browser.get('/forms/ts/simpleFormControl/index.html');
      input = element(by.css('input'));
      valueP = element(by.css('p:first-of-type'));
      statusP = element(by.css('p:last-of-type'));
    });

    it('should populate the form control value in the DOM', () => {
      expect(input.getAttribute('value')).toEqual('value');
      expect(valueP.getText()).toEqual('Value: value');
    });

    it('should update the value as user types', () => {
      input.click();
      input.sendKeys('s!');

      expect(valueP.getText()).toEqual('Value: values!');
    });

    it('should show the correct validity state', () => {
      expect(statusP.getText()).toEqual('Validation status: VALID');

      input.click();
      input.clear();
      input.sendKeys('a');
      expect(statusP.getText()).toEqual('Validation status: INVALID');
    });

    it('should set the value programmatically', () => {
      element(by.css('button')).click();
      expect(input.getAttribute('value')).toEqual('new value');
    });

  });
});
