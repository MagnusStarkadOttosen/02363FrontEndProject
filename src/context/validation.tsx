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