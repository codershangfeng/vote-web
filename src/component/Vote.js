import { useEffect, useState } from "react";
import { Radio, FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';

function Vote() {
    const [options, setOptions] = useState([])
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch("http://localhost:8080")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setOptions(result)
                },
                (err) => {
                    setIsLoaded(true)
                    setError(err)
                }
            )
    })

    if (error) {
        return <div>Ops, Failed!</div>
    } else if (!isLoaded) {
        return <div>Waiting, still loading...</div>
    } else {
        return <div>
            <FormControl component="fieldset" >
                <RadioGroup aria-label="quiz" name="quiz">
                    {options.map((option) => <FormControlLabel value={option} control={<Radio />} label={option} />)}
                </RadioGroup>
            </FormControl>
        </div>
    }
}

export default Vote;