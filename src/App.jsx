import { Routes, Route, Navigate } from 'react-router-dom';
import { setMetaThemColor } from './helpers/helper.js';

import HomePage from './pages/HomePage.jsx';
import Layout from './Layout/Layout';
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
                        element={<Navigate to="/explore/1" replace />}
                    />

                    <Route
                        path="/explore/:page"
                        element={<HomePage showCoinInfo={showCoinInfo} />}
                    />

                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/dashboard"
                        element={<Dashboard showCoinInfo={showCoinInfo} />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
