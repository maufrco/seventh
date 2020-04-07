/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HostItem from '../../../app/components/HostItem';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../../../app/reducers";
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
configure({ adapter: new Adapter() });

describe('HostItemComponent', () => {
    const renderer = new ShallowRenderer();

    describe('Snapshots', () => {
      it('Should be a simple CategoryItemComponent', () => {
        const component = renderer.render(
            <Provider store={store}>
                <HostItem host={'animal'} />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('Functions and Branches', () => {
        it('Should be execute the function getHost when click on button', () => {
            const component = mount(shallow(
                <Provider store={store}>
                    <CategoryItem host={'animal'} />
                </Provider>
            ).get(0));

            const trigger = jest.spyOn(component.find('HostItem').instance(), 'getHost');

            component.find('HostItem li button').simulate('click');
            expect(trigger).toBeCalled();
        });
    });
});