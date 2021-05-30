import React, {useEffect, useState} from "react";
import {fromJS, List, Map} from "immutable";
import {INotificationMessage, IOption, IVoteLinkItem} from "../../interfaces/interfaces";
import plus from "../../statics/icons/plus.svg";
import {useHistory} from "react-router";
import VoteItem from "../../components/voteItem/voteItem";
import CustomizedSnackbars from "../../components/customizedSnackbar/customizedSnackbars";
import Pagination from "../../components/pagination/pagination";
import SimpleSelect from "../../components/select/simpleSelect";
import {orderPlaceHoler, submitLinkTxt} from "../../statics/termConstants";
import {convertBackToDate} from "../../utils/utilities";
import './voteLinkMain.scss';

function VoteLinkMain(props: any) {
    const [voteLinkList, setVoteLinkList] = useState(List<Map<keyof IVoteLinkItem, any>>());
    useEffect(() => {
        // get votelink list in local storage
        if (localStorage.getItem('voteLinkList') !== null){
            const newVLL = JSON.parse(localStorage.getItem('voteLinkList') as string);
            setVoteLinkList(fromJS(newVLL).sort((item1, item2) => {
                // @ts-ignore
                return convertBackToDate(item1.get('linkAddDate')) - convertBackToDate(item2.get('linkAddDate'));
            }).reverse());

        }
    }, []);
    const [error, setError] = useState('');
    const [notification, setNotification] = useState(Map<keyof INotificationMessage, string>());
    const [openNotification, setOpenNotification] = useState(false);
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    console.log('indexOfLastPost:', indexOfLastPost);
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    console.log('indexOfFirstPost:', indexOfFirstPost);
    console.log('voteLinkList:', voteLinkList.toJS());
    console.log('curVoteLinkList:', voteLinkList.slice(indexOfFirstPost, indexOfLastPost).toJS());
    const curVoteLinkList: List<Map<keyof IVoteLinkItem, any>> = voteLinkList.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [orderOption, setOrderOption] = useState(Map<keyof IOption, any>().set('optionId', 1).set('optionName', 'Order By')); // default
    const options: List<Map<keyof IOption, any>> = List<Map<keyof IOption, any>>()
        .push(Map<keyof IOption, any>().set('optionId', 1).set('optionName', 'Order By'))
        .push(Map<keyof IOption, any>().set('optionId', 2).set('optionName', 'Most Voted (Z -> A)'))
        .push(Map<keyof IOption, any>().set('optionId', 3).set('optionName', 'Most Voted (A -> Z)'));

    function handlePlusClick() {
        history.push("/add");
    }

    function handleDeleteBtnClick(index: number) {
        const deleteIndexInVoteLinkList = findVoteLinkIdByIndex(index);
        console.log('deleteIndexInVoteLinkList:', deleteIndexInVoteLinkList);
        setVoteLinkList(voteLinkList.remove(deleteIndexInVoteLinkList));
        setNotification(Map<keyof INotificationMessage, string>()
            .set('msgSeverity', "success").set('message', voteLinkList.get(index, Map<keyof IVoteLinkItem, string>())?.get('linkName') + ' deleted!'));
        setOpenNotification(true);
        console.log('handleDeleteBtnClick calıstı', index);
        setLocalStorage();
    }

    function handleUpVoteBtnClick(index: number) {
        setVoteLinkPointByIndex(index, 1);
        console.log('handleUpVoteBtnClick calıstı', index);
        setLocalStorage();
    }

    function handleDownVoteBtnClick(index: number) {
        setVoteLinkPointByIndex(index, -1);
        console.log('handleDownVoteBtnClick calıstı', index);
        setLocalStorage();
    }

    function setVoteLinkPointByIndex(index: number, pointToChange: number){
        const tmpVoteLink: Map<keyof IVoteLinkItem, any> = voteLinkList.filter(voteLink => voteLink.get('linkId') === curVoteLinkList.get(index, Map<keyof IVoteLinkItem, any>()).get('linkId')).get(0, Map<keyof IVoteLinkItem, any>());
        const voteLinkIdx = tmpVoteLink.get('linkId', -1);
        if (voteLinkIdx !== -1) {
            let vLPoint: number = tmpVoteLink.get('linkPoint', 0);
            setVoteLinkList(voteLinkList.setIn([voteLinkList.findIndex( e => e.get('linkId') === voteLinkIdx), 'linkPoint'],vLPoint + pointToChange));
        }
    }

    function findVoteLinkIdByIndex(index: number) {
        const item: Map<keyof IVoteLinkItem, any> = voteLinkList
            .filter(voteLink => voteLink.get('linkId') === curVoteLinkList.get(index, Map<keyof IVoteLinkItem, any>()).get('linkId'))
            .get(0, Map<keyof IVoteLinkItem, any>());
        return voteLinkList.findIndex( e => e.get('linkId') === item.get('linkId'));
    }

    function setLocalStorage() {
        localStorage.setItem('voteLinkList', JSON.stringify(voteLinkList.toJS()));
        // set votelink list in local storage
    }

    return (
        <>
            <CustomizedSnackbars
                msgSeverity={notification.get('msgSeverity')}
                message={notification.get('message')}
                openNotification={openNotification}
                setOpenNotification={(isOpen: boolean) => setOpenNotification(isOpen)}/>
            <div className="app-votelink-main">
                <button className="submit-btn" onClick={handlePlusClick}>
                    <img className="plus-icon" src={plus} alt="Plus"/>
                    <b>{submitLinkTxt}</b>
                </button>
                <hr/>
                <SimpleSelect
                    placeHolder={orderPlaceHoler}
                    selectedValue={orderOption}
                    setSelectedValue={(option: Map<keyof IOption, string>) => {
                        setOrderOption(option);
                        if (option.get('optionId', 1) === Number(2))
                        setVoteLinkList(voteLinkList.sortBy((item) => item.get('linkPoint')));
                        else if (option.get('optionId', 1) === Number(3))
                            setVoteLinkList(voteLinkList.sortBy((item) => item.get('linkPoint')).reverse());
                        else { // default : order by add date
                            setVoteLinkList(voteLinkList.sort((item1, item2) => {
                                // @ts-ignore
                                return convertBackToDate(item1.get('linkAddDate')) - convertBackToDate(item2.get('linkAddDate'));
                            }).reverse());
                        }
                    }}
                    options={options}
                />
                <div className="item-list">
                    {curVoteLinkList.map((voteLinkItem: Map<keyof IVoteLinkItem, any>, index) => (
                        <VoteItem
                            key={index}
                            index={index}
                            voteLinkItem={voteLinkItem}
                            handleDeleteBtnClick={() => handleDeleteBtnClick(index)}
                            handleUpVoteBtnClick={() => handleUpVoteBtnClick(index)}
                            handleDownVoteBtnClick={() => handleDownVoteBtnClick(index)}
                        />
                    ))}
                </div>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={voteLinkList.size}
                    paginate={paginate}
                />
            </div>
        </>
    );
}

export default VoteLinkMain;
