/* BOOKING-FORM.JS - Invio prenotazioni via WhatsApp */
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('contact-form');
  
  if (bookingForm) {
    // Elementi del form
    const nameInput = bookingForm.querySelector('#name');
    const phoneInput = bookingForm.querySelector('#phone');
    const serviceSelect = bookingForm.querySelector('#service');
    const dateInput = bookingForm.querySelector('#date');
    const messageInput = bookingForm.querySelector('#message');
    const submitBtn = bookingForm.querySelector('#submit-btn');

    // Messaggi di errore
    const errorMessages = {
      name: 'Inserisci un nome valido',
      phone: 'Inserisci un telefono valido',
      service: 'Seleziona un servizio',
      date: 'Seleziona una data'
    };

    // Validazione in tempo reale
    [nameInput, phoneInput].forEach(input => {
      input.addEventListener('input', () => validateField(input));
    });

    [serviceSelect, dateInput].forEach(select => {
      select.addEventListener('change', () => validateField(select));
    });

    // Funzione di validazione
    const validateField = (field) => {
      const errorElement = field.nextElementSibling;
      
      if (field.required && !field.value.trim()) {
        showError(field, errorElement, errorMessages[field.id]);
      } else {
        clearError(field, errorElement);
      }
    };

    // Mostra errore
    const showError = (field, errorElement, message) => {
      field.classList.add('error');
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
      }
    };

    // Rimuovi errore
    const clearError = (field, errorElement) => {
      field.classList.remove('error');
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
      }
    };

    // Submit form
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validazione finale
      [nameInput, phoneInput, serviceSelect, dateInput].forEach(field => {
        validateField(field);
        if (field.classList.contains('error')) isValid = false;
      });

      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Preparando il messaggio...';

        // Formatta la data in italiano
        const formattedDate = formatDate(dateInput.value);
        
        // Crea il messaggio per WhatsApp
        const whatsappMessage = `Ciao, vorrei prenotare un appuntamento:
        
Nome: ${nameInput.value}
Telefono: ${phoneInput.value}
Servizio: ${serviceSelect.value}
Data preferita: ${formattedDate}
${messageInput.value ? `Note: ${messageInput.value}` : ''}

Grazie!`;

        // Codifica il messaggio per l'URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Numero di telefono della parrucchieria
        const phoneNumber = '393517125743'; // Senza il prefisso +
        
        // Crea il link WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Apri WhatsApp in una nuova scheda
        window.open(whatsappUrl, '_blank');
        
        // Ripristina il pulsante
        submitBtn.disabled = false;
        submitBtn.textContent = 'Prenota via WhatsApp';
        
        // Resetta il form (opzionale)
        // bookingForm.reset();
      }
    });

    // Funzione per formattare la data in italiano
    function formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('it-IT', options);
    }
  }
});