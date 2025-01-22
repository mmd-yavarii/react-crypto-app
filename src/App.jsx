import { useState, useEffect } from 'react';
import styles from './styles/app.module.css';
import AddPage from './Components/AddPage';
import Contact from './Components/Contact';

function App() {
    const [showPage, setShowPage] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({});

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
        const isNotEmpty = Object.values(newContact).every(
            (item) => item.length,
        );
        if (isNotEmpty) {
            const id = Date.now() + Math.floor(Math.random() * 1000);
            const contactWithId = { ...newContact, id };
            setContacts((prevContacts) => [...prevContacts, contactWithId]);
            setNewContact({});
        } else {
            alert('Please fill in all fields before adding a contact.');
        }
    }

    return (
        <div>
            <h1 style={{ margin: '1em 0.3em' }}>Contacts</h1>

            {/* contacts containerr */}
            <div className={styles.contactsContainer}>
                {contacts.length ? (
                    contacts.map((item) => (
                        <Contact info={item} key={item.id} />
                    ))
                ) : (
                    <p>Empty</p>
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
