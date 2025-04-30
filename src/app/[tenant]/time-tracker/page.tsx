'use client'

import { useStopwatch } from 'react-timer-hook'
import { Button } from '@digico/ui'
import { Grid } from '@digico/ui'

export default function Page() {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false })

    return (
        <Grid className="gap-4">
            <div className="text-xl font-bold">
                {String(hours).padStart(2, '0')}:
                {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
                {!isRunning ? (
                    <Button onClick={start}>Start</Button>
                ) : (
                    <Button onClick={pause}>Pause</Button>
                )}
                <Button onClick={() => reset()}>Reset</Button>
            </div>
        </Grid>
    )
}
