/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Monitor from '../../../app/components/Monitor';
import { createStore, applyMiddleware } from 'redux';
import * as actionsTypes from '../../../app/actions/actionsTypes';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../../app/reducers';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
configure({ adapter: new Adapter() });

describe('MonitorComponent', () => {
    const renderer = new ShallowRenderer();

    describe('Snapshots', () => {
      it('Should be a simple MonitorComponent with loadingTemplate', () => {
        const component = renderer.render(
            <Provider store={store}>
                <Monitor />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('Functions and Branches', () => {
        it('Should be a MonitorComponent with loadingTemplate', () => {
            const component = mount(shallow(
                <Provider store={store}>
                    <Monitor />
                </Provider>
            ).get(0));

            expect(component.find('Monitor img').length).toEqual(1);
        });

        it('Should be a MonitorComponent with monitorTemplate', () => {
            const host = {
                hosts: ['google'],
                value: 'The example text'
            };
            store.dispatch({ type: actionsTypes.GET_MONITOR, monitor });

            const component = mount(shallow(
                <Provider store={store}>
                    <Monitor />
                </Provider>
            ).get(0));

            expect(component.find('.modal-title').text()).toEqual('google');
        });

        it('Should be execute getAnotherMonitor function and change Monitor value', () => {
            let host = {
                hosts: ['google'],
                value: 'The test text'
            };
            store.dispatch({ type: actionsTypes.GET_MONITOR, monitor });

            const component = mount(shallow(
                <Provider store={store}>
                    <Monitor />
                </Provider>
            ).get(0));

            expect(store.getState().Monitor.value).toEqual('The test text');

            store.dispatch({
                type: actionsTypes.GET_MONITOR,
                host: Object.assign(monitor, { value: 'Another host' })
            });

            const spyGetMonitor = spyBuilder(component,'MonitorModal', 'getMonitor');
            const spyGetAnotherMonitor = spyBuilder(component,'MonitorModal', 'getAnotherMonitor');
            const spyGetFirstCategory = spyBuilder(component,'MonitorModal', 'getFirstCategory');
            component.find('#loadAnotherMonitor').simulate('click');

            expect(spyGetMonitor).toBeCalled();
            expect(spyGetAnotherMonitor).toBeCalled();
            expect(spyGetFirstCategory).toBeCalled();
            expect(store.getState().Monitor.value).toEqual('Another Monitor');
        });

        it('Should be execute getMonitorPreviousCategory function with previous categories argument value', () => {
            const categories = ['animal', 'career'];
            const Monitor = {
                categories: ['career'],
                value: 'The Monitor text'
            };
            store.dispatch({ type: actionsTypes.GET_MONITOR, Monitor });
            store.dispatch({ type: actionsTypes.GET_CATEGORIES, categories });

            const component = mount(shallow(
                <Provider store={store}>
                    <MonitorModal />
                </Provider>
            ).get(0));

            const spyGetMonitorPreviousCategory = spyBuilder(component,'MonitorModal', 'getMonitorPreviousCategory');
            const spyGetCategoryByIndex = spyBuilder(component,'MonitorModal', 'getCategoryByIndex');
            const spyGetMonitor = spyBuilder(component,'MonitorModal', 'getMonitor');
            component.find('#previousMonitorCategory').simulate('click');

            expect(spyGetCategoryByIndex).toBeCalled();
            expect(spyGetMonitorPreviousCategory).toBeCalled();
            expect(spyGetMonitor).toHaveBeenCalledWith('animal');
        });

        it('Should be execute getMonitorNextCategory function with next categories argument value', () => {
            const categories = ['animal', 'career'];
            const Monitor = {
                categories: ['career'],
                value: 'The Monitor text'
            };
            store.dispatch({ type: actionsTypes.GET_MONITOR, Monitor });
            store.dispatch({ type: actionsTypes.GET_CATEGORIES, categories });

            const component = mount(shallow(
                <Provider store={store}>
                    <MonitorModal />
                </Provider>
            ).get(0));

            const spyGetMonitorNextCategory = spyBuilder(component,'MonitorModal', 'getMonitorNextCategory');
            const spyGetCategoryByIndex = spyBuilder(component,'MonitorModal', 'getCategoryByIndex');
            const spyGetMonitor = spyBuilder(component,'MonitorModal', 'getMonitor');
            component.find('#nextMonitorCategory').simulate('click');

            expect(spyGetCategoryByIndex).toBeCalled();
            expect(spyGetMonitorNextCategory).toBeCalled();
            expect(spyGetMonitor).toHaveBeenCalledWith('animal');
        });

        it('Should be execute getMonitorPreviousCategory function and turn to the last category value', () => {
            const categories = ['animal', 'career'];
            const Monitor = {
                categories: ['animal'],
                value: 'The Monitor text'
            };
            store.dispatch({ type: actionsTypes.GET_MONITOR, Monitor });
            store.dispatch({ type: actionsTypes.GET_CATEGORIES, categories });

            const component = mount(shallow(
                <Provider store={store}>
                    <MonitorModal />
                </Provider>
            ).get(0));

            const spyGetMonitor = spyBuilder(component,'MonitorModal', 'getMonitor');
            component.find('#previousMonitorCategory').simulate('click');

            expect(spyGetMonitor).toHaveBeenCalledWith('career');
        });
    });
});

function spyBuilder(component, wrapperName, method) {
    return jest.spyOn(component.find(wrapperName).instance(), method);
}