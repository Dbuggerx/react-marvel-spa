// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';

type Props = {
    message: string,
};

const ErrorMessage: StatelessFunctionalComponent<Props> = (props: Props) => <h1>{props.message}</h1>;

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
