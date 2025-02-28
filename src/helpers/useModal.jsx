import { useState } from 'react';
import CoinPageInfo from '../components/CoinPageInfo/CoinPageInfo.jsx';
import Loading from '../components/Loading/Loading.jsx';
import ErrorPage from '../components/ErrorPage/ErrorPage.jsx';
import Modal from '../components/Modal/Modal.jsx';
import axios from 'axios';
import { getCoin } from '../services/apis.js';

export function useModal() {
    const [modal, setModal] = useState({
        show: false,
        content: 'hello',
    });

    const showCoinInfo = async (id) => {
        // set loading
        setModal({
            show: true,
            content: (
                <>
                    <Loading height="170px" />
                    <Loading height="50px" />
                    <Loading height="150px" />
                    <Loading height="39px" />
                    <Loading height="50px" />
                </>
            ),
        });

        try {
            const response = await axios.get(getCoin(id));
            const data = response.data;

            setModal({
                show: true,
                content: <CoinPageInfo info={data} />,
            });
        } catch (err) {
            setModal({
                show: true,
                content: <ErrorPage error={err.message} />,
            });
        }
    };

    const modalCloser = (e) => {
        if (e.target.classList.contains('close')) {
            setModal({ show: false, content: '' });
        }
    };

    return { modal, showCoinInfo, modalCloser };
}
