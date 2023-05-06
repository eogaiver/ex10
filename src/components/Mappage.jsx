import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Map, MapMarker} from 'react-kakao-maps-sdk';

const Mappage = ({local}) => {
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ec58908cb6aa353cf6a585e77f4eb233"></script>
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" className='btn-sm'
                 onClick={handleShow}>위치보기</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>{local.place_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Map center={{ lat: local.y, lng: local.x }} style={{ width: "100%", height: "360px" }}>
                        <MapMarker position={{ lat: local.y, lng: local.x }}>
                            <div style={{ color: "#000" }}>{local.address_name}</div>
                        </MapMarker>
                    </Map>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}

export default Mappage