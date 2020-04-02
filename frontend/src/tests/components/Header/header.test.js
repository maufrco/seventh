/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../../app/components/Header';

describe('HeaderComponent', () => {
    const renderer = new ShallowRenderer();

    describe('Snapshots', () => {
      it('Should be a simple HeaderComponent', () => {
        const component = renderer.render(
          <Header />,
        );
        expect(component).toMatchSnapshot();
      });
    });
});