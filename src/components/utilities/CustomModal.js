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
            scrollable={props.scrollable ?? false}
            centered={props.centered ?? true}
            size={props.size ?? null}
        >
            <Modal.Header className={props?.classNameHeader ?? ''}>
                {props?.closeButton &&
                    <button
                        type="button"
                        className="btn-close m-2"
                        onClick={handleClose}
                    >
                        <IoCloseOutline />
                    </button>
                }
                {props?.titleHead ? <h3>{props?.titleHead}</h3> : null}
                {props?.titleBody ? <p>{props?.titleBody}</p> : null}
            </Modal.Header>
            <Modal.Body className={props?.classNameBody || ''}>
                {props.children}
            </Modal.Body>
        </Modal>
    );
};

export default CustomModal;