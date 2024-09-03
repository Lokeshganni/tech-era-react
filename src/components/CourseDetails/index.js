import {Component} from 'react'
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

class CourseDetails extends Component {
  state = {courseDetailsData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseDetailsData: formattedData,
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
    const {courseDetailsData} = this.state
    const {imageUrl, name, description} = courseDetailsData
    return (
      <div className="main-container">
        <div className="course-detail-main-container">
          <img src={imageUrl} alt={name} />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
  }

  handleRetry = () => {
    this.getCourseData()
  }

  renderFailure = () => <FailureView handleRetry={this.handleRetry} />

  renderCourseItemData = () => {
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
        {this.renderCourseItemData()}
      </div>
    )
  }
}
export default CourseDetails
