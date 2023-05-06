import React, { useState, useEffect } from 'react'
import {Row, Col, Card, Form, Button, InputGroup} from 'react-bootstrap'

const Mypage = () => {
    const [form, setForm] = useState({
        name:'무기명',
        phone: '010-1010-1010',
        address: '인천 서구 경서동',
        image: 'https://via.placeholder.com/200x200',
    });
    const  {name, address, phone, image} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const onChangeFile = (e) => {
        setForm({
          ...form,
          image: URL.createObjectURL(e.target.files[0]),
        })
      }
    return (
        <Row>
            <Col>
                <h1>회원정보</h1>
                <Card>
                    <Form>
                        <InputGroup>
                            <InputGroup.Text> 이메일 </InputGroup.Text>
                            <Form.Control readOnly 
                                value={sessionStorage.getItem("email")}/>                        
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text> 이름 </InputGroup.Text>
                            <Form.Control name="name" onChange={onChange} value={name}/>                        
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text> 전화 </InputGroup.Text>
                            <Form.Control name="phone" onChange={onChange} value={phone}/>                        
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text> 주소 </InputGroup.Text>
                            <Form.Control name="address" onChange={onChange} value={address}/>                        
                        </InputGroup>
                        <div>
                            <img className='my-2' 
                                src={image} width="25%"/>
                            <Form.Control type="file"/>
                        </div>
                        <Button 
                            className='px-5'>정보수정</Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Mypage