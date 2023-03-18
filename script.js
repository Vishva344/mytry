// Define constants for local storage key and entity properties
const STORAGE_KEY = "entities";
const ENTITY_PROPS = ["name", "age", "city", "state"];

// Get references to form elements and entity table body
const form = document.getElementById("myForm");
const entityTableBody = document.getElementById("entityTableBody");

// Initialize local storage with an empty entities array if it doesn't exist
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, "[]");
}

// Function to render entities in the table
function renderEntities() {
  entityTableBody.innerHTML = ""; // Clear table body

  const entities = JSON.parse(localStorage.getItem(STORAGE_KEY));
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const row = document.createElement("tr");

    // Add columns for each entity property
    for (let j = 0; j < ENTITY_PROPS.length; j++) {
      const prop = ENTITY_PROPS[j];
      const cell = document.createElement("td");
      cell.textContent = entity[prop];
      row.appendChild(cell);
    }

    // Add edit and delete buttons
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      editEntity(i);
    };
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteEntity(i);
    };
    const actionCell = document.createElement("td");
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    entityTableBody.appendChild(row);
  }
}

// Function to add or update an entity in local storage
function saveEntity(entity) {
  const entities = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (entity.id === undefined) {
    // New entity: assign an ID and add to array
    entity.id = Date.now();
    entities.push(entity);
  } else {
    // Existing entity: find by ID and update properties
    function saveEntity(entity) {
      const entities = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (entity.id === undefined) {
        // New entity: assign an ID and add to array
        entity.id = Date.now();
        entities.push(entity);
      } else {
        // Existing entity: find by ID and update properties
        const index = entities.findIndex((e) => e.id === entity.id);
        if (index !== -1) {
          entities[index] = entity;
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
    }

    // Function to delete an entity from local storage
    function deleteEntity(id) {
      const entities = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const index = entities.findIndex((e) => e.id === id);
      if (index !== -1) {
        entities.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
      }
    }

    // HTML form elements
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");

    // Save button
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", () => {
      const entity = {
        name: nameInput.value,
        age: ageInput.value,
        city: cityInput.value,
        state: stateInput.value,
      };
      saveEntity(entity);
      clearForm();
    });

    // Clear button
    const clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", clearForm);
  }
  // Edit button (assuming there's a table with entities)
  const editButton = document.getElementById("edit-button");
  editButton.addEventListener("click", () => {
    const selectedEntityId = getSelectedEntityId();
    const entity = getEntityById(selectedEntityId);
    if (entity !== null) {
      nameInput.value = entity.name;
      ageInput.value = entity.age;
      cityInput.value = entity.city;
      stateInput.value = entity.state;
    }
  });

  // Delete button (assuming there's a table with entities)
  const deleteButton = document.getElementById("delete-button");
  deleteButton.addEventListener("click", () => {
    const selectedEntityId = getSelectedEntityId();
    deleteEntity(selectedEntityId);
  });

  // Helper function to clear the form
  function clearForm() {
    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "";
    stateInput.value = "";
  }

  // Helper function to get the ID of the selected entity (assuming there's a table with entities)
  function getSelectedEntityId() {
    // Implement your code to get the selected entity ID here
  }

  // Helper function to get an entity by ID
  function getEntityById(id) {
    const entities = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const entity = entities.find((e) => e.id === id);
    return entity !== undefined ? entity : null;
  }
}
