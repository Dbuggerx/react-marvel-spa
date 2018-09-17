// @flow

import React from 'react';

type Props = {
    message: string,
};

const ErrorMessage = (props: Props) => (<h1>{props.message}</h1>);

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
