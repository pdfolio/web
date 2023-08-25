import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, CardHeader, Button, CardFooter, Badge, Collapse, Input, InputGroup, InputGroupText, Carousel, CarouselIndicators, CarouselControl, CarouselItem, CarouselCaption } from 'reactstrap';
import './GatherMain.css';
import { gatherApiNoToken } from '../../networks/gather/gatherApi';
import { Link } from 'react-router-dom';


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
const GatherMain = ({ args }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



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
    // -------------------------------------------------------------여기부터 데이터 송신
    const skillNames = ["JAVA", "KOTLIN", "JAVASCRIPT", "TYPESCRIPT", 'PYTHON',
        "PHP", "SPRING", "NEST", "EXPRESS", "DJANGO", "LARAVEL",
        "REACT", "VUE", "NEXT", "NUXT", "ORACLE", "MYSQL", "POSTGRESQL",
        "AWS", "DOCKER", "GIT"];
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [skills, setSkills] = useState("");
    const [category, setCategory] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [confirmSkills, setConfirmSkills] = useState([]);
    const [all, setAll] = useState([]);

    const getAll = async () => {
        try {
            const data = await gatherApiNoToken(`/api/v1/gather` +
                `?page=${page}&size=${size}&keyword=${keyword}&category=${category}&skills=${skills}`, "GET");
            console.log(data)
            setAll(data);

        } catch (error) {
            console.log(error.response.data);
        }
    }
    useEffect(() => {
        getAll();
    }, [page, size, keyword, category, skills]);

    const changePage = (i) => {
        setPage(i);
    }

    const changeSize = (e) => {
        setSize(e.target.value);
        setPage(0);
    }

    const onClickCategoryHandler = (categoryName) => {
        if (categoryName === '전체') {
            setCategory("");
        } else {
            setCategory(categoryName);
        }
    }

    const onClickSkillHandler = (skill) => {
        const selectedSkills = skills.split(",");
        // if (selectedSkills.includes(skill)) {
        //     selectedSkills.filter(s => s !== skill)
        //     // setSelectedSkills(); // 이미 선택된 스킬이면 제거
        // } else {

        //     setSelectedSkills(); // 선택되지 않은 스킬이면 추가
        // }
        if (selectedSkills[0] === "") selectedSkills.pop()

        const filterSkill = selectedSkills.includes(skill) ?
            selectedSkills.filter(s => s !== skill)
            : [...selectedSkills, skill]
        setConfirmSkills(filterSkill)
        // console.log("filterSkill", filterSkill)

        const skillsString = filterSkill.join(',');
        setSkills(skillsString);
        // console.log("selectedSkills", selectedSkills)
    };
    // console.log("confirmSkills", confirmSkills)

    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const onClickSearchHandler = () => {
        setKeyword(searchText);
    };


    // -------------------------------------------------------------------------
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
            {/* <p>{all.totalElements} 개수</p>
            <p>{all.totalPages} 페이지</p> */}

            {/* {all.content?.map(
                    (c) => (
                        <div key={c.id}>{c.title}</div>
                    )
                )
            } */}


            {/* <div style={{ "margin-left": "3.5%;" }}> */}
            <div className='category-style'>
                <Button
                    color="primary"
                    className={`ct-button ${category === "" ? "button-choice" : ""}`}
                    outline
                    onClick={() => onClickCategoryHandler('전체')}
                >
                    전체
                </Button>
                {' '}
                <Button
                    className={`ct-button ${category === "PROJECT" ? "button-choice" : ""}`}
                    color="primary"
                    onClick={() => onClickCategoryHandler('PROJECT')}
                    outline
                >
                    프로젝트
                </Button>
                {' '}
                <Button
                    color="primary"
                    className={`ct-button ${category === "STUDY" ? "button-choice" : ""}`}
                    onClick={() => onClickCategoryHandler('STUDY')}
                    outline
                >
                    스터디
                </Button>

            </div>
            <div className='skill-style'>
                <InputGroup className="search-bar">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <InputGroupText addontype="append">
                        <Button color="primary" onClick={onClickSearchHandler}>Search</Button>
                    </InputGroupText>
                </InputGroup>
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
                {all.content?.map(
                    (c) => (
                        <Link to={`/gather/${c.id}`} >
                            <Card className="my-2 ccard" key={c.id}>
                                <CardHeader className='card-header2'>
                                    {/* <span className='last-day'>마감일: {c.closeDate}</span> */}
                                    <span className='last-day'>마감일:&nbsp;
                                        {c.closeDate.map((date, index) => (
                                            <span key={index} >
                                                {index !== 0 && '-'}
                                                {date}
                                            </span>
                                        ))}
                                    </span>
                                    <span className='img-location'><img width={'27px'} height={'27px'} src='https://cdn-icons-png.flaticon.com/128/889/889221.png'></img></span>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle tag="h5">
                                    </CardTitle>
                                    <CardText className="card-text-st ">
                                        <span className={c.category === "STUDY" ? "borderItem" : ""}>
                                            <img width={'28px'} height={'28px'} src='https://cdn-icons-png.flaticon.com/128/5956/5956494.png'></img>
                                        </span>
                                        &nbsp;&nbsp;&nbsp;
                                        <span className={c.category === "PROJECT" ? "borderItem" : ""}>
                                            <img width={'28px'} height={'28px'} src='https://cdn-icons-png.flaticon.com/128/950/950232.png'></img>
                                        </span>
                                        <br></br>
                                        <br></br>
                                        <span className='title1'>{c.title}</span>
                                    </CardText>
                                    {c.skills?.map((item, index) => (
                                        <Badge key={index} className='badge-location' color={index % 2 === 0 ? "info" : "primary"}>
                                            {item.skill}
                                        </Badge>
                                    ))}

                                    {/* color="info" "primary" */}

                                </CardBody>
                                <CardFooter className='card-footer2'>
                                    <span className='img-location2'><img width={'23px'} height={'23px'} src='https://cdn-icons-png.flaticon.com/128/2338/2338317.png'></img></span>
                                    &nbsp;
                                    <span className='id-size'>{c.memberName}</span>
                                    <span className='img-location3 side-size'><img width={'23px'} height={'23px'} src='https://cdn-icons-png.flaticon.com/128/4249/4249907.png'></img> 5</span>
                                    <span className='img-location4 side-size'><img width={'23px'} height={'23px'} src='https://cdn-icons-png.flaticon.com/128/64/64945.png'></img> 15</span>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                )
                }

            </div >
        </div >
    );
};

export default GatherMain;
