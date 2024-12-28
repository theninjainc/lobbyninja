import { useState } from "react";
import styles from "./configUser.module.css";
import fotoPerfil from '../../assets/poker.png';

const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: fotoPerfil,
};

const languages = ["English", "Português", "Español", "Français"];

const mrlOptions = [
    { time: 1, label: "1 Minute", color: "#FF6347" },
    { time: 3, label: "3 Minutes", color: "#FFD700" },
    { time: 5, label: "5 Minutes", color: "#32CD32" },
    { time: 10, label: "10 Minutes", color: "#1E90FF" },
];

const Settings = () => {
    const [language, setLanguage] = useState(languages[0]);
    const [mrl, setMrl] = useState(mrlOptions[0].time);

    const handleLanguageChange = (e) => setLanguage(e.target.value);
    const handleMrlChange = (e) => setMrl(Number(e.target.value));

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.profileSection}>
                <img src={userData.avatar} alt="Avatar" className={styles.avatar} />
                <div className={styles.userInfo}>
                    <h2>{userData.name}</h2>
                    <p>{userData.email}</p>
                </div>
            </div>

            <div className={styles.settingsSection}>
                <h3>Language</h3>
                <div className={styles.settingItem}>
                    <i
                        className="fas fa-language"
                        style={{ fontSize: "24px", marginRight: "10px", color: "#808080" }}
                    ></i>
                    <select value={language} onChange={handleLanguageChange} className={styles.select}>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>

                <h3>MLR Alerts</h3>
                <div className={styles.settingItem}>
                    <i
                        className="fas fa-exclamation-triangle"
                        style={{
                            fontSize: "24px",
                            marginRight: "10px",
                            color: mrlOptions.find(option => option.time === mrl)?.color || "#FF6347",  // Cor do MRL selecionado
                        }}
                    ></i>
                    <select value={mrl} onChange={handleMrlChange} className={styles.select}>
                        {mrlOptions.map((option) => (
                            <option key={option.time} value={option.time} style={{ color: option.color }}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Settings;
