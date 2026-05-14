'use client';

import { createBooking } from "@/lib/actions/booking.actions";
import { create } from "domain";
import posthog from "posthog-js";
import { useState } from "react";


const bookEvents = ({eventId, slug}: {eventId: string, slug: string}) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!email.trim()) {
            setError("Please enter a valid email");
            return;
        }

        setLoading(true);
        const {success} = await createBooking({
            eventId,
            slug,
            email,
        });

        setLoading(false);

        if (success) {
            setSubmitted(true);
            posthog.capture("event_booked", {
                eventId,
                slug,
                email,
            });
        }else{
            console.error("Booking failed:");
            posthog.capture("booking_failed",);
            setError("Booking failed. Please try again later.");
            return;
        }
    }

    return (
        <div id="bookEvents" className="booking-form-container">
            {submitted ? (
                <div className="success-message">
                    <h3>✓ Booking Confirmed!</h3>
                    <p>Thank you for booking your spot! A confirmation email has been sent to <strong>{email}</strong>.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="form-input"
                            required
                            disabled={loading}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button 
                        type="submit" 
                        className={`button-submit ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>

                </form>
            )}
        </div>
    )
}

export default bookEvents