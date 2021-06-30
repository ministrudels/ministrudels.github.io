import React, { useState, useEffect, useRef } from 'react'
import { Grid, Slider, Typography, IconButton } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ExampleContainer from '../ExampleContainer'
import * as d3 from 'd3'

const margin = 10
const height = 200
const width = 200 

// If I change my component based off state, then it can do transitions and shit
export default function Ball() {
    const [x, setx] = useState(0)
    const [y, sety] = useState(0)
    const [shuffleXInterval, setShuffleXInterval] = useState(null)
    const [shuffleYInterval, setShuffleYInterval] = useState(null)
    const svgRefElement = useRef(null);

    // const handleXChange = (e: React.MouseEvent , newValue: number) => {
    //     if (shuffleXInterval) {
    //         clearInterval(shuffleXInterval)
    //         setShuffleXInterval(null)
    //     }
    //     setx(newValue)
    // }

    // const handleYChange = (e: React.MouseEvent , newValue: number) => {
    //     if (shuffleYInterval) {
    //         clearInterval(shuffleYInterval)
    //         setShuffleXInterval(null)
    //     }
    //     sety(newValue)
    // }
    
    // const handleShuffleClickX = (e: React.MouseEvent , newValue: number) => {
    //     if (shuffleXInterval) {
    //         clearInterval(shuffleXInterval)
    //         setShuffleXInterval(null)
    //     } else {
    //         setShuffleXInterval(setInterval(() => setx(Math.random() * (width - 2 * margin + 1)), 2000))
    //     }
    // }

    // const handleShuffleClickY = (e: React.MouseEvent , newValue: number) => {
    //     if (shuffleYInterval) {
    //         clearInterval(shuffleYInterval)
    //         setShuffleYInterval(null)
    //     } else {
    //         setShuffleYInterval(setInterval(() => sety(Math.random() * (height - 2 * margin + 1)), 2000))
    //     }
    // }

    const moveCircle = () => {
        d3.select(svgRefElement.current)
            .selectAll('circle')
            .transition()
            .duration(1000)
            .ease(d3.easeCubicInOut)
            .attr("cx", x)
            .attr("cy", y)
    }

    const draw = () => {
        const rootSVG = d3.select(svgRefElement.current).attr("viewBox", `${[0, 0, width, height]}`)
        const g = rootSVG.append('g')
            .attr('transform', `translate(${margin},${margin})`)
        g.append('circle')
            .attr('r', margin)
    }

    useEffect(draw, [])
    useEffect(moveCircle, [x, y])

    return (
        <ExampleContainer tags={['d3', 'd3-transition', 'setInterval']}>
            {/* <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography variant='body1'>
                        X Pos
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleShuffleClickX}>
                        {shuffleXInterval
                            ? <PauseIcon />
                            : <PlayArrowIcon />
                        }
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Slider
                        track={false}
                        value={x}
                        min={0}
                        max={width - 2 * margin}
                        onChange={handleXChange}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography variant='body1'>
                        Y Pos
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleShuffleClickY}>
                        {shuffleYInterval
                            ? <PauseIcon />
                            : <PlayArrowIcon />
                        }
                    </IconButton>
                </Grid>

                <Grid item xs>
                    <Slider
                        track={false}
                        value={y}
                        min={0}
                        max={height - 2 * margin}
                        onChange={handleYChange}
                    />
                </Grid>
            </Grid>

            <div style={{
                height: height,
                width: width,
                border: 'solid',
                borderRadius: 2,
                borderWidth: 1,
                borderColor: 'gray',
                display: 'block',
                margin: 'auto'
            }}>
                <svg
                    width='100%'
                    height='100%'
                    ref={svgRefElement}
                    style={{

                    }}
                />
            </div> */}
        </ExampleContainer>
    )
}