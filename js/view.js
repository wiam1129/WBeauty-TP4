
import { state } from "./state.js";
import { getCustomer, getProduct, getLineTotal, getOrderTotal } from "./selectors.js";

// Afficher les commandes
export const renderOrders = (orders) => {
    const container = document.getElementById("ordersContainer");

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    Aucune commande trouvée.
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(order => {
        const customer = getCustomer(order.customerId);

        return `
            <div class="col-md-4 mb-3">
                <div class="card p-3 h-100">
                    <h5>Commande #${order.id}</h5>
                    <p>Client : ${customer.name}</p>
                    <p>Date : ${order.date}</p>
                    <p>Statut : ${order.status}</p>
                    <p>Total : ${getOrderTotal(order)} DH</p>

                    <button class="btn btn-primary detail-btn"
                            data-id="${order.id}">
                        Voir détails
                    </button>
                </div>
            </div>
        `;
    }).join("");
};

// Afficher les indicateurs
export const renderIndicators = () => {
    let totalAmount = 0;

    state.orders.forEach(order => {
        totalAmount += getOrderTotal(order);
    });

    document.getElementById("totalCustomers").textContent =
        state.customers.length;

    document.getElementById("totalProducts").textContent =
        state.products.length;

    document.getElementById("totalOrders").textContent =
        state.orders.length;

    document.getElementById("totalAmount").textContent =
        totalAmount + " DH";
};

// Afficher les détails d'une commande
export const renderDetails = (order) => {
    const customer = getCustomer(order.customerId);
    const details = document.getElementById("orderDetails");

    let productsHTML = "";

    order.items.forEach(item => {
        const product = getProduct(item.productId);

        productsHTML += `
            <p>${product.name} : ${product.price} DH
            x ${item.quantity} = ${getLineTotal(item)} DH</p>
        `;
    });

    details.innerHTML = `
        <h5>Commande #${order.id}</h5>
        <p>Client : ${customer.name}</p>
        <p>Ville : ${customer.city}</p>
        <p>Date : ${order.date}</p>
        <p>Statut : ${order.status}</p>
        <hr>
        ${productsHTML}
        <hr>
        <h5>Total : ${getOrderTotal(order)} DH</h5>
    `;

    const modal = new bootstrap.Modal(
        document.getElementById("orderModal")
    );

    modal.show();
};
