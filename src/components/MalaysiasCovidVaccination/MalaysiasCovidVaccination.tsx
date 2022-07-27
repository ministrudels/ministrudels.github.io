import ExampleContainer from '../ExampleContainer'

export default function MalaysiasCovidVaccination() {
    return (
        <ExampleContainer title="Malaysia's COVID Vaccination" date={new Date('7 6 2021')} tags={['d3', 'observablehq']}>
            <iframe title="Malaysia's Covid Vaccination" width="100%" height="1313" style={{ border: "none" }}
                src="https://observablehq.com/embed/@minimumness/malaysias-covid-vaccination-progress?cells=description%2Ctitle1%2Ckey%2Cviewof+selectedData%2Ctitle2%2CbyState">
            </iframe>
        </ExampleContainer>
    )
}