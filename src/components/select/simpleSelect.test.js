import React from 'react';
import {render, cleanup, getByPlaceholderText} from '@testing-library/react';
import SimpleSelect from './simpleSelect';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

const props = {
    selectedValue: {},
    setSelectedValue: jest.fn(),
    options: [],
    placeHolder: "Order"
}

it('matches snapshot tests', () => {
    const tree = renderer.create(<SimpleSelect {...props} />).toJSON(); //vitual dom obejct
    expect(tree).toMatchSnapshot();
});

describe("render tests", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <SimpleSelect/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders without crashing given the required props', () => {
        const wrapper = shallow(<SimpleSelect {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});

it('check placeholder', () => {
    const {getByPlaceholderText} = render(<SimpleSelect {...props} />);
    expect(getByPlaceholderText("Order")).toHaveTextContent("Order");
});

