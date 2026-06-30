import { useState, useEffect } from 'react';

const useVietnamDateTime = (utcTimestamp) => {
    const [convertedDateTime, setConvertedDateTime] = useState([null, null]);

    useEffect(() => {
        const convertTimezone = () => {
            const utcDate = new Date(utcTimestamp);
            const targetDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

            const day = targetDate.getDate().toString().padStart(2, '0');
            const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
            const year = targetDate.getFullYear().toString();

            const formattedDate = `${day}-${month}-${year}`;

            const formattedTime = targetDate.toLocaleTimeString('en-US', { hour12: false });

            setConvertedDateTime([formattedDate, formattedTime]);
        };

        convertTimezone();
    }, [utcTimestamp]);

    return convertedDateTime;
};

export default useVietnamDateTime;
