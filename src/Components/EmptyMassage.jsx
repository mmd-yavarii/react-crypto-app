function EmptyMessage() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '11em',
                flexDirection: 'column',
                gap: '0.5em',
            }}
        >
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/nothing-found.png"
                alt="nothing-found"
                style={{ opacity: '0.3' }}
            />

            <h1 style={{ opacity: '0.3', fontSize: '1.5rem' }}>Nothing!!</h1>
            <p style={{ opacity: '0.3' }}>your contact list is empty .</p>
        </div>
    );
}

export default EmptyMessage;
