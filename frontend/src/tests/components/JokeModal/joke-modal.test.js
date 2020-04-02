/**
 * @jest-environment jsdom
 */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import JokeModal from '../../../app/components/JokeModal';
import { createStore, applyMiddleware } from 'redux';
import * as actionsTypes from '../../../app/actions/actionsTypes';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../../app/reducers';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
configure({ adapter: new Adapter() });

describe('JokeModalComponent', () => {
    const renderer = new ShallowRenderer();

    describe('Snapshots', () => {
      it('Should be a simple JokeModalComponent with loadingTemplate', () => {
        const component = renderer.render(
            <Provider store={store}>
                <JokeModal />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
      });
    });

    describe('Functions and Branches', () => {
        it('Should be a JokeModalComponent with loadingTemplate', () => {
            const component = mount(shallow(
                <Provider store={store}>
                    <JokeModal />
                </Provider>
            ).get(0));

            expect(component.find('JokeModal img').length).toEqual(1);
        });

        it('Should be a JokeModalComponent with jokeTemplate', () => {
            const joke = {
                categories: ['animal'],
                value: 'The joke text'
            };
            store.dispatch({ type: actionsTypes.GET_JOKE, joke });

            const component = mount(shallow(
                <Provider store={store}>
                    <JokeModal />
                </Provider>
            ).get(0));

            expect(component.find('.modal-title').text()).toEqual('animal');
        });

        it('Should be execute getAnotherJoke function and change joke value', () => {
            let joke = {
                categories: ['animal'],
                value: 'The joke text'
            };
            store.dispatch({ type: actionsTypes.GET_JOKE, joke });

            const component = mount(shallow(
                <Provider store={store}>
                    <JokeModal />
                </Provider>
            ).get(0));

            expect(store.getState().joke.value).toEqual('The joke text');

            store.dispatch({
                type: actionsTypes.GET_JOKE,
                joke: Object.assign(joke, { value: 'Another joke' })
            });

            const spyGetJoke = spyBuilder(component,'JokeModal', 'getJoke');
            const spyGetAnotherJoke = spyBuilder(component,'JokeModal', 'getAnotherJoke');
            const spyGetFirstCategory = spyBuilder(component,'JokeModal', 'getFirstCategory');
            component.find('#loadAnotherJoke').simulate('click');

            expect(spyGetJoke).toBeCalled();
            expect(spyGetAnotherJoke).toBeCalled();
            expect(spyGetFirstCategory).toBeCalled();
            expect(store.getState().joke.value).toEqual('Another joke');
        });

        it('Should be execute getJokePreviousCategory function with previous categories argument value', () => {
            const categories = ['animal', 'career'];
            const joke = {
                categories: ['career'],
                value: 'The joke text'
            };
            store.dispatch({ type: actionsTypes.GET_JOKE, joke });
            store.dispatch({ type: actionsTypes.GET_CATEGORIES, categories });

            const component = mount(shallow(
                <Provider store={store}>
                    <JokeModal />
                </Provider>
            ).get(0));

            const spyGetJokePreviousCategory = spyBuilder(component,'JokeModal', 'getJokePreviousCategory');
            const spyGetCategoryByIndex = spyBuilder(component,'JokeModal', 'getCategoryByIndex');
            const spyGetJoke = spyBuilder(component,'JokeModal', 'getJoke');
            component.find('#previousJokeCategory').simulate('click');

            expect(spyGetCategoryByIndex).toBeCalled();
            expect(spyGetJokePreviousCategory).toBeCalled();
            expect(spyGetJoke).toHaveBeenCalledWith('animal');
        });

        it('Should be execute getJokeNextCategory function with next categories argument value', () => {
            const categories = ['animal', 'career'];
            const joke = {
                categories: ['career'],
                value: 'The joke text'
            };
            store.dispatch({ type: actionsTypes.GET_JOKE, joke });
            store.dispatch({ type: actionsTypes.GET_CATEGORIES, categories });

            const component = mount(shallow(
                <Provider store={store}>
                    <JokeModal />
                </Provider>
            ).get(0));

            const spyGetJokeNextCategory = spyBuilder(component,'JokeModal', 'getJokeNextCategory');
            const spyGetCategoryByIndex = spyBuilder(component,'JokeModal', 'getCategoryByIndex');
            const spyGetJoke = spyBuilder(component,'JokeModal', 'getJoke');
            component.find('#nextJokeCategory').simulate('click');

            expect(spyGetCategoryByIndex).toBeCalled();
            expect(spyGetJokeNextCategory).toBeCalled();
            expect(spyGetJoke).toHaveBeenCalledWith('animal');
        });

        it('Should be execute getJokePreviousCategory function and turn to the last category value', () => {
            const categories = ['animal', 'career'];
            const joke = {
                categories: ['animal'],
                value: 'The joke text'
            };
            store.dispatch({ type: actionsTypes.GET_JOKE, joke });
            store.dispatch({ type: actionsTypes.GET_CATEGORIES, categories });

            const component = mount(shallow(
                <Provider store={store}>
                    <JokeModal />
                </Provider>
            ).get(0));

            const spyGetJoke = spyBuilder(component,'JokeModal', 'getJoke');
            component.find('#previousJokeCategory').simulate('click');

            expect(spyGetJoke).toHaveBeenCalledWith('career');
        });
    });
});

function spyBuilder(component, wrapperName, method) {
    return jest.spyOn(component.find(wrapperName).instance(), method);
}