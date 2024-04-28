export const validateZip = async (zip: string, country: string) => {
    if (country !== "DK") return { valid: true }; //If danmark is not selected assume its valid
    try {
        const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`);
        if (!response.ok) return { valid: false, message: "Invalid ZIP code for Denmark" };
        const data = await response.json();
        return { valid: true, city: data.navn, message: ""};
    } catch (error) {
        console.error("Failed to validate ZIP code", error);
        return { valid: false, message: 'Network error during ZIP validation' };
    }
};

export const validatePhoneNumber = (phone: string) => {
    const regex = /^\+?[0-9]{8}$/;
    if (regex.test(phone)) {
        return { valid: true, message: "" };
    } else {
        return { valid: false, message: "Invalid phone number. Must be exactly 8 digits long." };
    }
};

export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        return { valid: true, message: "" };
    } else {
        return { valid: false, message: "Invalid email format." };
    }
};