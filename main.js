var form = document.getElementById('addForm');
var electronicsList = document.getElementById('electronic');
var foodList = document.getElementById('food');
var skinCareList = document.getElementById('skincare');

electronicsList.addEventListener('click', removeItem);
foodList.addEventListener('click', removeItem);
skinCareList.addEventListener('click', removeItem);

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure? You want to delete this item?')) {
            var li = e.target.parentElement;
            var categoryValue = document.getElementById('category').value;
            if (categoryValue == 'Electronics') {
                electronicsList.removeChild(li);
            } else if (categoryValue == 'Food') {
                foodList.removeChild(li);
            } else if (categoryValue == 'skinCare') {
                skinCareList.removeChild(li);
            } 
        }
    }
}
// creating a event listener for Adding items:
form.addEventListener('submit', addCandies);
function addCandies(e){
    e.preventDefault();
    // getting candies details from the form
    var productPrice = document.getElementById('inputProductPrice').value;
    var productDesc = document.getElementById('inputProductDescription').value;
    var categoryValue = document.getElementById('category').value;

    // Now creating a list item so we can add it on our page
    var li = document.createElement('li');
    li.className = 'list-group-item';

    var bigSpace = '  -  ';
    li.appendChild(document.createTextNode('Product Price: ₹' + productPrice));
    li.appendChild(document.createTextNode(bigSpace));
    li.appendChild(document.createTextNode('Product Description: ' + productDesc));
    li.appendChild(document.createTextNode(bigSpace));
    li.appendChild(document.createTextNode('Category: ' + categoryValue));
    
    // create del button element 
    var deleteBtn = document.createElement('button');
    // Add class to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));
    // Append btn to li
    li.appendChild(deleteBtn);

    var productDetails = {
        productPrice: productPrice,
        productDescription: productDesc,
        category: categoryValue,
    };

    axios.post("https://crudcrud.com/api/d2a6cb3dcd84472081f19f411ff0d906/adminPage"
    , productDetails)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    if (categoryValue == 'Electronics') {
        electronicsList.appendChild(li);
        console.log('products are added to Electronics category!!!');
    } else if (categoryValue == 'Food') {
        foodList.appendChild(li);
        console.log('products are added to Food category!!!');
    } else if (categoryValue == 'skinCare') {
        skinCareList.appendChild(li);
        console.log('products are added to Skin Care category!!!');
    }
}

document.addEventListener('DOMContentLoaded', handlePageLoad);
function handlePageLoad() {
    axios.get("https://crudcrud.com/api/d2a6cb3dcd84472081f19f411ff0d906/adminPage")
        .then((response) => {
            showNewUserOnScreen(response.data);
        })
        .catch((err) => {
            console.error('Error while fetching data:', err);
        });
}

function showNewUserOnScreen(users) {
    document.getElementById('inputProductPrice').value = '';
    document.getElementById('inputProductDescription').value = '';
    document.getElementById('category').value = '';

    for (var i = 0; i < users.length; i++) {
        const product = users[i];
        console.log(product)
        const li = document.createElement('li');
        li.className = 'list-group-item';

        const childHTML = `
            Product Price: ₹${product.productPrice} - Product Description: ${product.productDescription} - Category: ${product.category}
            <button class= 'btn btn-danger btn-sm float-right delete' onclick="deleteProduct('${product._id}')">X</button>`;

        li.innerHTML = childHTML;
        if (product.category == 'Electronics') {
            electronicsList.appendChild(li);
            console.log('products are added to Electronics category!!!');
        } else if (product.category == 'Food') {
            foodList.appendChild(li);
            console.log('products are added to Food category!!!');
        } else if (product.category == 'skinCare') {
            skinCareList.appendChild(li);
            console.log('products are added to Skin Care category!!!');
        }
        
    }
}

function deleteProduct(productId){
    axios.delete(`https://crudcrud.com/api/d2a6cb3dcd84472081f19f411ff0d906/adminPage/${productId}`)
    .then((response) => {
        removeUserFromScreen(productId)
    })
    .catch((err) => err)
}

function removeUserFromScreen(productId) {
    const parentNode = document.getElementById('items');
    const childNodeTobeDeleted = document.getElementById(productId);
    if (childNodeTobeDeleted){
        parentNode.removeChild(childNodeTobeDeleted)
    }
}

