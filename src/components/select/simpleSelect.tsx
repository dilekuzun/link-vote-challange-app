import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Map} from "immutable";
import {IOption} from "../../interfaces/interfaces";
import './simpleSelect.scss';

export default function SimpleSelect({selectedValue, setSelectedValue, options, placeHolder}) {

    const handleChange = (event) => {
        setSelectedValue(options.filter(option => option.get('optionId') === event.target.value).get(0, Map<keyof IOption, any>()));
    };

    return (
        <div className="simple-select">
            <FormControl variant="filled" className="formControl">
                <InputLabel id="demo-simple-select-filled-label">{placeHolder}</InputLabel>

                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectedValue.get('optionId')}
                    onChange={handleChange}
                >
                    {options.map((option: Map<keyof IOption, any>, index) => (
                        <MenuItem
                            key={index}
                            value={option.get('optionId')}>{option.get('optionName')}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}