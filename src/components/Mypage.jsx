import React, { useState, useEffect } from 'react'
import {Row, Col, Card, Form, Button, InputGroup} from 'react-bootstrap'
import {app} from "../firebaseinit"
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
const Mypage = () => {
    const [loading, setLoading] = useState(false)
    const uid=sessionStorage.getItem("uid");
    const db=getFirestore(app);
    const [image, setImage] = useState('https://via.placeholder.com/200x200');
    
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        name:'무기명',
        phone: '010-1010-1010',
        address: '인천 서구 경서동',
        photo: '',
    });
    const  {name, address, phone, photo} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const onChangeFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setForm({
          ...form,
          image: URL.createObjectURL(e.target.files[0]),
        });
        setFile(e.target.files[0]);
    }
    const getUser = async() => {
        setLoading(true)
        const user = await getDoc(doc(db, 'user', uid));
        console.log(user.data());
        setForm(user.data());
        setLoading()
    }
    
    //onSave 
    const onUpdate = () => {
        if (!window.confirm('수정된내용을 저장하실래요?')) return;
        setDoc(doc(db, 'user', uid), form)
    }


    useEffect(()=>{
        getUser();
    }, []);
    if(loading) return <h1>로딩중...</h1>
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
                            <Form.Control onChange={onChangeFile} type="file"/>
                        </div>
                        <Button onClick={onUpdate}
                            
                            className='px-5'>정보수정</Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Mypage