import { useState, useEffect } from 'react';
import styles from './styles/app.module.css';
import AddPage from './Components/AddPage';
import Contact from './Components/Contact';
import EmptyMessage from './Components/EmptyMassage';
import Alert from './Components/Alert';

function App() {
    const [showPage, setShowPage] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({});

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: false,
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

    // add new contact
    function addContact() {
        if (Object.keys(newContact).length > 2) {
            const id = Date.now() + Math.floor(Math.random() * 1000);
            const contactWithId = { ...newContact, id };
            setContacts((prevContacts) => [...prevContacts, contactWithId]);
            setNewContact({});
            setAlert({
                show: true,
                message: 'Contact added succesfuly',
                type: true,
            });
            setTimeout(() => setAlert({}), 1000);
        } else {
            setAlert({
                show: true,
                message: 'Please fill in all fields before adding a contact.',
                type: false,
            });
            setTimeout(() => setAlert({}), 1000);
        }
    }

    return (
        <div>
            {alert.show && <Alert message={alert.message} type={alert.type} />}
            <h1 style={{ margin: '1em 0.3em' }}>Contacts</h1>
            {/* contacts containerr */}
            <div className={styles.contactsContainer}>
                {contacts.length ? (
                    contacts.map((item) => (
                        <Contact info={item} key={item.id} />
                    ))
                ) : (
                    <EmptyMessage />
                )}
            </div>
            {/* add contact page */}
            {showPage && (
                <AddPage
                    id="page"
                    inpHandler={inpSetter}
                    btnHandler={addContact}
                />
            )}
            {/* open add contact page */}
            <button className={styles.addBtn} onClick={showAddPage}>
                +
            </button>
        </div>
    );
}

export default App;
