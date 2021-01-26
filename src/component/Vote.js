import { useState } from "react";
import { Radio, FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';

function Vote() {
    const [options, setOptions] = useState(['apple', 'pear'])

    const CreateOption = function (option) {
        return <FormControlLabel value={option} control={<Radio />} label={option} />

    }

    return (
        <div>
            <FormControl component="fieldset" >
                <RadioGroup aria-label="quiz" name="quiz">
                    {options.map(CreateOption)}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Vote;