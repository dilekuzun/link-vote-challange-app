import React from 'react';
import renderer from 'react-test-renderer';
import VoteItem from './voteItem';
import Enzyme, {shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {cleanup} from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

it('render without crashing', () => {
    const component = renderer.create(
        <VoteItem/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe("should handle state changes", () => {
    const props = {
        voteLinkItem: {},
        handleDownVoteBtnClick: jest.fn(),
        handleUpVoteBtnClick: jest.fn(),
        handleDeleteBtnClick: jest.fn(),
    }

    it('should handle state changes when delete button clicked', () => {

        const output = shallow(
            <VoteItem />
        );

        expect(output.state().confirmOpen).toEqual(false);
        output.find('#delete-vote-btn').simulate('click');
        expect(output.state().confirmOpen).toEqual(true);
    });

    it('should handle state changes when upvote button clicked', () => {

        const output = shallow(
            <VoteItem />
        );

        const valueBefore = output.find('#item-info-point').value();
        output.find('#up-vote-btn').simulate('click');
        expect(valueBefore + 1).toBe(output.find('#item-info-point').value());
    });

    it('should handle state changes when downvote button clicked', () => {

        const output = shallow(
            <VoteItem />
        );

        const valueBefore = output.find('#item-info-point').value();
        output.find('#udown-vote-btn').simulate('click');
        expect(valueBefore - 1).toBe(output.find('#item-info-point').value());
    });

});