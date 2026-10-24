
export const fetchData = async () => {
    try {
        // Charger les clients
        const response1 = await fetch("../data/customers.json");

        if (!response1.ok) {
            throw new Error("Erreur de chargement des clients");
        }

        const customers = await response1.json();

        // Charger les produits 
        const response2 = await fetch("../data/products.json");
        if (!response2.ok) {
            throw new Error("Erreur de chargement des produits");
        }

        const products = await response2.json();

        // Charger les commandes
        const response3 = await fetch("../data/orders.json");

        if (!response3.ok) {
            throw new Error("Erreur de chargement des commandes");
        }

        const orders = await response3.json();

        return { customers, products, orders };

    } catch (error) {
        console.error("Erreur de chargement :", error);
        throw error;
    }
};
