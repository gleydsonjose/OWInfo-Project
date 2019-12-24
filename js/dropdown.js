
// Efeito de dropdown para os menus de personagens - PTBR
// Dropdown effect for characters menus - EN
document.querySelectorAll('.role-button').forEach(function(item, index){
    item.addEventListener('click', function(){
        if(window.getComputedStyle(document.querySelectorAll('.characters-buttons')[index]).getPropertyValue('display') == 'flex'){
            document.querySelectorAll('.characters-buttons')[index].style.display = 'none';
            document.querySelectorAll('.fa-caret-up')[index].style.display = 'none'
            document.querySelectorAll('.fa-caret-down')[index].style.display = 'block'
        }else{
            document.querySelectorAll('.characters-buttons')[index].style.display = 'flex';
            document.querySelectorAll('.fa-caret-up')[index].style.display = 'block'
            document.querySelectorAll('.fa-caret-down')[index].style.display = 'none'
        }
    })
});