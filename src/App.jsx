import { useState, useEffect } from 'react';
import styles from './styles/app.module.css';
import AddPage from './Components/AddPage';

function App() {
    const [showPage, setShowPage] = useState(false);
    const [contacts, setContacts] = useState([
        {
            id: 0,
            name: 'mohammad',
            phoneNumber: 764321,
            email: 'mmdYvar@djs.com',
        },
    ]);
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    // Hide add page when clicking outside
    useEffect(() => {
        function handleOutsideClick(event) {
            const page = document.getElementById('page');
            if (page && !page.contains(event.target)) {
                setShowPage(false);
            }
        }
        if (showPage) {
            document.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showPage]);

    // Show add page
    function showAddPage(event) {
        event.stopPropagation();
        setShowPage(true);
    }

    // input setter
    function inpSetter(event) {
        const key = event.target.name;
        const value = event.target.value;
        setNewContact((pre) => ({ ...pre, [key]: value }));
    }

    return (
        <div>
            <h1 style={{ margin: '1em 0.3em' }}>Contacts</h1>
            {showPage && (
                <AddPage
                    id="page"
                    inpHandler={inpSetter}
                    btnHandler={() => console.log(newContact)}
                />
            )}

            <button className={styles.addBtn} onClick={showAddPage}>
                +
            </button>
        </div>
    );
}

export default App;
