/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoryList from '../../../app/components/CategoryList';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../../../app/reducers";
import * as actionsTypes from '../../../app/actions/actionsTypes';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
configure({ adapter: new Adapter() });

describe('CategoryListComponent', () => {
    const renderer = new ShallowRenderer();

    describe('Snapshots', () => {
      it('Should be a simple CategoryListComponent', () => {
        const component = renderer.render(
            <Provider store={store}>
                <CategoryList />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('Functions and Branches', () => {
        it('Should not have the CategoryItemComponent', () => {
            const component = mount(shallow(
                <Provider store={store}>
                    <CategoryList />
                </Provider>
            ).get(0));

            expect(component.find('CategoryList ul CategoryItem').length).toEqual(0);
        });

        it('Should have the CategoryItemComponent', () => {
            store.dispatch({ type: actionsTypes.GET_CATEGORIES, categories: ['animal'] });
            const component = mount(shallow(
                <Provider store={store}>
                    <CategoryList />
                </Provider>
            ).get(0));

            expect(component.find('CategoryList ul CategoryItem').length).toEqual(1);
        });
    });
});