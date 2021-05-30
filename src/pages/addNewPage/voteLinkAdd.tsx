import React, {useState} from "react";
import {useHistory} from "react-router";
import {fromJS, List, Map} from "immutable";
import {INotificationMessage, IVoteLinkItem} from "../../interfaces/interfaces";
import CustomizedSnackbars from "../../components/customizedSnackbar/customizedSnackbars";
import {today} from "../../utils/utilities";
import {
    addButtonTxt,
    addLinkTxt,
    addVoteLinkError,
    addVoteLinkSuccess, linkNameTxt, linkUrlTxt,
    returnLinkTxt
} from "../../statics/termConstants";
import left from "../../statics/icons/back.svg";
import './voteLinkAdd.scss';

function VoteLinkAdd(props: any) {
    const history = useHistory();
    const [linkName, setLinkName] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [notification, setNotification] = useState(Map<keyof INotificationMessage, string>());
    const [openNotification, setOpenNotification] = useState(false);

    function handleBackClick() {
        history.push("/main");
    }

    function handleAddBtnClick() {
        if ((!!linkName && linkName !== '') && (!!linkUrl && linkUrl !== '')){
            addVoteLink(linkName, linkUrl);
            setNotification(Map<keyof INotificationMessage, string>()
                .set('msgSeverity', "success").set('message', linkName + addVoteLinkSuccess));
            setLinkName('');
            setLinkUrl('');
        }else {
            setNotification(Map<keyof INotificationMessage, string>()
                .set('msgSeverity', "error").set('message', addVoteLinkError));
        }
        setOpenNotification(true);
        console.log('handleAddBtnClick calıstı');
    }

    function addVoteLink(linkName: string, linkUrl: string) {
        const vLL: List<Map<keyof IVoteLinkItem, any>> = fromJS(JSON.parse(localStorage.getItem('voteLinkList') as string)) === null
            ? List<Map<keyof IVoteLinkItem, any>>() : fromJS(JSON.parse(localStorage.getItem('voteLinkList') as string));
        const lastVLLLinkId: number = vLL.get(vLL.size - 1, Map<keyof IVoteLinkItem, any>()).get('linkId');
        // get last index of votelink list in local storage -> find index
        console.log('vLL size:', vLL.size);
        const newVoteLink: Map<keyof IVoteLinkItem, any> = Map<keyof IVoteLinkItem, any>()
            .set('linkId', vLL.size !== 0 ? lastVLLLinkId + 1 : 0)
            .set('linkName', linkName)
            .set('linkUrl', linkUrl)
            .set('linkPoint', 0)
            .set('linkAddDate', today());
        // set votelink list in local storage
        localStorage.setItem('voteLinkList', JSON.stringify(vLL.push(newVoteLink).toJS()));
    }

    return (
        <>
            <CustomizedSnackbars
                msgSeverity={notification.get('msgSeverity')}
                message={notification.get('message')}
                openNotification={openNotification}
                setOpenNotification={(isOpen: boolean) => setOpenNotification(isOpen)}/>
            <div className="app-votelink-add-header">
                <button className="back-btn" onClick={handleBackClick}>
                    <img className="left-icon" src={left} alt="Left" />
                    {returnLinkTxt}
                </button>
                <span className="new-title"><b>{addLinkTxt}</b></span>
            </div>
            <div className="app-votelink-add">
                <div>
                    <span>{linkNameTxt}</span>
                    <input value={linkName} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => setLinkName(linkName + e.key)}></input>
                </div>
                <div>
                    <span>{linkUrlTxt}</span>
                    <input value={linkUrl} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => setLinkUrl(linkUrl + e.key)}></input>
                </div>
                <div>
                    <button className="add-btn" onClick={handleAddBtnClick}>
                        {addButtonTxt}
                    </button>
                </div>
            </div>
        </>
    );
}

export default VoteLinkAdd;
