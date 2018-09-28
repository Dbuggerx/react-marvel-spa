// @flow

import React from 'react';
import type { StatelessFunctionalComponent, Element } from 'react';
import './MainLayout.scss';

type Props = {
    search: Element<*>,
    list: Element<*>,
    info: Element<*>,
    pagination: ?*,
};

/**
 * Wraps application sections with specific "slots"
 */
const MainLayout: StatelessFunctionalComponent<Props> = (props: Props) => (
    <div className="main-layout">
        <div className="main-layout__search">{props.search}</div>
        <div className="main-layout__list" tabIndex="-1">
            {props.list}
        </div>
        <div className="main-layout__pagination">{props.pagination}</div>
        <div className="main-layout__info">{props.info}</div>
    </div>
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;
