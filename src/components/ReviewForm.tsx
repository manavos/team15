"use client";
import { useState, useEffect, useCallback } from "react";
import StatusMessage from "./StatusMessage";
import SubmitReviewForm from "./SubmitReviewForm";
import styles from "../styles/review.module.css";

interface Review {
  _id: string;
  username: string;
  description: string;
  rating: number;
}

export default function ReviewForm() {
  const [buttonState, setButtonState] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setReviews(data.reviews ?? []);
    } catch (err) {
      console.error("Could not load reviews:", err);
      setError("We couldn't load reviews right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleOnClick = () => {
    buttonState ? setButtonState(false) : setButtonState(true);
    console.log(buttonState);
  };

  return (
    <div className={styles.ratingsWrapper}>
      <div className={styles.formButton}>
        <button onClick={handleOnClick}>{buttonState ? "Close Form" : "Add a review"}</button>
      </div>
      {buttonState ? <SubmitReviewForm onSubmitted={loadReviews} /> : <div></div>}
      {loading ? (
        <StatusMessage type="loading">Loading reviews...</StatusMessage>
      ) : error ? (
        <StatusMessage type="error">{error}</StatusMessage>
      ) : reviews.length === 0 ? (
        <StatusMessage type="empty">No reviews yet. Be the first!</StatusMessage>
      ) : (
        <ul className={styles.unorderedList}>
          {reviews.map((review) => (
            <li className={styles.review} key={review._id}>
              <strong>
                {review.username}
                {"  "}
                {Array.from({ length: review.rating }, (_, index) => (
                  <span key={index} className={styles.stars}>
                    {"★"}
                  </span>
                ))}
              </strong>
              <p>{review.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
