/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Home from '../../../app/scenes/Home';

describe('HomeComponent', () => {
    const renderer = new ShallowRenderer();

    describe('Snapshots', () => {
      it('Should be a simple HomeComponent', () => {
        const component = renderer.render(
          <Home />,
        );
        expect(component).toMatchSnapshot();
      });
    });
});