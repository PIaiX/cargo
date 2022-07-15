import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {IoCloseOutline} from 'react-icons/io5';

const CustomOffcanvas = (props) => {

    const handleClose = () => props.setIsShow(false)

    return (
        <Offcanvas
            className={props.className ?? ''}
            show={props.isShow}
            onHide={handleClose}
            backdrop={props.backdrop ?? true}
            data-bs-backdrop={false}
            scroll={props.scroll ?? false}
            enforceFocus={props.enforceFocus}
            placement={props.placement ?? 'start'}
        >
            <Offcanvas.Header closeButton>
                {props?.closeButton &&
                    <button
                        type="button"
                        className="btn-close"
                        onClick={handleClose}
                    >
                        <IoCloseOutline />
                    </button>
                }
                {props?.titleHead ? <h3>{props?.titleHead}</h3> : null}
                {props?.titleBody ? <p>{props?.titleBody}</p> : null}
            </Offcanvas.Header>
            <Offcanvas.Body>
                {props.children}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CustomOffcanvas;