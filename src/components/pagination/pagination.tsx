import React, {useState} from 'react';
import './pagination.scss';
import previous from "../../statics/icons/previous.svg";
import next from "../../statics/icons/next.svg";

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    const [pageNum, setPageNum] = useState(1);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        // @ts-ignore
        pageNumbers.push(i);
    }

    function handlePreviousBtnClick() {
        if (pageNum - 1 >= 1) {
            paginate(pageNum - 1);
            setPageNum(pageNum - 1);
        }
    }

    function handleNextBtnClick() {
        if (pageNum + 1 <= pageNumbers.length) {
            paginate(pageNum + 1);
            setPageNum(pageNum + 1);
        }
    }

    return (
        <nav>
            <div className='pagination'>
                <span className='page-previous' onClick={handlePreviousBtnClick}>
                    <img className="previous-icon" src={previous} alt="Previous"/>
                </span>
                {pageNumbers.map(number => (
                    <div
                        key={number}
                        className={pageNum !== number ? 'page-item' : 'page-item--active'}
                        onClick={() => {
                            paginate(number);
                            setPageNum(number);
                        }
                        }
                    >
                        <span className='page-number'>{number}</span>
                    </div>
                ))}
                <span className='page-next' onClick={handleNextBtnClick}>
                    <img className="next-icon" src={next} alt="Next"/>
                </span>
            </div>
        </nav>
    );
};

export default Pagination;