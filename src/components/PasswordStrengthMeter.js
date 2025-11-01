// frontend/src/components/PasswordStrengthMeter.js
import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password }) => {
    // Use the zxcvbn library to analyze the password
    const testResult = zxcvbn(password);
    // It returns a score from 0 (terrible) to 4 (excellent)
    const score = testResult.score;

    // A function to return a text label based on the score
    const createPassLabel = () => {
        switch (score) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    };

    return (
        <div className="password-strength-meter">
            {/* The HTML progress bar element is perfect for this */}
            <progress
                className={`password-strength-progress strength-${score}`}
                value={score}
                max="4"
            />
            <br />
            <label className="password-strength-label">
                {/* Only show the label if a password has been typed */}
                {password && `Strength: ${createPassLabel()}`}
            </label>
        </div>
    );
};

export default PasswordStrengthMeter;