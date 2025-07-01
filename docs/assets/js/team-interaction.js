/* TEAM-INTERACTION.JS - Gestione invio CV con form */
document.addEventListener('DOMContentLoaded', () => {
    const cvForm = document.getElementById('cv-form');
    
    if (cvForm) {
        // Elementi del form
        const nameInput = cvForm.querySelector('#cv-name');
        const phoneInput = cvForm.querySelector('#cv-phone');
        const positionSelect = cvForm.querySelector('#cv-position');
        const experienceInput = cvForm.querySelector('#cv-experience');
        const messageInput = cvForm.querySelector('#cv-message');
        const submitBtn = cvForm.querySelector('#send-cv-btn');

        // Messaggi di errore
        const errorMessages = {
            'cv-name': 'Inserisci il tuo nome completo',
            'cv-phone': 'Inserisci un numero di telefono valido',
            'cv-position': 'Seleziona una posizione',
            'cv-experience': 'Inserisci gli anni di esperienza',
            'cv-message': 'Spiegaci perché vuoi lavorare con noi'
        };

        // Validazione in tempo reale
        [nameInput, phoneInput, experienceInput, messageInput].forEach(input => {
            input.addEventListener('input', () => validateField(input));
        });

        positionSelect.addEventListener('change', () => validateField(positionSelect));

        // Funzione di validazione
        const validateField = (field) => {
            const fieldName = field.getAttribute('name');
            const errorElement = field.nextElementSibling;
            
            if (field.required && !field.value.trim()) {
                showError(field, errorElement, errorMessages[fieldName]);
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
        cvForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validazione finale
            [nameInput, phoneInput, positionSelect, experienceInput, messageInput].forEach(field => {
                validateField(field);
                if (field.classList.contains('error')) isValid = false;
            });

            if (isValid) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Preparando il messaggio...';

                // Crea il messaggio per WhatsApp
                const whatsappMessage = `*Candidatura per LS Parrucchieria Barberia*

📌 *Nome:* ${nameInput.value}
📞 *Telefono:* ${phoneInput.value}
💼 *Posizione richiesta:* ${positionSelect.value}
⏳ *Esperienza nel settore:* ${experienceInput.value} anni

📝 *Messaggio:*
${messageInput.value}

Allego il mio CV. Grazie per la considerazione!`;

                // Codifica il messaggio per l'URL
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // Numero di telefono della parrucchieria
                const phoneNumber = '393517125743'; // Senza il prefisso +
                
                // Crea il link WhatsApp
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                
                // Apri WhatsApp in una nuova scheda
                window.open(whatsappUrl, '_blank');
                
                // Ripristina il pulsante
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Invia CV via WhatsApp';
                }, 2000);
            }
        });
    }

    // Prenotazione con team member (se mantenuta)
    document.querySelectorAll('.btn-member').forEach(btn => {
        btn.addEventListener('click', function() {
            const memberName = this.closest('.member-info').querySelector('h3').textContent;
            localStorage.setItem('selectedStaff', memberName);
            window.location.href = 'contact.html#booking';
        });
    });
});