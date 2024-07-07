// src/components/JoinForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from "../firebase"; // Import ref and set from firebase
import ThankYouPage from './ThankYouPage'; // Import the new component
import { addDoc, collection, query, where, getDocs } from "@firebase/firestore";
import './JoinForm.css';

const JoinForm = () => {
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [joined, setJoined] = useState(false); // State to track whether the user has joined
    const navigate = useNavigate();  // Initialize useNavigate hook

    // Handle the form submission
    const handleJoin = async (e) => {
        e.preventDefault();
    
        if (email && location) {
            const ref = collection(firestore, "users");
            const q = query(ref, where("email", "==", email));
    
            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setErrorMessage('This email is already registered.');
                    return;
                }
    
                const data = {
                    email: email,
                    location: location,
                };
    
                await addDoc(ref, data);
                setJoined(true); // Update the state to show the thank you message
            } catch (error) {
                console.error('Error adding document: ', error);
                setErrorMessage('An error occurred. Please try again.');
            }
        } else {
            setErrorMessage('Please fill in both fields in order to proceed.');
        }
    };
    
    // List of countries for the location dropdown
    const countries = [
        'Country', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
        'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh',
        'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
        'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
        'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
        'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)',
        'Democratic Republic of the Congo (Congo-Kinshasa)', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
        'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (fmr. "Swaziland")',
        'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
        'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India',
        'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
        'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
        'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
        'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
        'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
        'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia (formerly Macedonia)', 'Norway',
        'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
        'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
        'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
        'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
        'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
        'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
        'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America',
        'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ];
    
    // Handle closing the modal
    const handleClose = () => {
        navigate('/');  // Redirect to the homepage when the modal closes
    };

    return (
        <div>
            {joined ? ( // Render the thank you message if joined is true
                <ThankYouPage onClose={handleClose} />
            ) : (
                <div className="join-form">
                    <button className="close-btn" onClick={handleClose}>×</button>  {/* Close button */}
                    <h1 className="glitch">JOIN THE NEWSLETTER</h1>
                    <form onSubmit={handleJoin}>
                        <div className="input-container">
                            <input
                                type="email"
                                className="modal-input email-input"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <select
                                id="location"
                                className="modal-input location-select"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select your country</option> {/* Default option */}
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn join-submit-btn">JOIN</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <p className="disclaimer-text">We’ll only use your email to send you cool updates and new releases. No spam, promise!</p>
                </div>
            )}
        </div>
    );
};

export default JoinForm;
