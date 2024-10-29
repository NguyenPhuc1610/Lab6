import React from 'react';
import { Toast } from 'react-bootstrap';

function ToastComp({ showMessage, onClose, message, background }) {
    return (
        <Toast bg={background} show={showMessage} onClose={onClose} animation={true} style={{
            position: 'absolute', top: '5%', left: '100%',
            transform: 'translate(-50%, -50%)'
        }} autohide={true}>
            <Toast.Header>
                <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
    )
}

export default ToastComp;