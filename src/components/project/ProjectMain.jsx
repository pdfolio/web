import { useEffect, useState } from "react";
import { getProjectsApi } from "../../networks/project/projectApi";
import { Card, CardBody, CardTitle, CardText, CardHeader, Button, CardFooter, Badge, Collapse, Input, InputGroup, InputGroupText, Carousel, CarouselIndicators, CarouselControl, CarouselItem, CarouselCaption } from 'reactstrap';
import './ProjectMain.css';
import { Link } from "react-router-dom";

const items = [
    {
        src: 'https://c.pxhere.com/photos/4b/3f/space_panorama_all_fantasy_star_infinity_forward-1380003.jpg!d',
        altText: '스터디를 가장 쉽게 모집할 수 있는 방법',
        caption: '스터디를 가장 쉽게 모집할 수 있는 방법 PDFOLIO',
        key: 1,
    },
    {
        src: 'https://cdn.pixabay.com/photo/2018/04/16/17/51/panorama-3325360_1280.jpg',
        altText: '프로젝트를 가장 쉽게 모집할 수 있는 방법',
        caption: '프로젝트를 가장 쉽게 모집할 수 있는 방법 PDFOLIO',
        key: 2,
    },
    {
        src: 'https://windowsforum.kr/files/attach/images/2966154/214/400/001/a4cb09e9cfc2102895c0e19a2dd132a5.jpg',
        altText: '스터디와 프로젝트를 가장 쉽게 모집할 수 있는 방법',
        caption: '스터디와 프로젝트를 가장 쉽게 모집할 수 있는 방법 PDFOLIO',
        key: 3,
    },
];

const ProjectMain = ({ args }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className="custom-tag"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <div className="carousel-image-container">
                    <img className="carousel-image" src={item.src} alt={item.altText} />
                </div>
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    const skillNames = ["JAVA", "KOTLIN", "JAVASCRIPT", "TYPESCRIPT", 'PYTHON',
        "PHP", "SPRING", "NEST", "EXPRESS", "DJANGO", "LARAVEL",
        "REACT", "VUE", "NEXT", "NUXT", "ORACLE", "MYSQL", "POSTGRESQL",
        "AWS", "DOCKER", "GIT"];
    const [skills, setSkills] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [confirmSkills, setConfirmSkills] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('createdAt');
    const [category, setCategory] = useState('');
    const [all, setAll] = useState([]);

    const getProjects = async () => {
        try {
            const data = await getProjectsApi(
                `/api/v1/project/search?page=${page}&size=${size}&sort=${sort}&category=${skills}`,
                'GET',
                {});
            setAll(data);
            console.log(data);
            console.log(all);
        } catch (e) {
            alert('fail get projects');
        }
    };

    const onClickCategoryHandler = (e) => {
        setSort(e.target.value);
    }

    const onClickSkillHandler = (skill) => {
        const selectedSkills = skills.split(",");
        if (selectedSkills[0] === "") selectedSkills.pop()

        const filterSkill = selectedSkills.includes(skill) ?
            selectedSkills.filter(s => s !== skill)
            : [...selectedSkills, skill]
        setConfirmSkills(filterSkill)

        const skillsString = filterSkill.join(',');
        setSkills(skillsString);
    };

    useEffect(() => {
        getProjects();
    }, [size, page, sort, category, skills]);

    return (
        <div>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                {...args}
            >
                <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>
            <div className='category-style'>
                <Button
                    color="primary"
                    className={`ct-button ${sort === "createdAt" ? "button-choice" : ""}`}
                    outline
                    onClick={(e) => onClickCategoryHandler(e)}
                    value='createdAt'
                >
                    최신순
                </Button>
                {' '}
                <Button
                    className={`ct-button ${sort === "viewCount" ? "button-choice" : ""}`}
                    color="info"
                    outline
                    onClick={(e) => onClickCategoryHandler(e)}
                    value='viewCount'
                >
                    조회순
                </Button>
                {' '}
                <Button
                    color="info"
                    className={`ct-button ${sort === "heartCount" ? "button-choice" : ""}`}
                    outline
                    onClick={(e) => onClickCategoryHandler(e)}
                    value='heartCount'
                >
                    하트순
                </Button>
            </div>
            <div className='skill-style'>
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
                    Skill
                </Button>
                <Collapse className='togle-style' isOpen={isOpen} {...args}>
                    <Card>
                        <CardBody>
                            {skillNames.map((skill, index) => (
                                <Badge key={index} onClick={() => onClickSkillHandler(skill)}
                                    className={confirmSkills.includes(skill) ? 'sill-badge-location skill-border' : 'sill-badge-location'}
                                    color="info">
                                    {skill}
                                </Badge>
                            ))}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
            <div className=" card-box" >
                {all.projects?.map(
                    (c) => (
                        <Link to={`/project/${c.id}`} >
                            <Card className="my-2 ccard" key={c.id}>
                                <CardHeader className='card-header2'>
                                    {/* <span className='last-day'>마감일: {c.closeDate}</span> */}
                                    <span className='last-day'>생성날짜:&nbsp;
                                        {c.createdAt.substring(0, 10)}
                                        {/* {c.createdAt.map((date, index) => (
                                            <span key={index} >
                                                {index !== 0 && '-'}
                                                {date}
                                            </span>
                                        ))} */}
                                    </span>
                                    <span className='img-location' ><img width={'27px'} height={'27px'} src='https://cdn-icons-png.flaticon.com/128/889/889221.png'></img></span>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle tag="h5">
                                    </CardTitle>
                                    <CardText className="card-text-st ">
                                        <span>
                                            <img width={'265'} height={'75px'} src={c.thumbnailUrl}></img>
                                        </span>
                                        <br></br>
                                        <span className='title1'>{c.title}</span>
                                        <br></br>
                                        <span className='title1'>{c.description}</span>
                                    </CardText>
                                    {c.skillStacks?.map((item, index) => (
                                        <Badge key={index} className='badge-location' color={index % 2 === 0 ? "info" : "primary"}>
                                            {item.skillName}
                                        </Badge>
                                    ))}

                                    {/* color="info" "primary" */}

                                </CardBody>
                                <CardFooter className='card-footer2'>
                                    <span className='img-location2'><img width={'23px'} height={'23px'} src={c.author.image}></img></span>
                                    &nbsp;
                                    <span className='id-size'>{c.author.nickName}</span>
                                    <span className='img-location3 side-size'><img width={'23px'} height={'23px'} src='https://cdn-icons-png.flaticon.com/128/4249/4249907.png'></img> {c.commentCount}</span>
                                    <span className='img-location4 side-size'><img width={'23px'} height={'23px'} src='https://cdn-icons-png.flaticon.com/128/64/64945.png'></img> {c.viewCount}</span>
                                    <span className='img-location4 side-size'><img width={'23px'} height={'23px'} src='https://cdn-icons-png.flaticon.com/128/535/535285.png'></img> {c.heartCount}</span>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                )
                }

            </div >
        </div>
    );
}

export default ProjectMain;