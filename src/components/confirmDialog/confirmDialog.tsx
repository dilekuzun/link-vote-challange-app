import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {noAnswer, yesAnswer} from "../../statics/termConstants";
import './confirmDialog.scss';

const ConfirmDialog = (props: any) => {
    const { title, children, open, setOpen, onConfirm } = props;
    return (
        <div className="confirm-dialog">
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                    color="secondary"
                >
                    {noAnswer}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                    color="default"
                >
                    {yesAnswer}
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};
export default ConfirmDialog;