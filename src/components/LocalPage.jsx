import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import React, { useEffect, useRef, useState } from 'react'
import {Row, Col, Table, Form, Button} from 'react-bootstrap'
import Mappage from './Mappage';

const LocalPage = () => {
    const [locals, setLocals] = useState([]);
    const [query, setQuery] = useState('인하대학교');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] = useState(false);

    const getLocal = async() => {
        const url="https://dapi.kakao.com/v2/local/search/keyword.json";
        const config={
            headers: {"Authorization": "KakaoAK b5f172f67829ad1c75f139bb7413db11"},
            params: {query: query, page:1, size:5}
        }
        
        const result= await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_end();
    }

    useEffect(()=>{   //페이지가 렌더링될때 호출
        getLocal();
    }, [page]);             //[]은 처음 한번만 호출하게 한다

    const onSearch = (e) => {
        e.preventDefault();
        getLocal();
    }
    return (
        <Row>
            <Row>
                <Col>
                    <h1 className='text-center my-5'>지역검색</h1>
                    <Row className='my-2'>
                        <Col md={3} xs={6}>
                            <Form onSubmit={onSearch}>
                                <Form.Control value={query}
                                    onChange={(e)=>setQuery(e.target.value)}
                                    placeholder='검색어' />
                            </Form>
                        </Col>
                        <Col>
                            <h3>검색수 {total}</h3>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <td>장소명</td>
                                <td>주소</td>
                                <td>전화번호</td>
                                <td>위치</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local=>
                            <tr key={local.id}>
                                <td>{local.place_name}</td>
                                <td>{local.phone}</td>
                                <td>{local.adress_name}</td>
                                <td><Mappage local={local}/></td>
                            </tr>    
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center my-2'>
                        <Button
                            disabled={page==1} 
                            onClick={()=>setPage(page-1)}>이전</Button>
                        <span className='mx-3'>{page}</span>
                        <Button 
                            disabled = {is_end && true}
                            onClick={()=>setPage(page+1)}>다음</Button>
                    </div>
                </Col>
            </Row>
            
            
        </Row>
    )
}

export default LocalPage