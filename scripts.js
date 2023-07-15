document.addEventListener("DOMContentLoaded", function() {
    var bicyclesContainer = document.getElementById("bicycles");
    var filterForm = document.getElementById("filter-form");
  
    filterForm.addEventListener("submit", function(event) {
      event.preventDefault();
      filterBicycles();
    });
  
    function filterBicycles() {
      var titleInput = document.getElementById("title-input");
      var priceInput = document.getElementById("price-input");
  
      var titleValue = titleInput.value.toLowerCase();
      var priceValue = parseInt(priceInput.value);
  
      var filteredBicycles = bicycles.filter(function(bicycle) {
        var matchesTitle = bicycle.titulo.toLowerCase().includes(titleValue);
        var matchesPrice = isNaN(priceValue) || bicycle.precio <= priceValue;
  
        return matchesTitle && matchesPrice;
      });
  
      displayBicycles(filteredBicycles);
    }
  
    function displayBicycles(bicycles) {
      bicyclesContainer.innerHTML = "";
  
      bicycles.forEach(function(bicycle) {
        var bicycleDiv = document.createElement("div");
        bicycleDiv.className = "bicycle";
  
        var image = new Image();
        image.src = bicycle.imagen;
        image.alt = bicycle.titulo;
        bicycleDiv.appendChild(image);
  
        var title = document.createElement("h3");
        title.textContent = bicycle.titulo;
        bicycleDiv.appendChild(title);
  
        var description = document.createElement("p");
        description.textContent = bicycle.descripcion;
        bicycleDiv.appendChild(description);
  
        var price = document.createElement("p");
        price.textContent = "Precio: $" + bicycle.precio;
        bicycleDiv.appendChild(price);
  
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = "Reservar";
        bicycleDiv.appendChild(link);
  
        bicyclesContainer.appendChild(bicycleDiv);
      });
    }
  
    // Cargar el archivo data.json
    fetch("data.json")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Aquí se encuentra tu arreglo de bicicletas obtenido del archivo JSON
        bicycles = data.bicycles;
  
        displayBicycles(bicycles);
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  });
  