import { useEffect, useState } from "react";
import { getProjectsApi } from "../../networks/project/projectApi";
import { Card, CardBody, CardTitle, CardText, CardHeader, Button, CardFooter, Badge, Collapse, Input, InputGroup, InputGroupText, Carousel, CarouselIndicators, CarouselControl, CarouselItem, CarouselCaption } from 'reactstrap';
import './ProjectMain.css';

const ProjectMain = () => {
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('createdAt');
    const [category, setCategory] = useState('');
    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        try {
            const data = await getProjectsApi(
                `/api/v1/project/search?page=${page}&size=${size}&sort=${sort}&category=${category}`,
                'GET',
                {});
            setProjects(data);
            console.log(data);
        } catch (e) {
            alert('fail get projects');
        }
    };

    const changeSort = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {
        getProjects();
    }, [size, page, sort, category]);

    return (
        <div className='category-style'>
            <Button
                color="primary"
                className='ct-button'
                onClick={changeSort}
                value='createdAt'
            >
                최신순
            </Button>
            {' '}
            <Button
                className='ct-button'
                color="info"
                outline
                onClick={changeSort}
                value='viewCount'
            >
                조회순
            </Button>
            {' '}
            <Button
                color="info"
                className='ct-button'
                outline
                onClick={changeSort}
                value='heartCount'
            >
                하트순
            </Button>
            <Button
                color="info"
                className='ct-button'
                outline
                onClick={changeCategory}
                value='createdAt'
            >
                내 기술 스택 모아보기
            </Button>
        </div>
    );
}

export default ProjectMain;