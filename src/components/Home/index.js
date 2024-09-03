import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {coursesData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        coursesData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#1e293b" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {coursesData} = this.state
    return (
      <div className="home-success-container">
        <h1>Courses</h1>
        <ul className="courses-ul-container">
          {coursesData.map(each => (
            <li className="courses-li-container" key={each.id}>
              <Link className="link-ele" to={`/courses/${each.id}`}>
                <img src={each.logoUrl} alt={each.name} />
                <p>{each.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  handleRetry = () => {
    this.getData()
  }

  renderFailure = () => <FailureView handleRetry={this.handleRetry} />

  renderCoursesData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderCoursesData()}
      </div>
    )
  }
}

export default Home
