class CharacterDisplay extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
    
  
    this.render();
    }
    
    render(){
    // Affichage détail des membres de la guide
    let rowCharacter =  document.createElement('tr');
    
    for( let i=0; i<6; i++){
      let characterDetail = document.createElement('td');
      rowCharacter.appendChild(characterDetail);
        switch(i){
          case 0 : characterDetail.innerHTML =  this.dataset.active_spec_role;
          break;
          case 1 : characterDetail.innerHTML =  this.dataset.name;
          break;
          case 2 : characterDetail.innerHTML =  this.dataset.class;
          break;
          case 3 : characterDetail.innerHTML =  this.dataset.active_spec_name;
          break;
          case 4 : characterDetail.innerHTML =  this.dataset.achievement_points;
          break;
          case 5 : characterDetail.innerHTML =  'Lien Armurerie';
          break;
        }
    }  
    document.querySelector('#listeMember tbody').appendChild(rowCharacter);      
    
  }

}

window.customElements.define('character-display', CharacterDisplay);

