jest.unmock('../src/resources/components/ui-kit/Button.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Button from '../src/resources/components/ui-kit/Button.js';

describe('<Button />', () => {
	it('should render an <a>', () => {
		const wrapper = shallow(<Button href={ '/home' } />);
		expect(wrapper.find(a)).to.have.length(1);
	});
});