import React from "react";
import { func, object, string, array } from 'prop-types';
import isArray from 'lodash/isArray';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';



const propTypes = {
    currentUser: object,
    editableField: string,
    currentField: array,
    handleSaveField: func,
    handleEditField: func,
    handleCancelEditField: func,
    value: string,
};


const useStyles = makeStyles(theme => ({
    editButton: {
        color: theme.palette.primary.main,
        opacity: .3,
        '&:hover': {
            opacity: 1,
            cursor: 'pointer'
        },
    },
    editButtonActive: {
        opacity: 1
    },
    cancelEditButton: {
        marginLeft: '15px'
    },
}));


function ButtonsSet({
    currentUser,
    editableField,
    currentField,
    handleSaveField,
    handleEditField,
    handleCancelEditField,
    value,
}) {   
    const classes = useStyles();

    const getField = () => {
        let field = {...currentUser};
        let name = '';
        currentField.forEach(item => {
            name = item;
            field = field[item];
        });
        if(isArray(field)) {
            field = field.join(', ');
        }
        
        return field;
    }
    
    return (
        <>
            {editableField === currentField.join('.') ?
                <span
                    className={classnames({
                        [classes.editButton]: true,
                        [classes.editButtonActive]: editableField === currentField.join('.'),
                    })}
                    onClick={handleSaveField}
                >
                    Save
                </span> :
                <span
                    className={classes.editButton}
                    onClick={handleEditField(currentField.join('.'))}
                >
                    Edit
                </span>
            }
            {
                getField() !== value && 
                    <span
                        className={classnames({
                            [classes.editButton]: true,
                            [classes.cancelEditButton]: true
                        })}
                        onClick={handleCancelEditField(currentField.join('.'))}
                    >
                        Cancel
                    </span>
            }
        </>
    );
}


ButtonsSet.propTypes = propTypes;

export default ButtonsSet;