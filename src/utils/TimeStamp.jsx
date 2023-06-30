import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeDifference = () => {
    const [timeDifference, setTimeDifference] = useState('');

    useEffect(() => {
        // Fetch the timestamp from the database
        const fetchTimestampFromDatabase = async () => {
            try {
                const response = await axios.get('http://localhost:8081/time');
                const timestampFromDatabase = response.data.timestamp;

                // Calculate the time difference
                const currentTime = new Date().getTime();
                const difference = currentTime - timestampFromDatabase;

                // Convert the difference to the desired format
                const seconds = Math.floor(difference / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                // Determine the appropriate unit of measurement
                let displayDifference;
                if (days > 0) {
                    displayDifference = `${days} day(s)`;
                } else if (hours > 0) {
                    displayDifference = `${hours} hour(s)`;
                } else if (minutes > 0) {
                    displayDifference = `${minutes} minute(s)`;
                } else {
                    displayDifference = `${seconds} second(s)`;
                }

                // Update the state with the calculated difference
                setTimeDifference(displayDifference);
            } catch (error) {
                console.error('Error fetching timestamp:', error);
            }
        };

        fetchTimestampFromDatabase();
    }, []);

    return <div>Time Difference: {timeDifference}</div>;
};

export default TimeDifference;
