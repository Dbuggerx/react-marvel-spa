// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';

type Props = {
    attribution: string,
};

/**
 * Renders general information data, like Marvel's logo, attribution text, etc
 */
const Information: StatelessFunctionalComponent<Props> = (props: Props) => (
    <aside>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214 86">
            <g fill="none" fillRule="evenodd">
                <path fill="#EC1D24" d="M0 86h214V0H0z" />
                <path
                    fill="#FEFEFE"
                    d="M207 66.005v12.938h-23.96V7h12.902v59.005H207zM104.622 42.279c-.999.48-2.042.72-3.059.723V19.864l.065-.002c1.017-.007 8.614.303 8.614 11.444 0 5.824-2.586 9.498-5.62 10.973zM66.809 56.482l3.573-30.762 3.706 30.762h-7.28zM180.79 20.13V7.011h-36.533l-6.014 43.82-5.94-43.82h-13.176l1.475 11.698c-1.52-2.997-6.912-11.698-18.785-11.698-.078-.005-13.191 0-13.191 0l-.05 63.87-9.603-63.87-17.254-.007-9.936 66.174.002-66.167H35.273L29.32 44.184 23.52 7.01H7v71.944h13.01V44.278l5.92 34.677h6.914l5.835-34.677v34.677h25.08l1.518-11.065h10.096l1.517 11.065 24.623.014h.018v-.014h.032V55.603l3.018-.44 6.247 23.806h12.737l-.004-.014H123.597l-8.2-27.898c4.153-3.075 8.846-10.872 7.598-18.331v-.004c.014.095 7.738 46.278 7.738 46.278l15.147-.045 10.353-65.208v65.208h24.557v-12.94h-11.657V49.52h11.657V36.382h-11.657V20.13h11.657z"
                />
            </g>
        </svg>
        <p>{props.attribution}</p>
    </aside>
);

Information.displayName = 'Information';

export default Information;
