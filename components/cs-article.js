import { getRequestData } from '../services/data.service.js';

class article extends HTMLElement {
  constructor() {
    super();
  }
  /**
  * Variable compartida para almacenar el listado de la respuesta del servicio
  */
  static allArticles;

  connectedCallback() {
    /**
    * Pedimos los datos de los artículos al servicio
    */
    let getFetch = async () => {
      window.allArticles = await getRequestData();
      this.innerHTML += `<article style='' class="item text-item d-flex" id='99999999' alt="IMG">
          <h4 class="material-symbols-outlined">loyalty</h4>
          <p class="mt-2 mb-0 text-white">Explora nuestra selección</p>
          <hr class="border">
          <small class="">Encuentra tu próxima pieza de colección ¡hoy mismo!</small>
          </article>`;
      var count = 1;
      window.allArticles.forEach(element => {
        if ( (count % 8) == 0) {
          this.innerHTML += `<article style='background-image:url("${element.images[0]}")' class="item big-item" alt="IMG" id="${element.id}" ><div class=" d-flex w-100 justify-content-between align-items-end pb-3"><div class="d-block ms-3"><h6 class="p-3">${element.price}€</h6></div></div>`;

          count++
        } else {
          this.innerHTML += `<article style='background-image:url("${element.images[0]}")' class="item" alt="IMG" class="regular-item"  id="${element.id}"><div class="d-flex w-100 justify-content-between align-items-end pb-3"><div class="d-block ms-3"><h6 class="p-3">${element.price}€</h6></div></div></article>`;
          count++
        }
        let idNumber = document.getElementById(`${element.id}`);
        if (element.soldOut) {
          idNumber.classList.add("sold-out");
        }
        if (element.reserved) {
          idNumber.classList.add("reserved");
        }

      });

this.innerHTML += `<article class="item text-item d-flex bg-warning" id='99999999' alt="IMG">
          <h4 class="material-symbols-outlined text-dark">voice_selection</h4>
          <p class="mt-2 mb-0 text-muted">Contacta con nosotros</p>
          <small class="">Dudas, lotes, envíos, sugerencias, piropos,...</small><a href="#" class="btn btn-sm btn-rounded btn-dark mt-3 mb-2">Contacto</a>
          </article>`;
      var count = 1;      //Añadimos el evento 
      window.allArticles.forEach(element => {
        var myModal = document.getElementById(`${element.id}`);
        myModal.addEventListener("click", modifyText, false);
        myModal.myParam = `${element.id}`;
      });
    }
    getFetch();


    function modifyText(evt) {
      var article = evt.currentTarget.myParam;
      window.selectedArticle = window.allArticles.find(element => element.id == article);
      var list = document.querySelector("cs-modal");
      list.setAttribute("filter", JSON.stringify(window.selectedArticle.id));
    }


  }




};

window.customElements.define("cs-article", article);




