// @flow
import React, { Component } from 'react';
import './Modal.scss';
import './NoScroll.scss';

type Props = {
    children: any,
    title: string,
    onClose: () => void,
};

export default class Modal extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.closeButton = React.createRef();
        this.container = React.createRef();
    }

    componentDidMount() {
        this.previouslyActiveElement = document.activeElement;
        if (this.closeButton.current) this.closeButton.current.focus();
        window.addEventListener('keyup', this.handleCloseKeyUp);
        window.addEventListener('focus', this.handleFocus, true);
        if (document.body) document.body.classList.add('no-scroll');
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleCloseKeyUp);
        window.removeEventListener('focus', this.handleFocus, true);
        if (document.body) document.body.classList.remove('no-scroll');
        if (this.previouslyActiveElement) this.previouslyActiveElement.focus();
    }

    closeButton: *;
    container: *;
    previouslyActiveElement: ?HTMLElement;

    handleCloseKeyUp = (event: SyntheticKeyboardEvent<*>) => {
        const escapeKey = 'key' in event ? event.key === 'Escape' || event.key === 'Esc' : event.keyCode === 27;
        if (escapeKey) this.props.onClose();
    };

    handleFocus = (event: SyntheticEvent<*>) => {
        if (
            event.target !== event.currentTarget &&
            this.container.current &&
            this.closeButton.current &&
            !this.container.current.contains(event.target)
        ) {
            this.closeButton.current.focus();
        }
    };

    render() {
        return (
            <div className="modal modal--opened">
                <dialog
                    open
                    className="modal__container"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-content"
                    ref={this.container}
                >
                    <button
                        type="button"
                        className="modal__close"
                        aria-label="Close"
                        onKeyUp={this.handleCloseKeyUp}
                        onClick={this.props.onClose}
                        tabIndex="0"
                        ref={this.closeButton}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal__title" id="modal-title">
                        {this.props.title}
                    </div>
                    <div className="modal__content" id="modal-content">
                        {this.props.children}
                    </div>
                </dialog>
            </div>
        );
    }
}
