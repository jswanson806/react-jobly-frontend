import React from "react";
import {render} from '@testing-library/react';
import NotFound from "../NotFound.js";

describe('NotFound smoke and snapshot', () => {

    it('should render without crashing', async () => {
       render(<NotFound />)
    });

    it('should match the snapshot', async () => {
        const {asFragment} = render(<NotFound />);
        expect(asFragment()).toMatchSnapshot();
    });

});