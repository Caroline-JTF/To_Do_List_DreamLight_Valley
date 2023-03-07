// Récupération des éléments du DOM nécessaires
const button = document.getElementById('clear');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const allChecked = document.getElementById('allChecked');
const total = document.getElementById('total');
const accordionItems = document.querySelectorAll('.accordion-item');

// Récupère le nombre total de checkboxes
total.textContent = checkboxes.length;

// Fonction pour sauvegarder les états des checkboxes dans le stockage local
function saveCheckboxes() {

    // Création des objets pour récupérer les éléments cochés
    const checkboxStates = {};
    const checkedStates = {};
    
    // On parcourt les éléments checkbox de la liste checkboxes
    checkboxes.forEach((checkbox) => {
        // Enregistrement dans l'objet checkboxeStates de l'état de notre checkbox (si elle est cochée ou non)
        checkboxStates[checkbox.id] = checkbox.checked;
    });

    // On parcourt les éléments item de la liste accordionItems
    accordionItems.forEach((item) => {
        // Récupération du span checked de l'item adéquat
        const checked = item.querySelector('.checked');
        // Enregistrement dans l'objet checkedStates du nombre de checkbox cochées dans l'item
        checkedStates[item.id] = checked.textContent;
    });
    
    // Enregistrement des objets checkboxStates et checkedStates dans le LS
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
    localStorage.setItem('checkedStates', JSON.stringify(checkedStates));
}

// Fonction pour charger les états des checkboxes depuis le stockage local
function loadCheckboxes() {
    // Récupération des objets enregistrés précédement dans le LS
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates'));
    const checkedStates = JSON.parse(localStorage.getItem('checkedStates'));
    
    // Si il y a un objet checkbocStates dans le LS alors : 
    if (checkboxStates) {
        // On parcourt les objets checkbox de la liste checkboxes
        checkboxes.forEach((checkbox) => {
            // On stock l'état de notre checkbox dans checkboxState
            const checkboxState = checkboxStates[checkbox.id];
            
            // Si checkboxState existe alors :
            if (checkboxState !== undefined) {
                // On coche les checkboxes correspondantes à l'élément enregistré dans le LS
                checkbox.checked = checkboxState;
            }
        });
        
        // On récupère toutes les checkboxes cochées
        const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
        // Puis on met à jour le nombre de checkboxes cochées dans le total 
        allChecked.textContent = checkedCount;
    }

    // Si il y a un objet checkedStates dans le LS alors : 
    if (checkedStates) {
        // On parcourt les objets item de la liste accordionItems
        accordionItems.forEach((item) => {
            // On stock le nombre d'élément cochés dans l'item
            const checkedState = checkedStates[item.id];
            // On récupère la span checked
            const checked = item.querySelector('.checked');
            
            // Si checkedState existe alors :
            if (checkedState !== undefined) {
                // On affiche la valeur correspondantes à l'élément enregistré dans le LS
                checked.textContent = checkedState;
            }
        });
    }
}

// Charger les états des checkboxes depuis le stockage local lors du chargement de la page
window.addEventListener('load', loadCheckboxes);

/**
 * Ajout de l'évènement "change" sur chacun des checkboxes
 * 
 * event.target.matches :
 * est une méthode JavaScript qui permet de vérifier 
 * si l'élément sur lequel un événement a été déclenché 
 * correspond à un sélecteur CSS spécifié.
 * 
 */
document.addEventListener('change', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        // Récupération de toutes les checkboxes cochées dans le DOM
        const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
        // Affichage du nombre de checkboxes cochées
        allChecked.textContent = checkedCount;
        // Sauvegarder les états des checkboxes dans le stockage local à chaque changement
        saveCheckboxes(); 
    }
});

// Évènement qui permet de vider le LS et de rafraîchir la page
button.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

// On parcourt les objets item de la liste accordionItems
accordionItems.forEach((item) => {
    // Récupération des éléments checkboxes de l'accordion dans lequel on se trouve au moment de la boucle
    const accordionCheckboxes = item.querySelectorAll('.form-check-input');
    // Récupération des spans nécessaires
    const subtotal = item.querySelector('.subtotal');
    const checked = item.querySelector('.checked');
    
    // Récupère le nombre sous-total des checkboxes dans l'élément où on est
    subtotal.textContent = accordionCheckboxes.length;
    
    /** 
     * 
     * Ajout de l'évènement "change" sur les checkboxes qui se trouvent dans l'item
     * 
     * event.target.matches :
     * est une méthode JavaScript qui permet de vérifier 
     * si l'élément sur lequel un événement a été déclenché 
     * 
     */
    item.addEventListener('change', (event) => {
        if (event.target.matches('.form-check-input')) {
             // Récupération de toutes les checkboxes cochées dans le DOM
            const checkedCount = item.querySelectorAll('.form-check-input:checked').length;
            // Affichage du nombre de checkboxes cochées
            checked.textContent = checkedCount;
            // Sauvegarder les états des checkboxes dans le stockage local à chaque changement
            saveCheckboxes(); 
        }
    });
});

// --------------------------------------------------

// Fonction pour afficher l'année en cours
function getCurrentYear (){
    let date = new Date();
    const copyright = document.getElementById('copyright');
    date = date.getFullYear();
    return copyright.innerText = date;
}

getCurrentYear();