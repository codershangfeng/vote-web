import { useEffect, useState } from "react";
import { Radio, FormControl, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';

function Vote() {
    const [options, setOptions] = useState([])
    const [topic, setTopic] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!isLoaded) {
            fetch("/vote/1")
                .then(res => {
                    console.log("res: ", res)
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

export default Vote;