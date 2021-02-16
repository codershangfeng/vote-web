import { useEffect, useState } from "react";
import { Radio, FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';

function Vote() {
    const [options, setOptions] = useState([])
    const [topic, setTopic] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!isLoaded) {
            const id = getRandomInt(1, 4)
            console.log("id: ", id)
            fetch("/vote/" + id)
                .then(res => {
                    console.log("response: ", res)
                    return res.json()
                })
                .then(
                    (result) => {
                        console.log("result: ", result)
                        setIsLoaded(true)
                        setTopic(result.topic)
                        setOptions(result.options)
                    },
                    (err) => {
                        console.log("err:", err)
                        setError("error")
                    }
                )
        }
    })
    // {"id":1,"options":["Innocence","Firework"],"topic":"Which song do you prefer?"}

    if (error) {
        return <div>Ops, Failed!</div>
    } else if (!isLoaded) {
        return <div>Waiting, still loading...</div>
    } else {
        return <div>
            <FormControl component="fieldset" >
                <p>{topic}</p>
                <RadioGroup aria-label="quiz" name="quiz">
                    {options.map((option, i) => <FormControlLabel value={option} control={<Radio />} label={option} key={i} />)}
                </RadioGroup>
            </FormControl>
        </div>
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Vote;