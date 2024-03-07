if (!localStorage.getItem("isLoggedIn")) {
    // Redirect to login page if not logged in
    window.location.href = "login.html";
}

// --------------add product--------------

function getInputData() {
    let productName = document.getElementById("productNameInput").value;
    let productModel = document.getElementById("productModelInput").value;

    if (productName === "" || productModel === "") {
        alert("You have to fill all the fields");
    } else {
        let productData = {
            productName: productName,
            productModel: productModel,
        };
        let existingProducts = localStorage.getItem('products');
        existingProducts = existingProducts ? JSON.parse(existingProducts) : [];

        // Check if product with the same name already exists
        let isProductExist = existingProducts.some(product => product.productName === productName);
        if (isProductExist) {
            alert("Product already registered");
        } else {
            existingProducts.push(productData);
            localStorage.setItem('products', JSON.stringify(existingProducts));
            alert('Product added');
            location.reload();
        }
    }
}

// ----------------------------------------------------------

// ----------------get produts----------------

let allProducts = localStorage.getItem("products");
let productsStrin = JSON.parse(localStorage.products);
for (i = 0; i < productsStrin.length; i++) {
    console.log(productsStrin[i].productName, productsStrin[i].productModel);
    let pName = productsStrin[i].productName;
    let pModel = productsStrin[i].productModel;

    let productList = document.getElementById("productList");
    let newRow = productList.insertRow();
    let cellOne = newRow.insertCell(0);
    let cellTwo = newRow.insertCell(1);
    let cellThree = newRow.insertCell(2);

    cellOne.textContent = pName;
    cellTwo.textContent = pModel;

    cellThree.innerHTML = '<button class="edit bg-info mx-3 my-3" onclick="editProduct(this)">Edit</button><button class="remove bg-danger" onclick="removeProduct(this)">Remove</button>';
}


// ----------------edit product---------------


function editProduct(button) {
    let row = button.parentNode.parentNode; // Get the parent row
    let productName = row.cells[0].textContent;
    let productModel = row.cells[1].textContent;

    // Populate input fields with current product name and model
    document.getElementById("productNameInput").value = productName;
    document.getElementById("productModelInput").value = productModel;

    // Change the add button to an update button
    let addButton = document.getElementById("addButton");
    addButton.textContent = "Update";
    addButton.onclick = function () {
        updateProduct(row);
    };
}
// ------------------update product------------------

function updateProduct(row) {
    let productName = document.getElementById("productNameInput").value;
    let productModel = document.getElementById("productModelInput").value;
    if (productName === "" || productModel === "") {
        alert("You have to fill all the fields");
    } else {
        // Update the row in the table
        row.cells[0].textContent = productName;
        row.cells[1].textContent = productModel;

        // Update the product in the localStorage
        let products = JSON.parse(localStorage.getItem('products'));
        let index = Array.from(row.parentNode.rows).indexOf(row);
        if (index !== -1) {
            products[index].productName = productName;
            products[index].productModel = productModel;
            localStorage.setItem('products', JSON.stringify(products));
        }

        // Reset the form and button text
        document.getElementById("productNameInput").value = "";
        document.getElementById("productModelInput").value = "";
        let addButton = document.getElementById("addButton");
        addButton.textContent = "Add";
        addButton.onclick = getInputData;

        alert('Product updated successfully');
    }
}

// -----------------remove--------------------
function removeProduct(button) {
    let row = button.parentNode.parentNode; // Get the parent row of the button

    let products = JSON.parse(localStorage.getItem('products'));
    let index = Array.from(row.parentNode.rows).indexOf(row); // Get the index of the row in the table
    if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        row.remove();
        alert('Product removed successfully');
    } else {
        alert('Error removing product');
    }
}

// -----------------logout--------------
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}