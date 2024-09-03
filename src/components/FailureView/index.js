import './index.css'

const FailureView = ({handleRetry}) => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      alt="failure view"
    />
    <h1>Oops! Something Went Wrong </h1>
    <p>We cannot seem to find the page you are looking for.</p>
    <div className="retry-btn-container">
      <button onClick={() => handleRetry()} type="button">
        Retry
      </button>
    </div>
  </div>
)

export default FailureView
