import {
    Typography,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    Divider,
    DialogContent,
} from "@mui/material";

const CommentsDialog = ({ toggleDialog, open, comments }) => {
    return (
        <Dialog onClose={toggleDialog} open={open}>
            <DialogTitle>Коментарі</DialogTitle>
            <Divider />
            <List sx={{ pt: 0 }}>
                {comments.map((comment) => {
                    return (
                        <ListItem disablePadding key={comment.id}>
                            <DialogContent>
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    gutterBottom
                                >
                                    {comment.name}
                                </Typography>
                                <Typography gutterBottom>{comment.body}</Typography>
                            </DialogContent>
                        </ListItem>
                    );
                })}
            </List>
        </Dialog>
    );
};

export default CommentsDialog;
