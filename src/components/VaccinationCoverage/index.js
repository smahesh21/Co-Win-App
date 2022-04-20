import {BarChart, XAxis, YAxis, Legend, Bar} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      <BarChart
        data={last7DaysVaccination}
        width={900}
        height={400}
        margin={{
          top: 5,
        }}
      >
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
            strokewidth: 0.5,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokewidth: 1,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 10,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="dose 1"
          fill="#5a8dee"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="dose 2"
          fill="#f54394"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
