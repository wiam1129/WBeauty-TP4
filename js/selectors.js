
import { state } from "./state.js";

// Rechercher un client
export const getCustomer = (id) => {
    return state.customers.find(customer => customer.id === id);
};

// Rechercher un produit
export const getProduct = (id) => {
    return state.products.find(product => product.id === id);
};

// Calculer le montant d'un produit
export const getLineTotal = (item) => {
    const product = getProduct(item.productId);
    return product.price * item.quantity;
};

// Calculer le total d'une commande
export const getOrderTotal = (order) => {
    let total = 0;

    order.items.forEach(item => {
        total += getLineTotal(item);
    });

    return total;
};

// Rechercher et filtrer les commandes
export const getFilteredOrders = () => {
    return state.orders.filter(order => {

        const customer = getCustomer(order.customerId);

        // Recherche par nom du client
        const matchSearch = customer.name
            .toLowerCase()
            .includes(state.search.toLowerCase());

        // Filtre par statut
        const matchStatus = state.status === "all" ||
            order.status === state.status;

        // Filtre par catégorie
        const matchCategory = state.category === "all" ||
            order.items.some(item => {
                const product = getProduct(item.productId);
                return product.category === state.category;
            });

        return matchSearch && matchStatus && matchCategory;
    });
};
