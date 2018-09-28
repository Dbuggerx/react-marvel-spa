// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import './ErrorMessage.scss';

type Props = {
    message: string,
};

/**
 * Renders an error message
 */
const ErrorMessage: StatelessFunctionalComponent<Props> = (props: Props) => (
    <div className="error-message">
        <div className="error-message__description">
            <h1>{props.message}</h1>
        </div>
    </div>
);

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
