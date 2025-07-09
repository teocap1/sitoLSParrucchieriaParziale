document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Rimuovi classe 'active' da tutti i pulsanti
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Aggiungi classe 'active' al pulsante cliccato
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');

            // Filtra i prodotti
            productItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});