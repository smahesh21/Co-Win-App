import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachData => ({
            vaccineDate: eachData.vaccine_date,
            dose1: eachData.dose_1,
            dose2: eachData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(data => ({
          age: data.age,
          count: data.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(data => ({
          gender: data.gender,
          count: data.count,
        })),
      }
      console.log(updatedData)
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderVaccinationsPages = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          last7DaysVaccination={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGender={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge vaccinationByAge={vaccinationData.vaccinationByAge} />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderPageBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationsPages()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="responsive-container">
          <div className="top-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="website-logo"
              alt="website logo"
            />
            <h1 className="heading">Co-WIN</h1>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {this.renderPageBasedOnApiStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
