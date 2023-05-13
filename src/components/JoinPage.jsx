import React, { useState } from 'react'
import {Row, Col, Form, InputGroup, Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {app} from '../firebaseinit'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'  
import {getFirestore, doc, setDoc} from 'firebase/firestore'

const JoinPage = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email:'eogaiver@hanmail.net',
        password:'123123'
    });    
    const {email, password} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const onJoin = ({history}) => {
        if(!window.confirm('회원으로 등록하실래요?')) return;
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then(async success=>{
            // console.log('success....', success);
            const uid = success.user.uid;
            await setDoc(doc(db, 'user', uid), {
                email:email,
                name:'홍길동',
                address:'인천 서구 경서동',
                phone:'010-000-0000',
                photo:''
            });
            setLoading(false);
            history.push('/login');
        })
        .catch(error=>{
            setLoading(false);
            alert('에러:' + error.message);
        });
    }

    if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <Row className='justify-content-center my-5'>
            <Col md={5}>
                <h1 className='text-center mb-5'>회원가입</h1>
                <Card className='p-3'>
                    <Form>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>이메일</InputGroup.Text>
                            <Form.Control value={email} onChange={onChange}
                                name="email" />
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>비밀번호</InputGroup.Text>
                            <Form.Control onChange={onChange} name="password" 
                                value={password} type="password"/>
                        </InputGroup>
                        
                        <Button onClick={onJoin}
                            className='w-100'>회원가입</Button>
                            
                    </Form>
                    
                    <div className='text-end'>
                        <Link to="/join">로그인</Link>
                    </div>
                </Card>    
            </Col>
        </Row>
    )
}

export default JoinPage