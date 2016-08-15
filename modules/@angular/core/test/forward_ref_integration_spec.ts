/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgFor} from '@angular/common';
import {Component, Directive, Inject, Query, QueryList, asNativeElements, bind, forwardRef, NgModule, provide, resolveForwardRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {AsyncTestCompleter, beforeEach, ddescribe, describe, iit, inject, it, xit} from '@angular/core/testing/testing_internal';
import {expect} from '@angular/platform-browser/testing/matchers';

export function main() {
  describe('forwardRef integration', function() {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          // AppModule
        ],
        declarations: [
          App,
          Door,
          Lock,
        ],
      });
      TestBed.compileComponents();
    });
    it('should instantiate components which are declared using forwardRef', () => {
      let fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      expect(asNativeElements(fixture.debugElement.children)).toHaveText('frame(lock)');
    });
  });
}

// @NgModule({
//   imports: [
//   ],
//   declarations: [
//     App,
//     Door,
//     Lock,
//   ],
// })
// export class AppModule {
//   constructor() {}
// }

@Component({
  selector: 'app',
  viewProviders: [
    forwardRef(() => Frame),
  ],
  template: `<door><lock></lock></door>`,
})
class App {
}

@Component({
  selector: 'lock',
  template: `{{frame.name}}(<span *ngFor="let  lock of locks">{{lock.name}}</span>)`,
})
class Door {
  locks: QueryList<Lock>;
  frame: Frame;

  constructor(
      @Query(forwardRef(() => Lock)) locks: QueryList<Lock>,
      @Inject(forwardRef(() => Frame)) frame: Frame) {
    this.frame = frame;
    this.locks = locks;
  }
}

class Frame {
  name: string = 'frame';
}

@Directive({selector: 'lock'})
class Lock {
  name: string = 'lock';
}
