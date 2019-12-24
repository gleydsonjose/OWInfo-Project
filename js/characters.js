// Script que faz todo controle de manipulação de dados da página - PTBR
// This script control all characters data in page - EN
var cp = new Vue({
    el: "#section-characters-page",
    data: function(){
        return{ 
            name: null,
            mainImg: null,
            mainImgAlt: null,
            roleImg: null,
            roleImgAlt: null,
            role: null,
            life: [],
            armour: [],
            shield: [],
            description: null,
            skills: [],
            skillInfo: [],
            skillStats: [],
            skillDetails: [],
            biography: [],
            counters: []
        }
    },
    methods: {
        // Método para esconder a div de todas skills para mostrar uma div com informações de uma skill específica, além disso, o scrollbar será movido para o inicio - PTBR
        // Method for hiding div from all skills to show a div with information from a specific skill, in addition, the scrollbar will be moved to the beginning - EN
        skillAllData: function(info){
            document.querySelector('#character-skills').style.display = 'none';
            document.querySelector('#skill-info').style.display = 'flex';

            document.documentElement.scrollTop = 0;

            cp.skillInfo = info;
            cp.skillStats = info.data.stats;
            cp.skillDetails = info.data.details;
        }
    },
    created: function(){
        // PTBR
        // Antes de mostrar as informações dos personagens na página, será feito algumas verificações no parâmetro passado pela url, por exemplo:
        // se o parâmetro não existir, se for passado outro parâmetro ou o nome do personagem que está nesse parâmetro for um que não existe no arquivo json, o usuário será redirecionado para a homepage

        // EN
        // Before showing the character information on the page, some checks will be made to the parameter passed by the url, for example:
        // if the parameter does not exist, if another parameter is passed or the name of the character that is in this parameter is one that does not exist in the json file, the user will be redirected to the homepage
        axios.get('/characters-info/all_characters_menu.json').then(function(characters_info){
            var allNameHeroes = []
            var heroNameUrl = new URLSearchParams(window.location.search);
            var urlPage = window.location.href;

            characters_info.data.forEach(function(hero_info){
                allNameHeroes.push(hero_info.name);
            })

            if(urlPage.indexOf('?hero=') != -1 && heroNameUrl.get('hero').length != 0 && allNameHeroes.indexOf(heroNameUrl.get('hero')) != -1){
                axios.get('/characters-info/'+heroNameUrl.get('hero')+'.json').then(function(character_info){
                    cp.name = character_info.data.name;
                    cp.mainImg = character_info.data.mainImage.img;
                    cp.mainImgAlt = character_info.data.mainImage.alt;
                    cp.roleImg = character_info.data.role.img;
                    cp.roleImgAlt = character_info.data.role.alt;
                    cp.life = character_info.data.life;
                    cp.armour = character_info.data.armour;
                    cp.shield = character_info.data.shield;
                    cp.description = character_info.data.description;
                    cp.skills = character_info.data.skills;
                    cp.biography = character_info.data.biography;
                    cp.counters = character_info.data.counters;

                    for(i = 1; i <= character_info.data.difficulty; i++){
                        document.querySelectorAll("#difficulty-info i")[i-1].style.color = "#b63939";
                    }
                })
            }else{
                window.location.replace('index.html');
            }
        })
    }
})

// Trazendo informações necessárias de cada personagem para o menu lateral - PTBR
// Bringing the character's necessary information to the side menu - EN
var clm = new Vue({
    el: '#characters-lateral-menu',
    data: function() {
        return {
            characters: []
        }
    },
    created: function() {
        axios.get('characters-info/all_characters_menu.json').then(function(characters_info){
            clm.characters = characters_info.data;
        })
    }
})

// Se for clicado no botão principal do menu lateral, ele será aberto ou fechado - PTBR
// If clicked on the main button of the side menu, it will open or closed - EN
document.querySelector('#btn-menu-open-close').addEventListener('click', function(){
    if(window.getComputedStyle(document.querySelector('#characters-lateral-menu')).getPropertyValue('display') == 'flex'){
        document.querySelector('#characters-lateral-menu').style.display = 'none';
        document.querySelector('.fa-caret-square-left').style.display = 'none'
        document.querySelector('.fa-caret-square-right').style.display = 'flex'
    }else{
        document.querySelector('#characters-lateral-menu').style.display = 'flex';
        document.querySelector('.fa-caret-square-left').style.display = 'flex'
        document.querySelector('.fa-caret-square-right').style.display = 'none'
    }
})

// Pressionar a tecla 'ESC' irá fechar o menu lateral - PTBR
// Pressing the 'ESC' key will close the side menu - EN
window.addEventListener('keydown', function(event){
    if(event.key === 'Escape'){
        document.querySelector('#characters-lateral-menu').style.display = 'none';
        document.querySelector('.fa-caret-square-left').style.display = 'none'
        document.querySelector('.fa-caret-square-right').style.display = 'flex'        
    }
})

// Se for clicado fora do menu lateral, ele será fechado - PTBR
// If clicked outside the side menu, it will be closed - EN
document.documentElement.addEventListener('click', function(event){
    if(window.getComputedStyle(document.querySelector('#characters-lateral-menu')).getPropertyValue('display') == 'flex'){
        if(!event.target.closest('#lateral-menu')){
            document.querySelector('#characters-lateral-menu').style.display = 'none';
            document.querySelector('.fa-caret-square-left').style.display = 'none'
            document.querySelector('.fa-caret-square-right').style.display = 'flex'
        }
    }
})

// Clicando no botão de biografia, será mostrado a div biografia e a div anterior será escondida - PTBR
// By clicking on the biography button, the div biography will be shown and the previous div will be hidden - EN
document.querySelector('#btn-biography').addEventListener('click', function(){
    if(window.getComputedStyle(document.querySelector('#character-skills')).getPropertyValue('display') == 'flex'){
        document.querySelector('#character-skills').style.display = 'none';
        document.querySelector('#character-biography').style.display = 'flex';

        this.setAttribute('disabled', true);
        this.style.opacity = 0.7;
    }else if(window.getComputedStyle(document.querySelector('#character-counters')).getPropertyValue('display') == 'flex'){
        document.querySelector('#character-counters').style.display = 'none';
        document.querySelector('#character-biography').style.display = 'flex';

        this.setAttribute('disabled', true);
        this.style.opacity = 0.7;

        document.querySelector('#btn-counters').removeAttribute('disabled');
        document.querySelector('#btn-counters').style.opacity = 1;
    }else if(window.getComputedStyle(document.querySelector('#skill-info')).getPropertyValue('display') == 'flex'){
        document.querySelector('#skill-info').style.display = 'none';
        document.querySelector('#character-biography').style.display = 'flex';

        this.setAttribute('disabled', true);
        this.style.opacity = 0.7;
    }
})

// Clicando no botão voltar na div biografia, a div biografia será escondida e a div com todas habilidades do personagem será aberta - PTBR
// By clicking the back button on the div biography, the div biography will be hidden and the div with all the character's abilities will open - EN
document.querySelector('#character-biography-btn-back').addEventListener('click', function(){
    document.querySelector('#character-skills').style.display = 'flex';
    document.querySelector('#character-biography').style.display = 'none';

    document.querySelector('#btn-biography').removeAttribute('disabled');
    document.querySelector('#btn-biography').style.opacity = 1;

    document.documentElement.scrollTop = 0;
})

// Clicando no botão de counters, será mostrado a div counters e a div anterior será escondida - PTBR
// By clicking the counters button, div counters will be shown and the previous div will be hidden - EN
document.querySelector('#btn-counters').addEventListener('click', function(){
    if(window.getComputedStyle(document.querySelector('#character-skills')).getPropertyValue('display') == 'flex'){
        document.querySelector('#character-skills').style.display = 'none';
        document.querySelector('#character-counters').style.display = 'flex';

        this.setAttribute('disabled', true);
        this.style.opacity = 0.7;
    }else if(window.getComputedStyle(document.querySelector('#character-biography')).getPropertyValue('display') == 'flex'){
        document.querySelector('#character-biography').style.display = 'none';
        document.querySelector('#character-counters').style.display = 'flex';

        this.setAttribute('disabled', true);
        this.style.opacity = 0.7;

        document.querySelector('#btn-biography').removeAttribute('disabled');
        document.querySelector('#btn-biography').style.opacity = 1;
    }else if(window.getComputedStyle(document.querySelector('#skill-info')).getPropertyValue('display') == 'flex'){
        document.querySelector('#skill-info').style.display = 'none';
        document.querySelector('#character-counters').style.display = 'flex';

        this.setAttribute('disabled', true);
        this.style.opacity = 0.7;
    }
})

// Clicando no botão voltar na div counters, a div counters será escondida e a div com todas habilidades do personagem será aberta - PTBR
// By clicking the back button on div counters, div counters will be hidden and div with all character skills will open - EN
document.querySelector('#character-counters-btn-back').addEventListener('click', function(){
    document.querySelector('#character-skills').style.display = 'flex';
    document.querySelector('#character-counters').style.display = 'none';

    document.querySelector('#btn-counters').removeAttribute('disabled');
    document.querySelector('#btn-counters').style.opacity = 1;

    document.documentElement.scrollTop = 0;
})

// Clicando no botão voltar na div de uma habilidade escolhida, a div dessa habilidade será escondida e a div com todas habilidades do personagem será aberta - PTBR
// By clicking the back button on the div of a chosen skill, the div of that ability will be hidden and the div with all the character's abilities will open - EN
document.querySelector('#skill-stats-btn-back').addEventListener('click', function(){
    document.querySelector('#character-skills').style.display = 'flex';
    document.querySelector('#skill-info').style.display = 'none';

    document.documentElement.scrollTop = 0;
})