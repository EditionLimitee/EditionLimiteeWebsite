class GuildDisplay extends HTMLElement{

    guildName = undefined;
    realm = undefined;

    members = [];

    constructor(){
        super();
    }

    async connectedCallback(){
        this.innerHTML="loading";
        
        this.guildName = this.getAttribute('name');
        this.realm = this.getAttribute('realm');
        this.minRank = this.getAttribute('minRank');
        this.maxRank = this.getAttribute('maxRank');

        //faire l'appel à l'api de raider.io
        const response = await fetch(`https://raider.io/api/v1/guilds/profile?region=eu&realm=${this.realm}&name=${this.guildName}&fields=members`)
        
        if(! response.ok ) {
            console.log("we had an error", response.status);
            return;
        }
        const guild = await response.json();
        
        this.members = guild.members.filter(member => member.rank >= this.minRank && member.rank <= this.maxRank);
        
        this.render();
    }

    render(){

        this.innerHTML = "";
//création tableau Général pour affichage membre
        let table = document.createElement('table');
        table.setAttribute('id','listeMember');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);
        document.querySelector('#guild').appendChild(table);

    //Création en tête de tableau
        let trRowHead = document.createElement('tr');
        trRowHead.setAttribute('id','rosterHeading')
        

        for( let i=0; i<6; i++){
            let thRowHead = document.createElement('th');
                let imgFlecheHaut = document.createElement('img');
                imgFlecheHaut.setAttribute('class','flecheHaut');
                imgFlecheHaut.src = 'image/fleche.png';
            let imgFlecheBas = document.createElement('img');
                imgFlecheBas.setAttribute('class','flecheBas');
                imgFlecheBas.src = 'image/fleche.png';

            switch(i){
                case 0 : thRowHead.innerHTML =  '<div id="rosterRole">Role</div>';
                break;
                case 1 : thRowHead.innerHTML =  '<div id="rosterNom">Nom</div>';
                break;
                case 2 : thRowHead.innerHTML =  '<div id="rosterClasse">Classe</div>';
                break;
                case 3 : thRowHead.innerHTML =  '<div id="rosterSpe">Spécialisation</div>';
                break;
                case 4 : thRowHead.innerHTML =  '<div id="rosterHautfait">Haut Fait</div>';
                break;
                case 5 : thRowHead.innerHTML =  '<div id="rosterArmurerie">Armurerie</div>';
                break;
            }
            trRowHead.appendChild(thRowHead);
            thRowHead.appendChild(imgFlecheHaut);
            thRowHead.appendChild(imgFlecheBas);
        }
        thead.appendChild(trRowHead);
    //Fin création en tête de tableau     

    //Création charactere display et insertion de la liste des membres 
        this.members.map(member=>{
            const characterDisplay = document.createElement("character-display");
            
            for(let key in member.character){
                characterDisplay.dataset[key] =  member.character[key]; 
            }
            return characterDisplay;
        }).forEach(characterDisplay => this.appendChild(characterDisplay));
    }
}

window.customElements.define('guild-display', GuildDisplay);


