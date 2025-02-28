import { Routes, Route } from 'react-router-dom';
import { setMetaThemColor } from './helpers/helper.js';
import HomePage from './pages/HomePage.jsx';
import Layout from './Layout/Layout';
import FavoritesProvider from './contexts/FavoritesProvider.jsx';
import CurrencyProvider from './contexts/CurrencyProvider.jsx';
import IsLoginProvider from './contexts/IsLoginProvider.jsx';
import PageNotFound from './pages/404/404.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

import { useModal } from './helpers/useModal.jsx';
import Modal from './components/Modal/Modal.jsx';

setMetaThemColor();

function App() {
    // use modul config (helper)
    const { modal, showCoinInfo, modalCloser } = useModal();

    return (
        <>
            <Layout>
                {modal.show && (
                    <Modal
                        content={modal.content}
                        closeModalHandler={modalCloser}
                    />
                )}

                <Routes>
                    <Route
                        path="/"
                        element={<HomePage showCoinInfo={showCoinInfo} />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="dashboard"
                        element={<Dashboard showCoinInfo={showCoinInfo} />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
