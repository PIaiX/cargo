import React from 'react';
import {Modal} from "react-bootstrap";
import {IoCloseOutline} from 'react-icons/io5';

const CustomModal = (props) => {
    const handleClose = () => props.setIsShow(false)

    return (
        <Modal
            className={props.className ?? ''}
            show={props.isShow}
            onHide={handleClose}
            backdrop={props.backdrop ?? true}
            data-bs-backdrop={false}
            centered={props.centered ?? true}
            size={props.size ?? null}
        >
            <Modal.Body>
                <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                >
                    <IoCloseOutline />
                </button>
                {props.children}
            </Modal.Body>
        </Modal>
    );
};

export default CustomModal;