const foodForm = document.getElementById("food-form");
const foodList = document.getElementById("food-list");
const emptyState = document.getElementById("empty-state");
const recipeList = document.getElementById("recipe-list");
const recipeEmpty = document.getElementById("recipe-empty");

const totalFoods = document.getElementById("total-foods");
const freshFoods = document.getElementById("fresh-foods");
const expiringFoods = document.getElementById("expiring-foods");
const expiredFoods = document.getElementById("expired-foods");

const foodSearch = document.getElementById("food-search");
const filterButtons = document.querySelectorAll(".filter-button");

const shoppingForm = document.getElementById("shopping-form");
const shoppingList = document.getElementById("shopping-list");
const shoppingEmpty = document.getElementById("shopping-empty");
const clearBoughtButton = document.getElementById("clear-bought-button");

const shoppingTotal = document.getElementById("shopping-total");
const shoppingBought = document.getElementById("shopping-bought");
const shoppingRemaining = document.getElementById("shopping-remaining");

const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toast-icon");
const toastMessage = document.getElementById("toast-message");

let foods = JSON.parse(localStorage.getItem("frigXpireFoods")) || [];
let shoppingItems = JSON.parse(localStorage.getItem("frigXpireShopping")) || [];

let currentFilter = "all";

const recipes = [
    {
        name: "Vegetable Omelette",
        ingredients: ["egg", "milk", "cheese", "tomato", "onion"],
        icon: "🍳",
        steps: [
            "Crack the eggs into a bowl and whisk with milk.",
            "Chop the tomato and onion into small pieces.",
            "Heat a pan and lightly cook the onion and tomato.",
            "Pour in the egg mixture and cook until almost set.",
            "Add cheese, fold the omelette, and serve warm."
        ]
    },
    {
        name: "Tomato Pasta",
        ingredients: ["tomato", "pasta", "onion", "cheese"],
        icon: "🍝",
        steps: [
            "Boil the pasta in salted water until tender.",
            "Chop the tomatoes and onion.",
            "Cook the onion in a pan until soft.",
            "Add tomatoes and cook until they become a sauce.",
            "Mix the cooked pasta with the sauce and add cheese."
        ]
    },
    {
        name: "Chicken Rice Bowl",
        ingredients: ["chicken", "rice", "onion", "carrot"],
        icon: "🍚",
        steps: [
            "Cook the rice according to the package instructions.",
            "Cut the chicken into small pieces.",
            "Cook the chicken in a pan until fully cooked.",
            "Add chopped onion and carrot and cook until tender.",
            "Serve the chicken and vegetables over the cooked rice."
        ]
    },
    {
        name: "Cheese Sandwich",
        ingredients: ["bread", "cheese", "tomato"],
        icon: "🥪",
        steps: [
            "Place slices of cheese on one piece of bread.",
            "Slice the tomato and place it over the cheese.",
            "Add another slice of bread on top.",
            "Toast the sandwich in a pan or sandwich maker.",
            "Cook until the bread is golden and the cheese melts."
        ]
    },
    {
        name: "Fruit Smoothie",
        ingredients: ["banana", "milk", "yogurt", "strawberry"],
        icon: "🥤",
        steps: [
            "Peel the banana and cut it into pieces.",
            "Wash the strawberries and remove their tops.",
            "Add banana, strawberries, milk, and yogurt to a blender.",
            "Blend until smooth and creamy.",
            "Pour into a glass and serve immediately."
        ]
    },
    {
        name: "Chicken Pasta",
        ingredients: ["chicken", "pasta", "onion", "cheese"],
        icon: "🍝",
        steps: [
            "Boil the pasta until tender and drain it.",
            "Cut the chicken into small pieces.",
            "Cook the chicken in a pan until fully cooked.",
            "Add chopped onion and cook until soft.",
            "Mix in the pasta and cheese and cook for a few minutes."
        ]
    },
    {
        name: "Chicken Salad",
        ingredients: ["chicken", "tomato", "onion", "carrot"],
        icon: "🥗",
        steps: [
            "Cook the chicken until fully cooked and let it cool.",
            "Chop the tomato, onion, and carrot.",
            "Cut the cooked chicken into small pieces.",
            "Combine the chicken and vegetables in a bowl.",
            "Mix well and serve fresh."
        ]
    },
    {
        name: "Rice Vegetable Bowl",
        ingredients: ["rice", "carrot", "onion", "tomato"],
        icon: "🥘",
        steps: [
            "Cook the rice according to the package instructions.",
            "Chop the carrot, onion, and tomato.",
            "Cook the onion and carrot in a pan.",
            "Add the tomato and cook until the vegetables are tender.",
            "Serve the vegetables over the cooked rice."
        ]
    }
];

function saveFoods() {
    localStorage.setItem("frigXpireFoods", JSON.stringify(foods));
}

function saveShoppingItems() {
    localStorage.setItem(
        "frigXpireShopping",
        JSON.stringify(shoppingItems)
    );
}

function getExpiryStatus(expiryDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const daysLeft = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
        return "expired";
    }

    if (daysLeft <= 2) {
        return "expires-soon";
    }

    return "fresh";
}

function getDaysLeft(expiryDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);

    return Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
    );
}

function getStatusText(status) {
    if (status === "expires-soon") {
        return "Expires soon";
    }

    if (status === "expired") {
        return "Expired";
    }

    return "Fresh";
}

function getFoodEmoji(name) {
    const foodName = name.toLowerCase();

    if (foodName.includes("apple")) return "🍎";
    if (foodName.includes("banana")) return "🍌";
    if (foodName.includes("carrot")) return "🥕";
    if (foodName.includes("chicken")) return "🍗";
    if (foodName.includes("egg")) return "🥚";
    if (foodName.includes("milk")) return "🥛";
    if (foodName.includes("cheese")) return "🧀";
    if (foodName.includes("tomato")) return "🍅";
    if (foodName.includes("bread")) return "🍞";
    if (foodName.includes("rice")) return "🍚";
    if (foodName.includes("pasta")) return "🍝";
    if (foodName.includes("strawberry")) return "🍓";
    if (foodName.includes("yogurt")) return "🥣";
    if (foodName.includes("onion")) return "🧅";
    if (foodName.includes("potato")) return "🥔";
    if (foodName.includes("fish")) return "🐟";

    return "🥬";
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function showToast(message, icon) {
    toastIcon.textContent = icon || "✓";
    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

function updateStats() {
    let fresh = 0;
    let expiring = 0;
    let expired = 0;

    foods.forEach(function (food) {
        const status = getExpiryStatus(food.expiryDate);

        if (status === "fresh") {
            fresh++;
        } else if (status === "expires-soon") {
            expiring++;
        } else {
            expired++;
        }
    });

    totalFoods.textContent = foods.length;
    freshFoods.textContent = fresh;
    expiringFoods.textContent = expiring;
    expiredFoods.textContent = expired;
}

function updateExpiryAlert() {
    const alertSection = document.getElementById("expiry-alert-section");
    const alertBox = document.getElementById("expiry-alert");
    const alertTitle = document.getElementById("alert-title");
    const alertMessage = document.getElementById("alert-message");

    if (!alertSection || !alertBox) {
        return;
    }

    const expiringFoodsList = foods.filter(function (food) {
        return getExpiryStatus(food.expiryDate) === "expires-soon";
    });

    const expiredFoodsList = foods.filter(function (food) {
        return getExpiryStatus(food.expiryDate) === "expired";
    });

    if (
        expiringFoodsList.length === 0 &&
        expiredFoodsList.length === 0
    ) {
        alertBox.classList.remove("show");
        return;
    }

    alertBox.classList.add("show");

    if (expiredFoodsList.length > 0) {
        alertTitle.textContent = "Food needs your attention";

        alertMessage.textContent =
            expiredFoodsList.length +
            " food item" +
            (expiredFoodsList.length > 1 ? "s" : "") +
            " " +
            (expiredFoodsList.length > 1 ? "have" : "has") +
            " expired. " +
            expiringFoodsList.length +
            " item" +
            (expiringFoodsList.length > 1 ? "s are" : " is") +
            " expiring soon.";
    } else {
        alertTitle.textContent = "Food expiring soon";

        alertMessage.textContent =
            expiringFoodsList.length +
            " food item" +
            (expiringFoodsList.length > 1 ? "s are" : " is") +
            " expiring within the next two days.";
    }
}

function displayFoods() {
    foodList.innerHTML = "";

    const searchText = foodSearch.value.toLowerCase().trim();

    const filteredFoods = foods.filter(function (food) {
        const status = getExpiryStatus(food.expiryDate);

        const nameMatches = food.name
            .toLowerCase()
            .includes(searchText);

        const filterMatches =
            currentFilter === "all" ||
            currentFilter === status;

        return nameMatches && filterMatches;
    });

    if (foods.length === 0) {
        foodList.appendChild(emptyState);
        updateStats();
        updateExpiryAlert();
        displayRecipes();
        return;
    }

    if (filteredFoods.length === 0) {
        const message = document.createElement("div");
        message.className = "empty-state";

        const icon = document.createElement("div");
        icon.className = "empty-icon";
        icon.textContent = "🔍";

        const heading = document.createElement("h3");
        heading.textContent = "No food found";

        const text = document.createElement("p");
        text.textContent = "Try another search or filter.";

        message.appendChild(icon);
        message.appendChild(heading);
        message.appendChild(text);

        foodList.appendChild(message);

        updateStats();
        updateExpiryAlert();
        displayRecipes();

        return;
    }

    filteredFoods.forEach(function (food) {
        const status = getExpiryStatus(food.expiryDate);
        const statusText = getStatusText(status);

        const card = document.createElement("article");
        card.className = "food-card";

        const content = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent =
            getFoodEmoji(food.name) + " " + food.name;

        const quantity = document.createElement("p");

        if (food.quantity && food.unit) {
            quantity.textContent =
                "Quantity: " +
                food.quantity +
                " " +
                food.unit;
        } else {
            quantity.textContent = "Quantity not specified";
        }

        const expiry = document.createElement("p");
        expiry.textContent =
            "Expires: " + formatDate(food.expiryDate);

        const statusElement = document.createElement("span");
        statusElement.className =
            "status " + status;
        statusElement.textContent = statusText;

        content.appendChild(title);
        content.appendChild(quantity);
        content.appendChild(expiry);
        content.appendChild(statusElement);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.dataset.id = food.id;
        deleteButton.textContent = "Delete";

        card.appendChild(content);
        card.appendChild(deleteButton);

        foodList.appendChild(card);
    });

    updateStats();
    updateExpiryAlert();
    displayRecipes();
}

function displayRecipes() {
    recipeList.innerHTML = "";

    if (foods.length === 0) {
        recipeList.appendChild(recipeEmpty);
        return;
    }

    const matches = [];

    recipes.forEach(function (recipe) {
        const available = [];
        const missing = [];
        const expiring = [];

        recipe.ingredients.forEach(function (ingredient) {
            let foundFood = null;

            foods.forEach(function (food) {
                if (
                    food.name
                        .toLowerCase()
                        .includes(ingredient)
                ) {
                    foundFood = food;
                }
            });

            if (foundFood) {
                available.push(ingredient);

                if (
                    getExpiryStatus(foundFood.expiryDate) ===
                    "expires-soon"
                ) {
                    expiring.push(ingredient);
                }
            } else {
                missing.push(ingredient);
            }
        });

        if (available.length > 0) {
            matches.push({
                name: recipe.name,
                icon: recipe.icon,
                available: available,
                missing: missing,
                expiring: expiring,
                steps: recipe.steps,
                percentage: Math.round(
                    (available.length /
                        recipe.ingredients.length) *
                        100
                )
            });
        }
    });

    matches.sort(function (a, b) {
        if (b.expiring.length !== a.expiring.length) {
            return b.expiring.length - a.expiring.length;
        }

        return b.percentage - a.percentage;
    });

    if (matches.length === 0) {
        recipeList.appendChild(recipeEmpty);
        return;
    }

    matches.forEach(function (recipe) {
        const card = document.createElement("article");
        card.className = "recipe-card";

        const header = document.createElement("div");
        header.className = "recipe-card-header";

        const icon = document.createElement("div");
        icon.className = "recipe-card-icon";
        icon.textContent = recipe.icon;

        const titleBox = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = recipe.name;

        const percentage = document.createElement("span");
        percentage.className = "match-percentage";
        percentage.textContent =
            recipe.percentage + "% match";

        titleBox.appendChild(title);
        titleBox.appendChild(percentage);

        header.appendChild(icon);
        header.appendChild(titleBox);

        card.appendChild(header);

        if (recipe.expiring.length > 0) {
            const warning = document.createElement("p");
            warning.className = "recipe-priority";
            warning.textContent =
                "⚠ Uses food that expires soon";

            card.appendChild(warning);
        }

        const ingredientsTitle =
            document.createElement("h4");

        ingredientsTitle.textContent = "Ingredients";
        ingredientsTitle.style.marginBottom = "10px";

        card.appendChild(ingredientsTitle);

        const ingredients = document.createElement("div");
        ingredients.className = "ingredients";

        recipe.available.forEach(function (ingredient) {
            const item = document.createElement("span");

            if (recipe.expiring.includes(ingredient)) {
                item.className =
                    "ingredient expiring";
                item.textContent =
                    "⚠ " + ingredient;
            } else {
                item.className =
                    "ingredient available";
                item.textContent =
                    "✓ " + ingredient;
            }

            ingredients.appendChild(item);
        });

        recipe.missing.forEach(function (ingredient) {
            const item = document.createElement("span");

            item.className = "ingredient missing";
            item.textContent =
                "○ " + ingredient;

            ingredients.appendChild(item);
        });

        card.appendChild(ingredients);

        const preparationTitle =
            document.createElement("h4");

        preparationTitle.textContent =
            "How to prepare";

        preparationTitle.style.marginTop = "20px";
        preparationTitle.style.marginBottom = "10px";

        card.appendChild(preparationTitle);

        const steps = document.createElement("ol");

        steps.style.paddingLeft = "22px";
        steps.style.marginBottom = "5px";

        recipe.steps.forEach(function (step) {
            const stepItem =
                document.createElement("li");

            stepItem.textContent = step;
            stepItem.style.marginBottom = "7px";
            stepItem.style.color = "#61706c";
            stepItem.style.fontSize = "0.85rem";

            steps.appendChild(stepItem);
        });

        card.appendChild(steps);

        recipeList.appendChild(card);
    });
}

function displayShoppingList() {
    shoppingList.innerHTML = "";

    if (shoppingItems.length === 0) {
        shoppingList.appendChild(shoppingEmpty);
        updateShoppingStats();
        return;
    }

    shoppingItems.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "shopping-card";

        if (item.bought) {
            card.classList.add("bought");
        }

        const info = document.createElement("div");
        info.className = "shopping-info";

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "shopping-check";
        checkbox.dataset.id = item.id;
        checkbox.checked = item.bought;

        const textBox = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent =
            getFoodEmoji(item.name) +
            " " +
            item.name;

        const details = document.createElement("p");
        details.textContent =
            item.quantity +
            " " +
            item.unit;

        textBox.appendChild(title);
        textBox.appendChild(details);

        info.appendChild(checkbox);
        info.appendChild(textBox);

        const actions =
            document.createElement("div");

        actions.className =
            "shopping-card-actions";

        const buyButton =
            document.createElement("button");

        buyButton.className = "buy-button";
        buyButton.dataset.id = item.id;

        buyButton.textContent =
            item.bought ? "Bought" : "Mark Bought";

        const deleteButton =
            document.createElement("button");

        deleteButton.className = "delete-button";
        deleteButton.dataset.id = item.id;
        deleteButton.textContent = "Delete";

        actions.appendChild(buyButton);
        actions.appendChild(deleteButton);

        card.appendChild(info);
        card.appendChild(actions);

        shoppingList.appendChild(card);
    });

    updateShoppingStats();
}

function updateShoppingStats() {
    const total = shoppingItems.length;

    const bought = shoppingItems.filter(function (item) {
        return item.bought;
    }).length;

    const remaining = total - bought;

    shoppingTotal.textContent = total;
    shoppingBought.textContent = bought;
    shoppingRemaining.textContent = remaining;
}

foodForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput =
        document.getElementById("food-name");

    const quantityInput =
        document.getElementById("food-quantity");

    const unitInput =
        document.getElementById("food-unit");

    const dateInput =
        document.getElementById("expiry-date");

    const name = nameInput.value.trim();
    const quantity = quantityInput.value.trim();
    const unit = unitInput.value;
    const date = dateInput.value;

    if (
        name === "" ||
        quantity === "" ||
        unit === "" ||
        date === ""
    ) {
        showToast(
            "Please complete all food details.",
            "⚠"
        );
        return;
    }

    foods.push({
        id: Date.now(),
        name: name,
        quantity: quantity,
        unit: unit,
        expiryDate: date
    });

    saveFoods();
    foodForm.reset();

    displayFoods();

    showToast(
        name + " added to your fridge.",
        "🥬"
    );
});

foodList.addEventListener("click", function (event) {
    if (
        !event.target.classList.contains(
            "delete-button"
        )
    ) {
        return;
    }

    const id =
        Number(event.target.dataset.id);

    const food = foods.find(function (item) {
        return item.id === id;
    });

    foods = foods.filter(function (food) {
        return food.id !== id;
    });

    saveFoods();
    displayFoods();

    if (food) {
        showToast(
            food.name + " removed.",
            "🗑️"
        );
    }
});

foodSearch.addEventListener("input", function () {
    displayFoods();
});

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter =
            button.dataset.filter;

        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        displayFoods();
    });
});

shoppingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput =
        document.getElementById("shopping-name");

    const quantityInput =
        document.getElementById("shopping-quantity");

    const unitInput =
        document.getElementById("shopping-unit");

    const name =
        nameInput.value.trim();

    const quantity =
        quantityInput.value.trim();

    const unit =
        unitInput.value;

    if (
        name === "" ||
        quantity === "" ||
        unit === ""
    ) {
        showToast(
            "Please complete all shopping details.",
            "⚠"
        );
        return;
    }

    shoppingItems.push({
        id: Date.now(),
        name: name,
        quantity: quantity,
        unit: unit,
        bought: false
    });

    saveShoppingItems();
    shoppingForm.reset();

    displayShoppingList();

    showToast(
        name + " added to shopping list.",
        "🛒"
    );
});

shoppingList.addEventListener("click", function (event) {
    const id =
        Number(event.target.dataset.id);

    if (
        event.target.classList.contains(
            "buy-button"
        )
    ) {
        shoppingItems =
            shoppingItems.map(function (item) {
                if (item.id === id) {
                    return {
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        unit: item.unit,
                        bought: !item.bought
                    };
                }

                return item;
            });

        saveShoppingItems();
        displayShoppingList();

        showToast(
            "Shopping item updated.",
            "✓"
        );

        return;
    }

    if (
        event.target.classList.contains(
            "delete-button"
        )
    ) {
        const item =
            shoppingItems.find(function (item) {
                return item.id === id;
            });

        shoppingItems =
            shoppingItems.filter(function (item) {
                return item.id !== id;
            });

        saveShoppingItems();
        displayShoppingList();

        if (item) {
            showToast(
                item.name + " removed.",
                "🗑️"
            );
        }
    }
});

shoppingList.addEventListener("change", function (event) {
    if (
        !event.target.classList.contains(
            "shopping-check"
        )
    ) {
        return;
    }

    const id =
        Number(event.target.dataset.id);

    shoppingItems =
        shoppingItems.map(function (item) {
            if (item.id === id) {
                return {
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    unit: item.unit,
                    bought: event.target.checked
                };
            }

            return item;
        });

    saveShoppingItems();
    displayShoppingList();
});

clearBoughtButton.addEventListener(
    "click",
    function () {
        shoppingItems =
            shoppingItems.filter(function (item) {
                return !item.bought;
            });

        saveShoppingItems();
        displayShoppingList();

        showToast(
            "Bought items cleared.",
            "✓"
        );
    }
);

displayFoods();
displayShoppingList();