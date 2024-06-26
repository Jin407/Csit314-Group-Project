import './REAviewRandR.css';

const RatingsAndReviews = ({ rating }) => {
    return (
      <div className="randrdisplay">
        <p className="randrdisplayName">By: {rating.reviewerUser}</p>
        <p className="randrdisplayReview">Review: <br/>{rating.review}</p>
      </div>
    );
  };

  export default RatingsAndReviews;