// Colocando personagens na janela modal - PTBR
// Placing characters in the modal window - EN
var cm = new Vue({
    el: '#bg-main-characters-modal',
    data: function() {
        return {
            characters: []
        }
    },
    created: function() {
        axios.get('characters-info/all_characters_menu.json').then(function(characters_info){
            cm.characters = characters_info.data;
        })
    }
})

// Ao clicar em 'personagens', uma modal será aberta e o scrollbar se moverá até o inicio, e logo após a isso ele será escondido - PTBR
// By clicking on 'characters', a modal will open and the scrollbar will move to the beginning, and soon after that it will be hidden - EN
document.querySelector('#choose-characters').addEventListener('click', function(){
    document.querySelector('#bg-main-characters-modal').style.display = 'flex';
    document.documentElement.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
    document.querySelector('#bg-inner-characters-modal').style.overflow = 'auto';
})

// Clicando fora do modal irá fechar ele - PTBR
// Clicking off the modal will close it - EN
document.querySelector('#bg-main-characters-modal').addEventListener('click', function(event){
    if(event.target == this){
        this.style.display = 'none'
        document.documentElement.style.overflow = 'auto';
    }
})

// Pressionar a tecla 'ESC' irá fechar o modal - PTBR
// Pressing the 'ESC' key will close the modal - EN
window.addEventListener('keydown', function(event){
    if(event.key === 'Escape'){
        document.querySelector('#bg-main-characters-modal').style.display = 'none';
        document.documentElement.style.overflow = 'auto';
    }
})