import React, { useEffect } from 'react';
import './DeleteModal.css';
import { useState } from 'react';

const CustomDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!password) {
            setError('Password is required');
            return;
        }
        try {
            await onConfirm(password);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <i className="fa-solid fa-times"></i>
                </button>

                <div className="modal-header">
                    <div className="modal-title">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <span>Delete Account</span>
                    </div>
                </div>

                <div className="modal-content">
                    <p className="modal-warning">
                        This action cannot be undone. Please note:
                    </p>
                    <ul className="modal-list">
                        <li className="modal-list-item">
                            <i className="fa-solid fa-circle"></i>
                            <span>Your account will be permanently deleted</span>
                        </li>
                        <li className="modal-list-item">
                            <i className="fa-solid fa-circle"></i>
                            <span>All your personal information will be removed</span>
                        </li>
                        <li className="modal-list-item">
                            <i className="fa-solid fa-circle"></i>
                            <span>You will not be refunded for any future appointments</span>
                        </li>
                        <li className="modal-list-item">
                            <i className="fa-solid fa-circle"></i>
                            <span>All your booking history will be deleted</span>
                        </li>
                    </ul>
                    <div className="password-section">
                        <label>Please enter your password to confirm:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="password-input"
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="modal-btn modal-btn-cancel" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                        <span>Cancel</span>
                    </button>
                    <button className="modal-btn modal-btn-delete" onClick={handleDelete} disabled={!password}>
                        <i className="fa-solid fa-trash-can"></i>
                        <span>Delete Account</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomDeleteModal;