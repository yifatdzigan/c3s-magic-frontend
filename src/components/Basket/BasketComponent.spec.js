import React from 'react';
import TitleComponent from './TitleComponent';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('(Component) TitleComponent', () => {
  let _component;
  const _dispatch = sinon.spy();
  const incrementFunc = sinon.spy();
  const _actions = {
    incrementCounter: incrementFunc
  };
  beforeEach(() => {
    _component = mount(<TitleComponent count={0} dispatch={_dispatch} actions={_actions} />);
  });

  it('Can mount', () => {
    expect(_component.type()).to.equal(TitleComponent);
    expect(_component.html()).to.equal('<div>hi!</div>');
  });
});
