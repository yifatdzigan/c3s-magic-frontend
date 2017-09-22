import React from 'react';
import WPSWranglerDemo from './WPSWranglerDemo';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('(Component) WPSWranglerDemo', () => {
  let _component;
  const _dispatch = sinon.spy();
  const incrementFunc = sinon.spy();
  const _actions = {
    incrementCounter: incrementFunc
  };
  beforeEach(() => {
    _component = mount(<WPSWranglerDemo count={0} dispatch={_dispatch} actions={_actions} />);
  });

  it('Can mount', () => {
    expect(_component.type()).to.equal(WPSWranglerDemo);
  });

  it('Can increment the counter', () => {
    _component.find('#incrementButton').first().simulate('click');
    expect(_dispatch).to.have.been.calledOnce();
    expect(incrementFunc).to.have.been.calledOnce();
  });
});
