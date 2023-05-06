import React, { useState } from 'react'
import {Row, Col, Form, InputGroup, Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {app} from '../firebaseinit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'  

const LoginPage = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
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
    const onClickLogin = () => {
        if(email === '' || password === ''){
            alert('이메일 또는 비밀번호를 입력하세요.');
        }else{
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
            .then(success=>{
                sessionStorage.setItem('email', email);
                history.push('/');
                setLoading(false);
                alert("성공")
            })
            .catch(error=>{
                setLoading(false);
                alert("에러:" + error.message);
            });
            
        }
    }
    if (loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <Row className='justify-content-center my-5'>
            <Col md={5}>
                <h1 className='text-center mb-5'>로그인</h1>
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
                        <div className='text-center my-3'>
                            <Button onClick={onClickLogin}
                                className='w-100'>로그인</Button>
                        </div>    
                    </Form>
                    <div className='text-end'>
                        <Link to="/join">회원가입</Link>
                    </div>
                </Card>    
            </Col>
        </Row>
    )
}

export default LoginPage