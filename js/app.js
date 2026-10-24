
import { state } from "./state.js";
import { fetchData } from "./dataService.js";
import { getFilteredOrders } from "./selectors.js";
import { renderOrders, renderIndicators, renderDetails } from "./view.js";

// Fonction d'affichage
const render = () => {
    const orders = getFilteredOrders();

    renderOrders(orders);
    renderIndicators();
};

// Recherche par nom du client
document.getElementById("searchInput")
    .addEventListener("input", (event) => {
        state.search = event.target.value;
        render();
    });

// Filtre par statut
document.getElementById("statusFilter")
    .addEventListener("change", (event) => {
        state.status = event.target.value;
        render();
    });

// Filtre par catégorie
document.getElementById("categoryFilter")
    .addEventListener("change", (event) => {
        state.category = event.target.value;
        render();
    });

// Affichage des détails
document.getElementById("ordersContainer")
    .addEventListener("click", (event) => {
        const button = event.target.closest(".detail-btn");

        if (button) {
            const id = Number(button.dataset.id);

            const order = state.orders.find(
                order => order.id === id
            );

            if (order) {
                renderDetails(order);
            }
        }
    });

// Chargement initial des données
const init = async () => {
    try {
        const data = await fetchData();

        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        render();

        console.log("Clients chargés :", state.customers);
        console.log("Produits chargés :", state.products);
        console.log("Commandes chargées :", state.orders);

    } catch (error) {
        console.error("Erreur :", error);

        const message = document.getElementById("errorMessage");
        message.textContent = "Impossible de charger les données.";
        message.classList.remove("d-none");
    }
};

init();
