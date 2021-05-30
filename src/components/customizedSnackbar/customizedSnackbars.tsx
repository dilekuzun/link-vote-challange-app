import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './customizedSnackbar.scss';

function Alert(props) {
    return <MuiAlert elevation={1} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: 0,
        },
    },
}));

export default function CustomizedSnackbars(props: any) {
    const classes = useStyles();
    // severity : "success", "error", "warning", "info"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpenNotification(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={props.openNotification} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.msgSeverity}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
