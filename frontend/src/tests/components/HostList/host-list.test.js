/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HostList from '../../../app/components/HostList';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../../../app/reducers";
import * as actionsTypes from '../../../app/actions/actionsTypes';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
configure({ adapter: new Adapter() });

describe('HostListComponent', () => {
    const renderer = new ShallowRenderer();

    describe('Snapshots', () => {
      it('Should be a simple HostListComponent', () => {
        const component = renderer.render(
            <Provider store={store}>
                <HostList />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('Functions and Branches', () => {
        it('Should not have the HostListComponent', () => {
            const component = mount(shallow(
                <Provider store={store}>
                    <HostList />
                </Provider>
            ).get(0));

            expect(component.find('HostList ul HostItem').length).toEqual(0);
        });

        it('Should have the HostListComponent', () => {
            store.dispatch({ type: actionsTypes.GET_HOSTS, hosts: ['google'] });
            const component = mount(shallow(
                <Provider store={store}>
                    <HostList />
                </Provider>
            ).get(0));

            expect(component.find('HostList ul HostItem').length).toEqual(1);
        });
    });
});