const API_URL = 'http://localhost:3000/api/entries';

document.addEventListener('DOMContentLoaded', () => {
    createUI();
    attachEventListeners();
    loadItems();
});

function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}

function createFormGroup(labelId, labelText, inputTag, inputName, isRequired = true, isSelect = false, options = []) {
    const div = createElement('div', 'form-group');
    
    const label = createElement('label', '', labelText);
    label.setAttribute('for', labelId);
    div.appendChild(label);

    let input;
    if (isSelect) {
        input = createElement('select');
        options.forEach(opt => {
            const option = createElement('option', '', opt.text);
            option.value = opt.value;
            input.appendChild(option);
        });
    } else {
        input = createElement(inputTag);
    }
    
    input.id = labelId;
    input.name = inputName;
    if (isRequired) input.required = true;
    if (!isSelect && inputTag === 'input') input.type = 'text';

    div.appendChild(input);
    return div;
}

function createUI() {
    const appContainer = createElement('div', 'terminal-container');

    const header = createElement('header', 'lcars-header');
    header.appendChild(createElement('div', 'lcars-elbow'));
    const div = createElement('div', 'lcars-bar');
    div.appendChild(createElement('span', 'lcars-bar', '🚀'));
    div.appendChild(createElement('span', 'lcars-bar', 'GALACTIC ARCHIVE'));
    header.appendChild(div);
    appContainer.appendChild(header);

    const main = createElement('main', 'main-content');
    appContainer.appendChild(main);

    const section = createElement('section', 'item-list-section');
    section.appendChild(createElement('h2', '', 'ALIEN SPECIES DATABASE'));
    const archiveGrid = createElement('div', 'archive-grid');
    archiveGrid.id = 'archive-grid';
    section.appendChild(archiveGrid);
    main.appendChild(section);

    const aside = createElement('aside', 'control-panel');
    aside.appendChild(createElement('h2', '', 'NEW ENTRY INPUT'));
    
    const createForm = createElement('form');
    createForm.id = 'create-form';
    
    createForm.appendChild(createFormGroup('name', 'ENTITY NAME', 'input', 'name'));
    createForm.appendChild(createFormGroup('type', 'TYPE', 'input', 'type'));
    
    const dangerOptions = [
        { value: 'Unknown', text: 'UNKNOWN' },
        { value: 'Low', text: 'LOW' },
        { value: 'Moderate', text: 'MODERATE' },
        { value: 'High', text: 'HIGH' },
        { value: 'Extreme', text: 'EXTREME' }
    ];
    createForm.appendChild(createFormGroup('dangerLevel', 'DANGER LEVEL', 'select', 'dangerLevel', true, true, dangerOptions));
    
    createForm.appendChild(createFormGroup('description', 'DESCRIPTION', 'textarea', 'description'));
    
    const submitBtn = createElement('button', 'lcars-btn', 'INITIALIZE ENTRY');
    submitBtn.type = 'submit';
    createForm.appendChild(submitBtn);
    
    aside.appendChild(createForm);
    main.appendChild(aside);

    const modal = createElement('div', 'modal hidden');
    modal.id = 'edit-modal';
    
    const modalContent = createElement('div', 'modal-content lcars-panel');
    const modalHeader = createElement('header');
    modalHeader.appendChild(createElement('h3', '', 'MODIFY RECORD'));
    
    const closeBtn = createElement('button', 'close-btn', 'X');
    closeBtn.id = 'close-modal';
    modalHeader.appendChild(closeBtn);
    
    modalContent.appendChild(modalHeader);
    
    const editForm = createElement('form');
    editForm.id = 'edit-form';
    
    const editIdInput = createElement('input');
    editIdInput.type = 'hidden';
    editIdInput.id = 'edit-id';
    editForm.appendChild(editIdInput);
    
    editForm.appendChild(createFormGroup('edit-name', 'ENTITY NAME', 'input', 'name'));
    editForm.appendChild(createFormGroup('edit-type', 'TYPE', 'input', 'type'));
    editForm.appendChild(createFormGroup('edit-dangerLevel', 'DANGER LEVEL', 'select', 'dangerLevel', true, true, dangerOptions));
    editForm.appendChild(createFormGroup('edit-description', 'DESCRIPTION', 'textarea', 'description'));
    
    const updateBtn = createElement('button', 'lcars-btn action-update', 'UPDATE RECORD');
    updateBtn.type = 'submit';
    editForm.appendChild(updateBtn);
    
    modalContent.appendChild(editForm);
    modal.appendChild(modalContent);

    document.body.appendChild(appContainer);
    document.body.appendChild(modal);
}

function attachEventListeners() {
    const createForm = document.getElementById('create-form');
    const editForm = document.getElementById('edit-form');
    const closeModal = document.getElementById('close-modal');
    const editModal = document.getElementById('edit-modal');

    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newItem = {
            name: document.getElementById('name').value,
            type: document.getElementById('type').value,
            danger_level: document.getElementById('dangerLevel').value,
            description: document.getElementById('description').value
        };

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            createForm.reset();
            loadItems();
        } catch (error) {
            console.error('Error creating item:', error);
        }
    });

    closeModal.addEventListener('click', () => {
        editModal.classList.add('hidden');
    });

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const updatedItem = {
            name: document.getElementById('edit-name').value,
            type: document.getElementById('edit-type').value,
            danger_level: document.getElementById('edit-dangerLevel').value,
            description: document.getElementById('edit-description').value
        };

        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });
            editModal.classList.add('hidden');
            loadItems();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    });
}

async function loadItems() {
    try {
        const res = await fetch(API_URL);
        const rawItems = await res.json();
        const items = rawItems.map(item => ({
            ...item,
            danger_level: item.danger_level
        }));
        renderItems(items);
    } catch (error) {
        console.error('Error loading items:', error);
    }
}

function renderItems(items) {
    const archiveGrid = document.getElementById('archive-grid');
    archiveGrid.innerHTML = '';
    
    items.forEach(item => {
        const card = createElement('div', 'archive-card');
        
        card.appendChild(createElement('h3', '', item.name));
        
        const typeP = createElement('p');
        const typeStrong = createElement('strong', '', 'TYPE: ');
        typeP.appendChild(typeStrong);
        typeP.appendChild(document.createTextNode(item.type));
        card.appendChild(typeP);
        
        const dangerP = createElement('p');
        const dangerStrong = createElement('strong', '', 'DANGER LEVEL: ');
        dangerP.appendChild(dangerStrong);
        dangerP.appendChild(document.createTextNode(item.danger_level));
        card.appendChild(dangerP);
        
        const descP = createElement('p');
        const descStrong = createElement('strong', '', 'DESCRIPTION: ');
        descP.appendChild(descStrong);
        descP.appendChild(document.createTextNode(item.description));
        card.appendChild(descP);
        
        const actions = createElement('div', 'card-actions');
        
        const editBtn = createElement('button', 'lcars-btn action-edit', 'EDIT');
        editBtn.onclick = () => window.openEditModal(item.id);
        actions.appendChild(editBtn);
        
        const deleteBtn = createElement('button', 'lcars-btn action-delete', 'DELETE');
        deleteBtn.onclick = () => window.deleteItem(item.id);
        actions.appendChild(deleteBtn);
        
        card.appendChild(actions);
        archiveGrid.appendChild(card);
    });
}

window.deleteItem = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        loadItems();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};

window.openEditModal = async (id) => {
    const editModal = document.getElementById('edit-modal');
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const rawItem = await res.json();
        const item = {
            ...rawItem,
            dangerLevel: rawItem.danger_level || rawItem.dangerLevel
        };
        
        document.getElementById('edit-id').value = item.id;
        document.getElementById('edit-name').value = item.name;
        document.getElementById('edit-type').value = item.type;
        document.getElementById('edit-dangerLevel').value = item.dangerLevel;
        document.getElementById('edit-description').value = item.description;
        
        editModal.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching item details:', error);
    }
};
