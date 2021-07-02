import {
    Card,
    CardContent,
    Chip,
    CardActions
} from "@material-ui/core";
import { ReactNode } from "react";

type Props  = {
    children: ReactNode;
    tags: Array<string>;
}

export default function ExampleContainer(props:Props){
    const {children, tags} = props
    return (
        <Card variant="outlined">
            <CardContent>
                {children}
            </CardContent>
            <CardActions>
                {tags.map(x => <Chip key={x} label={x} />)}
            </CardActions>
        </Card>
    )
}
