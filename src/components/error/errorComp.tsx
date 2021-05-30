import React from "react";
import {err404, noPageInfo} from "../../statics/termConstants";
import './errorComp.scss';

export default () => {
    return (
        <div className="err-wrapper">
            <span className="err-wrapper-num-span">
            <b>{err404}</b>
            </span>
            <span className="err-wrapper-span">
                <b>{noPageInfo}</b>
            </span>
        </div>
    );
}
