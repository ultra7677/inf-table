import JsonTable from './JsonTable'
import { shallow } from 'enzyme';
import React from 'react';

describe('<MyComponent />', () => {
    it('render without crash', () => {
        shallow(<JsonTable />)
    })

    it('render primitive array', () => {
        const json = ['a', 'aa', 'bbb', 'ccc']
        const table = shallow(<JsonTable data={json} />);
    })

    it('render a object', () => {
        const json = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            arr: ['a', 'aa', 'bbb', 'ccc', { key4: 'value4' }, [1, 2, 3]]
        }
        const table = shallow(<JsonTable data={json} />);
    })
})