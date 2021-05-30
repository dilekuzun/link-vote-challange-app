import React, {useState} from "react";
import ConfirmDialog from '../confirmDialog/confirmDialog';
import {pointsTxt, removeQuestion} from "../../statics/termConstants";
import up from "../../statics/icons/up.svg";
import down from "../../statics/icons/down.svg";
import minus from "../../statics/icons/minus.png";
import './voteItem.scss';

function VoteItem(props: any) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <div className="item">
            <div className="item-point">
                <b><span className="item-info-point">{props.voteLinkItem.get('linkPoint', '-')}</span></b>
                <span>{pointsTxt}</span>
            </div>
            <div className="item-side">
                <div className="delete-vote">
                    <button className="delete-vote-btn" onClick={() => setConfirmOpen(true)}>
                        <img className="minus-icon" src={minus} alt="Delete" />
                    </button>
                </div>
                <div className="item-info">
                    <b><span className="item-info-name">{props.voteLinkItem.get('linkName', '-')}</span></b>
                    <span className="item-info-url">{props.voteLinkItem.get('linkUrl', '-')}</span>
                </div>
                <div className="item-vote-btn">
                    <button className="up-vote-btn" onClick={props.handleUpVoteBtnClick}>
                        <img className="up-icon" src={up} alt="Up" />
                        Up Vote
                    </button>
                    <button className="down-vote-btn" onClick={props.handleDownVoteBtnClick}>
                        <img className="down-icon" src={down} alt="Down" />
                        Down Vote
                    </button>
                </div>
            </div>
            <ConfirmDialog
                title="Delete Post"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={props.handleDeleteBtnClick}
            >
                {removeQuestion}
                <span className="delete-confirm-post-name"><b>{props.voteLinkItem.get('linkName', '-')}</b></span>
            </ConfirmDialog>
        </div>
    );
}

export default VoteItem;
