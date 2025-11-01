// frontend/src/components/MoodTrackerPage.js
import React, { useState, useEffect } from 'react';

// Import necessary components from the charting libraries
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// We must register the components we are going to use with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const MoodTrackerPage = () => {
    // --- STATE MANAGEMENT ---
    // 'moodData': An array to hold all the user's saved mood entries.
    const [moodData, setMoodData] = useState([]);
    
    // 'selectedMood': A string to hold the mood the user has currently clicked on (e.g., "Happy").
    const [selectedMood, setSelectedMood] = useState(null);
    
    // 'moodNotes': A string to hold the text in the "thoughts to share" input box.
    const [moodNotes, setMoodNotes] = useState('');

    // --- DATA PERSISTENCE WITH LOCALSTORAGE ---
    // This `useEffect` runs only once when the component first loads.
    // It checks localStorage for any previously saved mood data.
    useEffect(() => {
        const savedData = localStorage.getItem('moodData');
        if (savedData) {
            setMoodData(JSON.parse(savedData));
        }
    }, []); // The empty array [] means this effect runs only on mount.

    // This `useEffect` runs EVERY time the `moodData` state changes.
    // It saves the updated mood data back into localStorage.
    useEffect(() => {
        localStorage.setItem('moodData', JSON.stringify(moodData));
    }, [moodData]);


    // --- EVENT HANDLERS ---
    // This function is called when the "Save Mood" button is clicked.
    const handleSaveMood = () => {
        if (!selectedMood) {
            alert('Please select a mood before saving!');
            return;
        }

        // We use a map to convert mood names to a numerical score for the chart.
        const moodMap = { "Happy": 6, "Excited": 5, "Calm": 4, "Neutral": 3, "Anxious": 2, "Sad": 1 };

        const newMoodEntry = {
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            mood: selectedMood,
            moodScore: moodMap[selectedMood], // Get the numeric score
            notes: moodNotes,
        };

        // Add the new entry to our existing moodData array.
        setMoodData(prevData => [...prevData, newMoodEntry]);

        // Reset the inputs for the next entry.
        setSelectedMood(null);
        setMoodNotes('');
        alert('Your mood has been saved!');
    };

    // --- CHART CONFIGURATION ---
    // We prepare the data in the format that Chart.js expects.
    const chartData = {
        labels: moodData.map(entry => entry.date), // The x-axis labels (dates)
        datasets: [
            {
                label: 'Your Mood Journey',
                data: moodData.map(entry => entry.moodScore), // The y-axis data points (scores)
                fill: false,
                borderColor: '#7758D1',
                tension: 0.1,
            },
        ],
    };

    // We configure the appearance and behavior of the chart.
    const chartOptions = {
        scales: {
            y: {
                min: 0,
                max: 7, // Set range from 0 to 7 to give space
                ticks: {
                    stepSize: 1,
                    // This callback function converts the numeric score back to a text label on the y-axis.
                    callback: function (value) {
                        const moodLabels = { 1: 'Sad', 2: 'Anxious', 3: 'Neutral', 4: 'Calm', 5: 'Excited', 6: 'Happy' };
                        return moodLabels[value] || '';
                    },
                },
            },
        },
    };
    
    // A list of all possible moods to create the buttons dynamically.
    const moods = ["Happy", "Calm", "Excited", "Neutral", "Anxious", "Sad"];

    return (
        <section className="mood-tracker">
            <h2>Track Your Mood Journey</h2>
            <p>Visualize your emotional patterns with beautiful, insightful charts</p>
            
            <div className="mood-chart">
                {/* We only show the chart if there is data, otherwise we show a placeholder */}
                {moodData.length > 0 ? (
                    <Line options={chartOptions} data={chartData} />
                ) : (
                    <p style={{ padding: '2em', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>Save a mood to see your chart here!</p>
                )}
            </div>

            <div className="mood-select">
                <h3>How are you feeling today?</h3>
                <div className="moods">
                    {moods.map(mood => (
                        <button
                            key={mood}
                            // Add the 'selected' class if this is the currently selected mood
                            className={`mood-btn ${selectedMood === mood ? 'selected' : ''}`}
                            onClick={() => setSelectedMood(mood)}
                        >
                            {mood}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                    placeholder="Any thoughts to share?"
                />
                <button onClick={handleSaveMood} className="primary-btn" style={{ marginLeft: '1em' }}>
                    Save Mood
                </button>
            </div>
        </section>
    );
};

 export default MoodTrackerPage;