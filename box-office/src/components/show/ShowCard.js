import React from 'react';
import { Link } from 'react-router-dom';

// Preview card for shows
const ShowCard = ({ id, image, name, summary }) => {
  // Slicing the summary into 10 words - regular expression is to change the markups to empty space
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';

  return (
    <div>
      <div>
        <img src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div>
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button">Star me</button>
      </div>
    </div>
  );
};
export default ShowCard;
