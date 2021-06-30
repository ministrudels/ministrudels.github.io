import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    CardActions
} from "@material-ui/core";

export default function ExampleContainer({ children, tags }) {
    return (
        <Card variant="outlined">
            <CardContent>
                {children}
            </CardContent>
            <CardActions>
                {tags.map(x => <Chip label={x} />)}
            </CardActions>
        </Card>
    )
}