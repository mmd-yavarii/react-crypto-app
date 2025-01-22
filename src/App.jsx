import { useState, useEffect } from 'react';
import styles from './styles/app.module.css';
import AddPage from './Components/AddPage';
import Contact from './Components/Contact';
import EmptyMessage from './Components/EmptyMassage';
import Alert from './Components/Alert';

function App() {
    const [contacts, setContacts] = useState(
        JSON.parse(localStorage.getItem('contacts')) || [],
    );
    const [showPage, setShowPage] = useState(false);
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

    // clear data
    function clearData() {
        if (contacts.length) {
            setContacts([]);
            setAlert({
                show: true,
                message: 'clear succesfuly.',
                type: true,
            });
        } else {
            setAlert({
                show: true,
                message: 'There is no contacts.',
                type: false,
            });
        }
        setTimeout(() => setAlert({}), 1000);
    }

    // sync with localStorage
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    // delete one contact
    function deleteContactHandler(id) {
        const updatedContacts = [...contacts];
        const index = updatedContacts.findIndex((i) => i.id == id);
        updatedContacts.splice(index, 1);

        setContacts(updatedContacts);
        setAlert({
            show: true,
            message: 'contact deleted succesfuly.',
            type: true,
        });
        setTimeout(() => setAlert({}), 1000);
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
        } else {
            setAlert({
                show: true,
                message: 'Please fill in all fields before adding a contact.',
                type: false,
            });
        }
        setTimeout(() => setAlert({}), 1000);
    }

    return (
        <>
            {alert.show && <Alert message={alert.message} type={alert.type} />}

            <div className={styles.header}>
                <h1>Contacts</h1>
                <button onClick={clearData} className={styles.clearBtn}>
                    clear
                </button>
            </div>

            {/* contacts containerr */}
            <div className={styles.contactsContainer}>
                {contacts.length ? (
                    contacts.map((item) => (
                        <Contact
                            info={item}
                            key={item.id}
                            deleteHandler={() => deleteContactHandler(item.id)}
                        />
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
        </>
    );
}

export default App;
