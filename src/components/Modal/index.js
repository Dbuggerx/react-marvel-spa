// @flow

import React, { Component } from 'react';
import './Modal.scss';
import './NoScroll.scss';

type Props = {
    children: any,
    title: string,
    close: () => void,
};

export default class Modal extends Component<Props> {
    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp);
        if (document.body) document.body.classList.add('no-scroll');
    }

    componentWillUnmount() {
        if (document.body) document.body.classList.remove('no-scroll');
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyUp = (event: SyntheticKeyboardEvent<*>) => {
        const escapeKey = 'key' in event ? event.key === 'Escape' || event.key === 'Esc' : event.keyCode === 27;
        if (escapeKey) this.props.close();
    };

    render() {
        return (
            <div className="modal modal--opened">
                <div className="modal__container">
                    <button
                        type="button"
                        className="modal__close"
                        aria-label="Close"
                        onKeyUp={this.handleKeyUp}
                        onClick={this.props.close}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal__title">{this.props.title}</div>
                    <div className="modal__content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}
