import { PulseLoader } from 'react-spinners';

import { loadingColor } from '../../helpers/helper.js';

const loader = {
    overflow: 'hidden',
    width: '100%',
    height: '90%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100000',

    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',

    /* From https://css.glass */
    background: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5.4px)',
    WebkitBackdropFilter: 'blur(5.4px)',
};

function PageLoading() {
    return (
        <div style={loader}>
            <PulseLoader color={loadingColor} />
        </div>
    );
}

export default PageLoading;
