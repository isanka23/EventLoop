'use client';

import { useState } from "react";


const bookEvents = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    }

    return (
        <div id="bookEvents">
            {submitted ? (
                <p>Thank you for booking your spot! A confirmation email has been sent to {email}.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <button type="submit" className="button-submit">Submit</button>

                </form>
            )}
        </div>
    )
}

export default bookEvents